import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actions } from 'store/store';
import { withRouter } from 'react-router-dom';
import { editDataFormatter } from 'src/pure';
import {
  message,
  Form,
  Select,
  Input,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Icon,
  Checkbox,
} from 'antd';
import './index.less';

class Project extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      first: true,
      second: true,
      third: true,
      file: {},
    };
  }
  componentDidMount() {
    console.log(this.props.match);
    this.props.getApplyType();
    this.props.teacherApplyDetail({ key: this.props.match.params.key });
  }
  componentWillReceiveProps(newProps) {
    if (this.props.tDetail !== newProps.tDetail) {
      this.props.form.setFieldsValue(newProps.tDetail);
    }
  }
  formDataFormatter = (value) => {
    let formValue = value || this.props.form.getFieldsValue();
    let { pathFirst, pathSecond, pathThird } = formValue;

    for (const k in formValue) {
      formValue[k] = formValue[k] ? formValue[k] : '';
    }
    return formValue;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(null, (err, values) => {
      if (!err) {
        const formValue = this.formDataFormatter(values);
        console.log(formValue);
        this.props.applyProject(formValue).then((res) => {
          if (res.code === 200) {
            this.props.history.push('/student');
            message.success('提交成功');
          } else if (res.code === 405) message.error(res.data);
        });
      }
    });
  };
  normFile = (name) => {
    return (e) => {
      this.setState({
        [name]: e.fileList.length === 0,
      });
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    };
  };
  render() {
    const { getFieldDecorator, getFieldsValue } = this.props.form;
    const { disabled } = this.state;
    const formValue = getFieldsValue();
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    //(address-->家庭地址,applyType-->申请类型,className-->班级,college-->专业,dateOfBirth-->出生年月,
    // email-->邮箱,fgpa-->第一课堂绩点,idNumber-->身份证号,introduce-->申请奖学金概述，major-->学院,name-->申请人姓名
    // politicalOutlook-->政治面貌,sex-->性别,sgpa-->第二课堂绩点，studentId-->申请人学号,telephoneNumber-->电话号码)

    return (
      <div className="from-container">
        <div className="title">查看详情</div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="申请人姓名:">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入申请人姓名!' }],
              validateTrigger: false,
            })(<Input placeholder={'请输入申请人姓名'} disabled={disabled} />)}
          </Form.Item>
          <Form.Item label="申请人学号:" wrapperCol={{ span: 6 }}>
            {getFieldDecorator('studentId', {
              rules: [{ required: true, message: '请输入申请人学号!' }],
              validateTrigger: false,
            })(<Input placeholder={'请输入申请人学号'} disabled={disabled} />)}
          </Form.Item>
          <Form.Item label="身份证号:" wrapperCol={{ span: 6 }}>
            {getFieldDecorator('idNumber', {
              rules: [{ required: true, message: '请输入身份证号!' }],
              validateTrigger: false,
            })(<Input placeholder={'请输入身份证号'} disabled={disabled} />)}
          </Form.Item>
          <Form.Item label="家庭地址:">
            {getFieldDecorator('address', {
              rules: [{ required: true, message: '请输入家庭地址!' }],
              validateTrigger: false,
            })(<Input placeholder={'请输入家庭地址'} disabled={disabled} />)}
          </Form.Item>
          <Form.Item label="申请类型:" wrapperCol={{ span: 8 }}>
            {getFieldDecorator('applyType', {
              rules: [{ required: true, message: '请选择申请类型!' }],
            })(
              <Select placeholder={'请选择申请类型'} disabled={disabled}>
                {this.props.applyType.map((item, index) => {
                  return (
                    <Select.Option value={item} key={index}>
                      {item}
                    </Select.Option>
                  );
                })}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="性别:" wrapperCol={{ span: 4 }}>
            {getFieldDecorator('sex', {
              rules: [{ required: true, message: '请选择性别!' }],
            })(
              <Select disabled={disabled}>
                <Select.Option value="男" key="1">
                  男
                </Select.Option>
                <Select.Option value="女" key="2">
                  女
                </Select.Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="学院:" wrapperCol={{ span: 6 }}>
            {getFieldDecorator('major', {
              rules: [{ required: true, message: '请选择所在学院!' }],
            })(
              <Select placeholder={'所在学院'} disabled={disabled}>
                <Select.Option value="电气与信息学院" key="1">
                  电气与信息学院
                </Select.Option>
                <Select.Option value="工程学院" key="2">
                  工程学院
                </Select.Option>
                <Select.Option value="经管学院" key="3">
                  经管学院
                </Select.Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="专业:">
            {getFieldDecorator('college', {
              rules: [{ required: true, message: '专业!' }],
              validateTrigger: false,
            })(<Input placeholder={'请输入专业名称'} disabled={disabled} />)}
          </Form.Item>
          <Form.Item label="班级:" wrapperCol={{ span: 6 }}>
            {getFieldDecorator('className', {
              rules: [{ required: true, message: '班级!' }],
              validateTrigger: false,
            })(<Input placeholder={'请输入班级'} disabled={disabled} />)}
          </Form.Item>
          <Form.Item label="出生年月:" wrapperCol={{ span: 6 }}>
            {getFieldDecorator('dateOfBirth', {
              rules: [{ required: true, message: '出生年月!' }],
              validateTrigger: false,
            })(<Input placeholder={'请输入出生年月'} disabled={disabled} />)}
          </Form.Item>
          <Form.Item label="email:">
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'email!' }],
              validateTrigger: false,
            })(<Input placeholder={'请输入依媚儿'} disabled={disabled} />)}
          </Form.Item>
          <Form.Item label="第一课堂绩点:" wrapperCol={{ span: 3 }}>
            {getFieldDecorator('fGPA', {
              rules: [{ required: true, message: '第一课堂绩点!' }],
              validateTrigger: false,
            })(
              <Input placeholder={'请输入第一课堂绩点'} disabled={disabled} />,
            )}
          </Form.Item>
          <Form.Item label="第二课堂绩点:" wrapperCol={{ span: 3 }}>
            {getFieldDecorator('sGPA', {
              rules: [{ required: true, message: '第二课堂绩点!' }],
              validateTrigger: false,
            })(
              <Input placeholder={'请输入第二课堂绩点'} disabled={disabled} />,
            )}
          </Form.Item>
          <Form.Item label="政治面貌:">
            {getFieldDecorator('politicalOutlook', {
              rules: [{ required: true, message: '请输入政治面貌!' }],
              validateTrigger: false,
            })(<Input placeholder={'请输入政治面貌'} disabled={disabled} />)}
          </Form.Item>
          <Form.Item label="联系电话:">
            {getFieldDecorator('telephoneNumber', {
              rules: [{ required: true, message: '请输入联系电话!' }],
              validateTrigger: false,
            })(<Input placeholder={'请输入联系电话'} disabled={disabled} />)}
          </Form.Item>
          <Form.Item label="项目简介:">
            {getFieldDecorator('introduce')(
              <Input.TextArea
                rows={4}
                placeholder={formValue.pIntroduce || '200字以内'}
                disabled={disabled}
              />,
            )}
          </Form.Item>
          {/* <Form.Item label="相关材料">
            {getFieldDecorator('pathFirst', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile('first'),
            })(
              <Upload
                name="file"
                action="http://localhost:8080/student/update"
                type=".doc,.docx"
              >
                {this.state.first && (
                  <Button>
                    <Icon type="upload" /> 上传文件
                  </Button>
                )}
              </Upload>,
            )}
          </Form.Item> */}
          {/* <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item> */}
        </Form>
      </div>
    );
  }
}

const Wrapped = Form.create({ name: 'project' })(Project);

export default connect(
  (state) => state,
  actions,
)(withRouter(Wrapped));
