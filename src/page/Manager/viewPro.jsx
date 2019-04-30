import React, { PureComponent } from 'react';
import { Table, Divider, Modal, Button, Input, Select, message } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'store/store';
import './index.less';

class ViewPro extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalTitle: '',
    };
    this.columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '项目总数',
        dataIndex: 'sum',
        key: 'sum',
      },
      {
        title: '状态',
        dataIndex: 'pStatus',
        key: 'pStatus',
      },
      {
        title: '查看详情',
        dataIndex: 'detail',
        key: 'detail',
        render: (text, record) => {
          console.log(record);
          return (
            <Link to={`/manager/view-project/${record.key}`}>查看详情</Link>
          );
        },
      },
    ];
  }
  componentDidMount() {
    const { processManage, userAccount } = this.props;

    processManage({ account: userAccount });
  }
  handleChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };
  handleOk = () => {
    const { beginTime = '', endTime = '', processName = '' } = this.state;
    const { processManage, newProcess, userAccount } = this.props;

    if (!beginTime || !endTime || !processName)
      return message.error('请完善信息');

    newProcess({ beginTime, endTime, processName }).then(() => {
      processManage({ account: userAccount });
    });
    this.handleCancel();
  };
  handleCancel = () => {
    this.setState({
      modalVisible: false,
      modalTitle: '',
    });
  };
  render() {
    return (
      <div className="viewPro-container">
        <div className="table-container">
          <Table
            dataSource={this.props.processManageData.data}
            columns={this.columns}
          />
          {this.props.processManageData.level === '校级' && (
            <Button
              type="primary"
              onClick={() => {
                this.setState({
                  modalVisible: true,
                  modalTitle: '新建流程',
                });
              }}
            >
              新建流程
            </Button>
          )}
          <Modal
            title={this.state.modalTitle}
            visible={this.state.modalVisible}
            onOk={this.handleOk}
            confirmLoading={this.state.confirmLoading}
            onCancel={this.handleCancel}
            okText="确认"
            cancelText="取消"
            width={450}
          >
            <span className="label">流程类型:</span>
            <Select
              style={{ display: 'block' }}
              onChange={(value) => this.handleChange('processName', value)}
              value={this.state.processName}
            >
              <Select.Option value="立项">立项</Select.Option>
              <Select.Option value="中期检查/结题">中期检查/结题</Select.Option>
            </Select>
            <span className="label">开始时间:</span>
            <Input
              value={this.state.beginTime}
              onChange={(e) => this.handleChange('beginTime', e.target.value)}
            />
            <span className="label">结束时间:</span>
            <Input
              value={this.state.endTime}
              onChange={(e) => this.handleChange('endTime', e.target.value)}
            />
          </Modal>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => state,
  actions,
)(ViewPro);
