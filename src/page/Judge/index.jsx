import React, { PureComponent } from 'react';
import { message, Button, Icon, Divider, Tabs, Table, Modal, Input, Tooltip } from 'antd';
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
      visible: false,
      activeKey: '01',
    };
  }
  componentDidMount() {
    this.props.getApplyType();
    this.props.userAccount && this.props.getJudgeData({ type: this.state.activeKey, account: this.props.userAccount });
  }
  componentWillReceiveProps(newProps) {
    if (this.props.userAccount !== newProps.userAccount) {
      this.props.getJudgeData({ type: this.state.activeKey, account: newProps.userAccount });
    }
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
        title: '第一课堂',
        dataIndex: 'fgpa',
        key: 'fgpa',
        width: 100,
      },
      {
        title: '第二课堂',
        dataIndex: 'sgpa',
        key: 'sgpa',
        width: 100,
      },
      {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
        width: 100,
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
        title: '简介',
        dataIndex: 'intr',
        key: 'intr',
        className: 'intro',
        // width: 170,
        render: (text, record) => {
          return (
            <Tooltip title={record.introduce}>
              <span >{record.introduce}</span>
            </Tooltip>
          )
        }
      },
      {
        title: '导员评语',
        dataIndex: 'reason',
        key: 'reason',
        width: 200,
      },
      // {
      //   title: '查看详情',
      //   dataIndex: 'detail',
      //   key: 'detail',
      //   width: 100,
      //   render: (text, record) => {
      //     return <Link to={`/judges/detail/${record.key}`}>查看详情</Link>;
      //   },
      // },
      {
        title: '下载',
        dataIndex:'download',
        key: 'download',
        render: (text, record) => <a href={`http:///localhost:8080/download?key=${record.key}`}>下载文件</a>,
        fixed: 'right',
        width: 100,
      },
      {
        title: '审批',
        dataIndex: 'approve',
        key: 'approve',
        fixed: 'right',
        width: 150,
        render: (text, record) => {
          return (
            <div>
              <Input style={{width: 60}} onChange={(e) => {
                this.setState({
                  score: {
                    ...this.state.score,
                    [record.key]: e.target.value,
                  }
                })
              }}/>
              <Divider type="vertical" />
              <a
                href="javascript:;"
                onClick={() =>
                  this.showModal(record, '提交', 'judgeNotApprove')
                }
              >
                提交
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
        this.props.getJudgeData({ type: key, account: this.props.userAccount });
      },
    );
  };
  showModal = (record, title, name) => {
    this.setState({
      visible: true,
      approveKey: record.key,
      approveTitle: title,
      name,
    });
  };
  handleOk = () => {
    this.props[this.state.name]({
      key: this.state.approveKey,
      account: this.props.userAccount,
      data: this.state.score[this.state.approveKey],
    })
      .then(() => {
        this.props.getJudgeData({ type: this.state.activeKey, account: this.props.userAccount });
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
            dataSource={this.props.judgeData}
            columns={this.getCloumn()}
            scroll={{ x: 1400 }}
          />
          <Modal
            title={`${this.state.approveTitle}确认`}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.hideModal}
            okText={this.state.approveTitle}
            cancelText="取消"
          >
            {/* <div>
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
            </div> */}
            {`确定要进行${this.state.approveTitle}吗？`}
          </Modal>
        </div>
      </div>
    );
  }
}
export default connect(
  (state) => state,
  actions,
)(Judge);
