import React, { PureComponent } from 'react';
import { Table, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'store/store';
import './index.less';

class IsApprove extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '评审结果',
        dataIndex: 'twoApproval',
        key: 'twoApproval',
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
      },
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
    this.props.judgeIsApproveList({ account: this.props.userAccount });
  }
  render() {
    return (
      <div className="judge-container">
        <div className="content-container">
          <Table dataSource={this.props.jIsApproveList} columns={this.columns} />
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => state,
  actions,
)(IsApprove);
