import React, { PureComponent } from 'react';
import { Table, Divider, Modal, Button, Tabs, Input } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'store/store';
import { collage, projectType, processType } from 'config/index';
import './index.less';

class Detail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      reason: '',
      activeKey: '01',
    };
  }
  componentDidMount() {
    this.props.getApplyType();
    this.props.teacherApplyList({
      account: this.props.userAccount,
      type: this.state.activeKey,
    });
  }
  showModal = (record, title, name) => {
    this.setState({
      visible: true,
      approveKey: record.key,
      approveTitle: title,
      name,
    });
  };
  handleOk = (record) => {
    this.props[this.state.name]({
      key: this.state.approveKey,
      reason: this.state.reason,
    })
      .then(() => {
        this.props.teacherApplyList({
          account: this.props.userAccount,
          type: this.state.activeKey,
        });
        return true;
      })
      .then(this.hideModal);
  };
  hideModal = () => {
    this.setState({
      visible: false,
      approveKey: '',
      approveTitle: '',
      reason: '',
      name: '',
    });
  };
  getCloumn = () => {
    return [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
        width: 250,
      },
      {
        title: '学号',
        dataIndex: 'studentId',
        key: 'studentId',
        width: 150,
      },
      {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
        width: 200,
        // filters: collage.map((item) => {
        //   return {
        //     text: item,
        //     value: item,
        //   };
        // }),
        // onFilter: (value, record) => record.collage === value,
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: '查看详情',
        dataIndex: 'detail',
        key: 'detail',
        width: 100,
        render: (text, record) => {
          return <Link to={`/teacher/detail/${record.key}`}>查看详情</Link>;
        },
      },
      {
        title: '审批',
        dataIndex: 'approve',
        key: 'approve',
        fixed: 'right',
        width: 110,
        render: (text, record) => {
          return (
            <div>
              <a
                href="javascript:;"
                onClick={() => this.showModal(record, '审批', 'teacherApprove')}
              >
                审批
              </a>
              <Divider type="vertical" />
              <a
                href="javascript:;"
                onClick={() =>
                  this.showModal(record, '驳回', 'teacherNotApprove')
                }
              >
                驳回
              </a>
            </div>
          );
        },
      },
    ];
  };
  activeKeyChange = (key) => {
    this.setState(
      {
        activeKey: key,
      },
      () => {
        this.props.teacherApplyList({
          account: this.props.userAccount,
          type: this.state.activeKey,
        });
      },
    );
  };
  render() {
    const { applyType, tApplyList } = this.props;

    return (
      <div className="teacher-container">
        <Tabs activeKey={this.state.activeKey} onChange={this.activeKeyChange}>
          {applyType.map((item, index) => {
            return <Tabs.TabPane tab={item} key={`0${index + 1}`} />;
          })}
        </Tabs>
        <div className="table-container" style={{ width: 1000 }}>
          <Table
            dataSource={tApplyList.responseDtoList}
            columns={this.getCloumn()}
            // scroll={{ x: 1200 }}
          />
          <Modal
            title={`${this.state.approveTitle}确认`}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.hideModal}
            okText={this.state.approveTitle}
            cancelText="取消"
          >
            <div>
              <span>原因:</span>
              <Input
                style={{ marginTop: 10 }}
                onChange={(e) => {
                  this.setState({
                    reason: e.target.value,
                  });
                }}
                value={this.state.reason}
              />
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => state,
  actions,
)(Detail);
