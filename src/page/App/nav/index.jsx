import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { map } from 'lodash';
import { navMap } from './config';
import left from 'static/img/close.svg';
import cshx from 'static/img/cshx.svg';
import cxss from 'static/img/cxss.svg';
import djfx from 'static/img/djfx.svg';
import help_center from 'static/img/help-center.svg';
import right from 'static/img/open.svg';
import qjzl from 'static/img/qjzl.svg';
import qyjc from 'static/img/qyjc.svg';
import ytfx from 'static/img/ytfx.svg';
import zdybb from 'static/img/zdybb.svg';
import cszl from 'static/img/cszl.svg';
import './index.less';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subMenuKey: [],
      key: [],
    };
    this.iconMap = [cshx, cxss, djfx, qjzl, qyjc, ytfx, zdybb, cszl];
    //判断key值添加选中状态class changeBlue
    this.keysForm = {
      qjzl: [
        '/city-diagnosis',
        '/express/pulse/overalldaily',
        '/moneyEfficiency.*',
        '/manageTool',
      ],
      zdybb: [
        '/express/plus-dashboard/user/view',
        '/express/plus-dashboard/common/view',
        '/express/plus-dashboard/datasource',
      ],
      qyjc: [
        '/express/distribution',
        '/express/scene-route',
        '/express/geofence',
      ],
      cxss: ['/express/realtime', '/express/tide/tidegeofance'],
      cshx: ['/cityPortrayal'],
      djfx: [
        '/express/price-before',
        '/express/price-middle',
        '/express/price-after',
      ],
    };
  }
  componentDidMount() {
    this.setState({
      key: [this.props.pathname]
    })
  }
  //刷新后判断当前pathname找到选中的key
  componentWillReceiveProps(nextProps) {
    let key =
      nextProps.pathname === '/' ? '/express/overview' : nextProps.pathname;

    this.setState({
      key: [key],
      subMenuKey: this.highLightNavItem(nextProps.pathname),
    });
  }

  highLightNavItem = (pathname) => {
    const subMenuKey = [];
    map(this.keysForm, (list, key) => {
      map(list, (rule) => {
        new RegExp(`^${rule}$`).test(pathname) && subMenuKey.push(key);
      });
    });
    return subMenuKey;
  };

  sub(subMenuKey) {
    return this.state.subMenuKey[0] === subMenuKey
      ? 'changeBlue nav-collapse-popup'
      : 'nav-collapse-popup';
  }
  click(e) {
    this.setState({
      subMenuKey: [e.keyPath[1]],
    });
  }

  render() {
    const { userType } = this.props;
    const navList = navMap[userType];
    let keys = this.state.key;

    return (
      <div
        className={this.props.isCollapse ? 'nav collapse' : 'nav uncollapse'}
      >
        {/* <div className={this.props.isCollapse ? 'logo-collapse' : 'logo'}>
          <span className="nav-title">
            {this.props.isCollapse ? 'SIPT' : 'SIPT项目管理系统'}
          </span>
        </div> */}
        {/* <div className="trans-top trans" /> */}
        <div className="menu-main-container">
          <Menu
            mode="inline"
            theme="dark"
            inlineCollapsed={this.props.isCollapse}
            defaultSelectedKeys={keys}
            selectedKeys={keys}
            onClick={this.click.bind(this)}
          >
            {navList &&
              navList.map((item, index) => {
                return (
                  <Menu.Item key={item.path}>
                    <Link to={item.path}>
                      <span className="menu-title">
                        {/* <img
                          className="menu-icon"
                          src={this.iconMap[index % 7]}
                        /> */}
                        <span>{item.name}</span>
                      </span>
                    </Link>
                  </Menu.Item>
                );
              })}
            {/* <Menu.Item key="/express/overview">
              <Link to="/express/overview">
                <span className="menu-title">
                  <img className="menu-icon" src={cszl} />
                  <span>城市纵览</span>
                </span>
              </Link>
            </Menu.Item>
            <Menu.SubMenu
              key="qjzl"
              className={this.sub('qjzl')}
              title={
                <span className="menu-title">
                  <img className="menu-icon" src={qjzl} />
                  <span>全局纵览</span>
                </span>
              }
            >
              <Menu.Item key="/city-diagnosis">
                <Link to="/city-diagnosis">城市诊断</Link>
              </Menu.Item>
              <Menu.Item key="/express/pulse/overalldaily">
                <Link to="/express/pulse/overalldaily">全局日报</Link>
              </Menu.Item>
              <Menu.Item key="/moneyEfficiency">
                <Link to="/moneyEfficiency">钱效分析</Link>
              </Menu.Item>
              <Menu.Item key="/manageTool">
                <Link to="/manageTool">城市对比</Link>
              </Menu.Item>
            </Menu.SubMenu> */}
          </Menu>
        </div>
        {/* <div className="nav-footer">
          <div className="trans-bottom trans" />
          <div className="footer-inner">
            <div className="help-center">
              <Link to="/help-center">
                <span className="content">
                  <img src={help_center} />
                  <span> 帮助中心</span>
                </span>
              </Link>
            </div>
            <div
              className="collapse"
              onClick={() => {
                this.props.toggleNav();
              }}
            >
              <span className="content">
                <img src={this.props.isCollapse ? right : left} />
              </span>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

export default Nav;
