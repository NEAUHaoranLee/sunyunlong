import React, { PureComponent } from 'react';
import './index.less';

export default class NowProcess extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { renderChildren, data } = this.props;

    return (
      <div className="now-process">
        <div className="title">{data.processName}</div>
        <div className="content">
          <div className="status">
            <span>当前进度：</span>
            {data.isCollect}
          </div>
          <div className="start-time">
            <span>开始时间：</span>
            {data.startTime}
          </div>
          <div className="end-time">
            <span>结束时间：</span>
            {data.endTime}
          </div>
          {renderChildren && renderChildren()}
        </div>
      </div>
    );
  }
}
