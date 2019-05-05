import React, { PureComponent } from 'react';
import { Table, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'store/store';
import './index.less';

class MyPro extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '申请类型',
        dataIndex: 'applyType',
        key: 'applyType',
      },
      {
        title: '初审情况',
        dataIndex: 'oneApproval',
        key: 'oneApproval',
        className: 'member',
      },
      {
        title: '导员评语',
        dataIndex: 'reason',
        key: 'reason',
      },
      {
        title: '复审情况',
        dataIndex: 'twoApproval',
        key: 'twoApproval',
      }
      
      // {
      //   title: '操作',
      //   dataIndex: 'action',
      //   key: 'action',
      //   render: (text, record) => {
      //     return (
      //       <div>
      //         <Link to={`/student/edit-project/${record.key}`}>download</Link>
      //         {record.recordStatus !== '已提交' && (
      //           <span>
      //             <Divider type='vertical'/>
      //             <Link to={`/student/edit-project/${record.key}`}>编辑</Link>
      //           </span>
      //         )}
      //       </div>
      //     );
      //   },
      // },
    ];
  }
  componentDidMount() {
    this.props.getStudentScore({ account: this.props.userAccount });
  }
  render() {
    return (
      <div className="myPro-container">
        <div className="table-container">
          <Table dataSource={this.props.sScore} columns={this.columns} />
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => state,
  actions,
)(MyPro);
