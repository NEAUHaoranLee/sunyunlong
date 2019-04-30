import React, { PureComponent } from 'react';
import { Table, Divider, Modal, Button } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'store/store';
import { collage, projectType, processType } from 'config/index';
import './index.less';

class Detail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: null,
    };
    this.columns = [
      {
        title: '项目名称',
        dataIndex: 'pName',
        key: 'pName',
        fixed: 'left',
        width: 250,
      },
      {
        title: '负责人姓名',
        dataIndex: 'sName',
        key: 'sName',
        width: 150,
      },
      {
        title: '学院',
        dataIndex: 'college',
        key: 'college',
        width: 200,
        filters: collage.map((item) => {
          return {
            text: item,
            value: item,
          };
        }),
        onFilter: (value, record) => record.collage === value,
      },
      {
        title: '指导教师',
        dataIndex: 'tName',
        key: 'tName',
      },
      {
        title: '当前流程',
        dataIndex: 'status',
        key: 'status',
        filters: processType.map((item) => {
          return {
            text: item,
            value: item,
          };
        }),
        onFilter: (value, record) => record.process === value,
      },
      {
        title: '项目来源',
        dataIndex: 'pSource',
        key: 'pSource',
      },
      {
        title: '下载文件',
        dataIndex: 'download',
        key: 'download',
        fixed: 'right',
        width: 100,
        render: (text, record) => {
          return <Link to={`/manager/view-project/${text}`}>download</Link>;
        },
      },
      {
        title: '审批',
        dataIndex: 'approve',
        key: 'approve',
        fixed: 'right',
        width: 100,
        render: (text, record) => {
          return (
            <div>
              <a href="javascript:;" onClick={() => this.confirm(record)}>
                approve
              </a>
            </div>
          );
        },
      },
    ];
  }
  componentDidMount() {
    this.props.teacherApproveList({ account: this.props.userAccount });
  }
  showModal = (record) => {
    this.setState({
      visible: record.pName,
    });
  };
  handleOk = (record) => {
    this.hideModal();
  };
  hideModal = () => {
    this.setState({
      visible: null,
    });
  };
  confirm = (record) => {
    Modal.confirm({
      title: '审批确认',
      content: '确定要进行审批吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        return this.props.teacherApprove({ key: record.key }).then(() => {
          this.props.teacherApproveList({ account: this.props.userAccount });
          return true;
        });
      },
      onCancel() {},
    });
  };
  render() {
    return (
      <div className="teacher-container">
        <div className="table-container" style={{ width: 1000 }}>
          <Table
            dataSource={this.props.tApproveList}
            columns={this.columns}
            scroll={{ x: 1200 }}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => state,
  actions,
)(Detail);
