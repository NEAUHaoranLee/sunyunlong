import React, { PureComponent } from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'store/store';
import NowProcess from 'components/nowProcess';
import './index.less';

class Student extends PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getStudentApply({ account: this.props.userAccount });
  }
  componentWillReceiveProps(newProps) {
    if (this.props.userAccount !== newProps.userAccount) {
      this.props.getStudentApply({ account: newProps.userAccount });
    }
  }
  getColumn = () => {
    return [
      {
        title: '申请类型',
        dataIndex: 'applyType',
        key: 'applyType',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '学院',
        dataIndex: 'major',
        key: 'major',
      },
      {
        title: '专业',
        dataIndex: 'college',
        key: 'college',
      },
      {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => {
          return (
            <div>
              <Link to={`/student/detail/${record.key}`}>查看详情</Link>
            </div>
          );
        },
      },
    ];
  };
  render() {
    return (
      <div className="student-container">
        <div className="content-container">
          <Table dataSource={this.props.sApply} columns={this.getColumn()} />
        </div>
      </div>
    );
  }
}
const data = [
  {
    applyType: '一等奖学金',
    college: '计算机科学与技术',
    key: 'A19150292::01::2019',
    major: '电气与信息学院',
    name: '孙云龙',
    state: '已提交',
  },
  {
    applyType: '一等奖学金',
    college: '计算机科学与技术',
    key: 'A19150292::02::2019',
    major: '电气与信息学院',
    name: '孙云龙',
    state: '已提交',
  },
  {
    applyType: '一等奖学金',
    college: '计算机科学与技术',
    key: 'A19150292::03::2019',
    major: '电气与信息学院',
    name: '孙云龙',
    state: '已提交',
  },
];
export default connect(
  (state) => state,
  actions,
)(Student);
