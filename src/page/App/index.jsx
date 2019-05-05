import React, { PureComponent } from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { actions } from 'store/store';
import Cookies from 'browser-cookies';
import logo from 'static/img/logo.png';
import Nav from './nav';
import './index.less';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isCollapse: false,
    };
  }
  componentWillReceiveProps(newProps) {
    const { location, history, userType } = this.props;
    const { userType: newUserType } = newProps;

    if (userType !== newUserType && location.pathname === '/login') {
      history.push(`/${newUserType}`);
    }
  }

  componentDidMount() {
    // this.props.createUsers({ account: "A00000001", password: "000",userType: 'manager', userName: '李四' })
    //cookie操作
    const LoginCookie = Cookies.get('login_ticket');
    console.log(1111,LoginCookie)
    if (LoginCookie) {
      this.props.getUserInfo(LoginCookie).then((res) => {
        if (res) this.props.history.push('/login');
      });
    } else {
      this.props.history.push('/login');
    }
  }
  toggleNav() {
    this.setState({
      isCollapse: !this.state.isCollapse,
    });
  }

  render() {
    const {
      location: { pathname },
      userName,
      userType,
    } = this.props;
    const { isCollapse } = this.state;
    const cls = isCollapse ? 'nav-in app-body' : 'nav-out app-body';

    return (
      <div id="app-container">
        <div className={cls}>
          {pathname !== '/login' && (
            <div className="app-header">
              <div className="img-container">
                <img src={logo} alt="" />
              </div>
              <span className="img-content">东北农业大学奖学金评分系统</span>
              <div className="header-user-info">
                {/* <div className="username">
                  {`孙云龙`}
                </div> */}
                <span className="username">{userName}</span>
                <Link to="/login" onClick={this.props.userSignOut}>
                  退出
                </Link>
              </div>
            </div>
          )}
          {/* {(pathname.split('/')[1] === userType || pathname === '/login') && ( */}
          {
            <div className="page-container">
              {pathname !== '/login' && (
                <Nav
                  pathname={pathname}
                  toggleNav={this.toggleNav.bind(this)}
                  isCollapse={isCollapse}
                  userType={userType}
                />
              )}
              <Spin spinning={this.props.loading}>{this.props.children}</Spin>
            </div>
          }
        </div>
      </div>
    );
  }
}
export default connect(
  (state) => state,
  actions,
)(withRouter(App));
