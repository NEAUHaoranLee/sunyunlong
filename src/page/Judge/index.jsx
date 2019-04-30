import React, { PureComponent } from 'react';
import { message, Button, Icon, Divider, Tabs } from 'antd';
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
      isApproval: [],
      notApproval: [],
    };
  }
  componentDidMount() {
    this.props.getJudgeData({
      account: this.props.userAccount,
    });
  }
  componentWillReceiveProps(newProps) {
    if (this.props.judgeData !== newProps.judgeData) {
      this.setState({
        isApproval: newProps.judgeData.isApproval,
        notApproval: newProps.judgeData.notApproval,
      });
    }
  }
  updateData = (value, index) => {
    let newNotApproval = [...this.state.notApproval];
    let newIsApproval = [...this.state.isApproval];
    newNotApproval[index].data = this.state.notApproval[index].data.filter(
      (item) => item.key !== value.key,
    );
    newIsApproval[index].data.push(value);

    this.setState(
      {
        isApproval: newIsApproval,
        notApproval: newNotApproval,
      },
      (state) => {
        console.log(this.state.notApproval);
      },
    );
  };
  render() {
    console.log(this.state);
    return (
      <div className="manager-container">
        <div className="content-container">
          <Tabs>
            <TabPane tab="待审批" key={1}>
              {this.state.notApproval.map((item, index) => (
                <ProBoard
                  title={item.title}
                  type="judging"
                  key={index}
                  data={item.data}
                  updateData={(value) => {
                    this.updateData(value, index);
                  }}
                />
              ))}

              {/* <ProBoard title="2018结题" type="judging" /> */}
            </TabPane>
            <TabPane tab="已审批" key={2}>
              {this.state.isApproval.map((item, index) => (
                <ProBoard
                  {...this.props}
                  title={item.title}
                  type="judged"
                  key={index}
                  data={item.data}
                  canSubmit={this.state.notApproval[index].data.length === 0}
                  updateData={(value) => {
                    this.updateData(value, index);
                  }}
                />
              ))}
              {/* <ProBoard title="2019中期检查" type="judged" />
              <ProBoard title="2018结题" type="judged" /> */}
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}
export default connect(
  (state) => state,
  actions,
)(Judge);
