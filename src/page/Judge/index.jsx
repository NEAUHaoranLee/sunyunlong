import React, { PureComponent } from 'react';
import { message, Button, Icon, Divider, Tabs, Table } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'store/store';
import ProBoard from './table';
import './index.less';

const TabPane = Tabs.TabPane;

class Judge extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: '01',
    };
  }
  componentDidMount() {
    this.props.getApplyType();
    this.props.getManagerRelease({ type: this.state.activeKey });
  }
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
        this.props.getManagerRelease({ type: key });
      },
    );
  };
  aHandleClick = (name) => {
    const { mRelease } = this.props;

    this.props[name]({
      key: mRelease.isApprove[0].key || mRelease.notApprove[0].key,
    }).then((res) => message.success(res.data.date));
  };
  render() {
    const { mRelease, applyType } = this.props;

    return (
      <div className="judge-container">
        <div className="content-container">
          <Tabs
            activeKey={this.state.activeKey}
            onChange={this.activeKeyChange}
          >
            {applyType.map((item, index) => {
              return <Tabs.TabPane tab={item} key={`0${index + 1}`} />;
            })}
          </Tabs>
          <Table
            dataSource={[]}
            columns={this.getCloumn()}
            // scroll={{ x: 1200 }}
          />
        </div>
      </div>
    );
  }
}
export default connect(
  (state) => state,
  actions,
)(Judge);
