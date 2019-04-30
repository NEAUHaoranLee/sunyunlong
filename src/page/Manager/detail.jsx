import React, { PureComponent } from 'react';
import { Table, Divider } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'store/store';
import { collage, projectType } from 'config/index';
import './index.less';

class Detail extends PureComponent {
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
        dataIndex: 'leaderUserName',
        key: 'leaderUserName',
        width: 150,
      },
      {
        title: '学院',
        dataIndex: 'college',
        key: 'college',
        width: 250,
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
        dataIndex: 'teacherName',
        key: 'teacherName',
      },
      {
        title: '结果',
        dataIndex: 'avg',
        key: 'avg',
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
          // console.log(text, record);
          return <Link to={`/manager/view-project/${text}`}>download</Link>;
        },
      },
    ];
  }
  componentDidMount() {
    const {
      processDetails,
      match: {
        params: { id },
      },
    } = this.props;

    processDetails({ key: id });
  }
  render() {
    return (
      <div className="myPro-container">
        <div className="table-container" style={{ width: 1000 }}>
          <Table
            dataSource={this.props.processDetailsData}
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
)(withRouter(Detail));
