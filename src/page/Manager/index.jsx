import React, { PureComponent } from 'react';
import { Tabs, message } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'store/store';
import ProBoard from './table';
import './index.less';

class Menager extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: '01',
    };
  }
  componentDidMount() {
    this.props.getApplyType();
    this.props.getManagerRelease({ type: this.state.activeKey });
    this.init();
  }
  init = () => {
    // const { userAccount, getManagerProcess } = this.props;
    // getManagerProcess({ account: userAccount });
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
      <div className="manager-container">
        <div className="content-container">
          <Tabs
            activeKey={this.state.activeKey}
            onChange={this.activeKeyChange}
          >
            {applyType.map((item, index) => {
              return <Tabs.TabPane tab={item} key={`0${index + 1}`} />;
            })}
          </Tabs>
          <div className="approval-container">
            <div className="isApprove">
              <span>已审批</span>
              <span className="number">
                {mRelease.isApprove &&
                  `${mRelease.isApprove[0].num}/${mRelease.isApprove[0].sum}`}
              </span>
              <a
                href="javascript:;"
                onClick={() => {
                  if (mRelease.isApprove.length !== mRelease.sum)
                    return message.warning('审批未完成，无法发布');
                  this.aHandleClick('managerSubmission');
                }}
              >
                发布
              </a>
            </div>
            <div className="notApprove">
              <span>未审批</span>
              <span className="number">
                {mRelease.notApprove &&
                  `${mRelease.notApprove[0].num}/${mRelease.notApprove[0].sum}`}
              </span>
              <a
                href="javascript:;"
                onClick={() => {
                  if (mRelease.notApprove.length === 0)
                    return message.warning('全部已审批');
                  this.aHandleClick('managerRemind');
                }}
              >
                提醒
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  (state) => state,
  actions,
)(Menager);
