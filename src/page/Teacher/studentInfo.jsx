import React, { PureComponent } from 'react';
import { Table, Divider, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'store/store';
import { collage, projectType, processType } from 'config/index';
import './index.less';

class myPro extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchInf: {},
    };
    this.columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
        width: 100,
      },
      {
        title: '学号',
        dataIndex: 'studentId',
        key: 'studentId',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
      },
      {
        title: '学院',
        dataIndex: 'major',
        key: 'major',
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
        title: '班级',
        dataIndex: 'className',
        key: 'className',
        width: 150,
      },
      {
        title: '生日',
        dataIndex: 'dateOfBirth',
        key: 'dateOfBirth',
        // filters: processType.map((item) => {
        //   return {
        //     text: item,
        //     value: item,
        //   };
        // }),
        // onFilter: (value, record) => record.process === value,
      },
      {
        title: 'email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '身份证号',
        dataIndex: 'idNumber',
        key: 'idNumber',
      },
      {
        title: '政治面貌',
        dataIndex: 'politicalOutlook',
        key: 'politicalOutlook',
      },
      {
        title: '电话号码',
        dataIndex: 'telephoneNumber',
        key: 'telephoneNumber',
      },
      // {
      //   title: '下载文件',
      //   dataIndex: 'download',
      //   key: 'download',
      //   fixed: 'right',
      //   width: 100,
      //   render: (text, record) => {
      //     return <Link to={`/manager/view-project/${text}`}>download</Link>;
      //   },
      // },
    ];
  }
  componentDidMount() {
    this.props.teacherStdInfo({ account: this.props.userAccount });
  }
  inputChange = (name, value) => {
    this.setState({
      searchInf: {
        ...this.state.searchInf,
        [name]: value,
      },
    });
  };
  onSearch = () => {
    this.props.teacherStdInfo({
      account: this.props.userAccount,
      ...this.state.searchInf,
    });
  };
  render() {
    console.log(this.props.tStudentInf);
    return (
      <div className="teacher-container">
        <div className="table-container" style={{ width: 1000 }}>
          <div className="search">
            <span className="label">学号:</span>
            <Input
              onChange={(e) => {
                this.inputChange('studentId', e.target.value);
              }}
            />
            <span className="label">姓名:</span>
            <Input
              onChange={(e) => {
                this.inputChange('name', e.target.value);
              }}
            />
            <span className="label">专业:</span>
            <Input
              onChange={(e) => {
                this.inputChange('college', e.target.value);
              }}
            />

            <Button onClick={this.onSearch} type="primary">
              查询
            </Button>
          </div>
          <Table
            dataSource={this.props.tStudentInf}
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
