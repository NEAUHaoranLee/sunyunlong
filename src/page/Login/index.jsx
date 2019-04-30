import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actions } from 'store/store';
import { Form, Icon, Input, Button, Checkbox, Select } from 'antd';
import _ from 'lodash';
import './index.less';

class Login extends PureComponent {
  constructor(props) {
    super(props);
  }
  handleSubmit = _.throttle(
    (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.props.userSignIn(values);
        }
      });
    },
    2000,
    { leading: true },
  );
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-container">
        <div className="login-title">欢迎使用SIPT项目管理系统!</div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('account', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="学号/教工号/管理员账号"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="密码"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('role', {
              rules: [{ required: true, message: '选择角色!' }],
            })(
              <Select>
                <Select.Option value='学生'>学生</Select.Option>
                <Select.Option value='评委'>评委</Select.Option>
                <Select.Option value='教师'>指导教师</Select.Option>
                <Select.Option value='管理员'>管理员</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
            <a className="login-form-forgot" href="">
              忘记密码?
            </a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const LoginWrapper = Form.create({ name: 'login' })(Login);

export default connect(
  (state) => state,
  actions,
)(withRouter(LoginWrapper));
