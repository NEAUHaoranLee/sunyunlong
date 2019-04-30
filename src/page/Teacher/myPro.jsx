import React, { PureComponent } from 'react';
import { Table, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'store/store';
import { collage, projectType, processType } from 'config/index';
import './index.less';

class myPro extends PureComponent {
  constructor(props) {
    super(props);
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
        dataIndex: 'leaderName',
        key: 'leaderName',
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
        title: '等级',
        dataIndex: 'level',
        key: 'level',
      },
      {
        title: '结果',
        dataIndex: 'result',
        key: 'result',
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
    ];
    this.dataSource = [
      {
        pName: '基于web的SIPT项目管理系统',
        oName: '李大宝',
        collage: '电气与信息学院',
        teacher: 'Mr.张',
        result: '校级重点优秀结题',
        source: '学生自拟',
        process: '立项',
        level: 'A',
        key: 1,
      },
      {
        pName: '基于web的SIPT项目管理系统',
        oName: '李大宝',
        collage: '电气与信息学院',
        teacher: 'Mr.张',
        result: '校级重点优秀结题',
        source: '学生自拟',
        process: '立项',
        level: 'B',
        key: 2,
      },
      {
        pName: '基于web的SIPT项目管理系统',
        oName: '李大宝',
        collage: '电气与信息学院',
        teacher: 'Mr.张',
        result: '校级重点优秀结题',
        source: '学生自拟',
        process: '立项',
        level: 'C',
        key: 3,
      },
      {
        pName: '基于web的SIPT项目管理系统',
        oName: '李大宝',
        collage: '电气与信息学院',
        teacher: 'Mr.张',
        result: '校级重点优秀结题',
        source: '学生自拟',
        process: '立项',
        level: 'D',
        key: 4,
      },
    ];
  }
  componentDidMount() {
    this.props.teacherProjectList({ account: this.props.userAccount });
  }
  render() {
    return (
      <div className="teacher-container">
        <div className="table-container" style={{ width: 1000 }}>
          <Table
            dataSource={this.props.tProjectList}
            columns={this.columns}
            scroll={{ x: 1400 }}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => state,
  actions,
)(myPro);
