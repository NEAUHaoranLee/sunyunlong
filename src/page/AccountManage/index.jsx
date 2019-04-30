import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actions } from 'store/store';
import { withRouter } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, Select, message } from 'antd';
import './index.less';

class Account extends PureComponent {
  constructor(props) {
    super(props);
  }

  handleSubmit = _.throttle(
    (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          if (values.newPassword !== values.againPassword) {
            this.props.form.setFields({
              nPassword: {
                value: '',
                errors: [new Error('两次输入不同！')],
              },
              againPassword: {
                value: '',
                errors: [new Error('两次输入不同！')],
              },
            });
          } else {
            let params = {
              ...values,
              account: this.props.userAccount,
            };

            delete params.againPassword;
            this.props.changePassword(params).then((res) => {
              if (res.data.date === '修改密码成功') {
                message.success('修改成功！');
                this.props.form.setFieldsValue({
                  oldPassword: '',
                  newPassword: '',
                  againPassword: '',
                  role: '',
                });
              } else {
                message.error('旧密码错误！');
              }
            });
          }
        }
      });
    },
    2000,
    { leading: true },
  );
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="account-wrapper">
        <div className="account-management-container">
          <div className="login-title">账号管理</div>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('oldPassword', {
                rules: [{ required: true, message: '请输入旧密码!' }],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="旧密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('newPassword', {
                rules: [{ required: true, message: '请输入新密码!' }],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="新密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('againPassword', {
                rules: [{ required: true, message: '请再次输入新密码!' }],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="再次输入"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('role', {
                rules: [{ required: true, message: '选择角色!' }],
              })(
                <Select>
                  <Select.Option value="学生">学生</Select.Option>
                  <Select.Option value="评委">评委</Select.Option>
                  <Select.Option value="教师">指导教师</Select.Option>
                  <Select.Option value="管理员">管理员</Select.Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                提交
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
const AccountWrapper = Form.create({ name: 'user' })(Account);

export default connect(
  (state) => state,
  actions,
)(withRouter(AccountWrapper));
