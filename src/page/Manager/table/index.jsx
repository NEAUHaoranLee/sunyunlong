import React, { PureComponent } from 'react';
import { collage, projectType } from 'config/index';
import { Table, Select, Button, message } from 'antd';
import { manageSubmitFormatter } from 'src/pure';
import _ from 'lodash';
import './index.less';

const actionFilterOption = [
  {
    text: '未选择',
    value: 'undefined',
  },
  {
    text: 'A',
    value: 'A',
  },
  {
    text: 'B',
    value: 'B',
  },
  {
    text: 'C',
    value: 'C',
  },
  {
    text: 'D',
    value: 'D',
  },
];

export default class proBoard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      actionResult: {},
      rowSelection: [],
      rowSelectValue: '',
    };
  }
  componentDidMount() {
    let actionResult = {};
    console.log(this.props.data);
    this.props.data.forEach((item) => {
      if (item.yep) {
        actionResult[item.key] = item.yep;
      }
    });

    this.setState({ actionResult });
  }
  componentWillReceiveProps(newProps) {
    if (this.props.data !== newProps.data) {
      let actionResult = {};

      newProps.data.forEach((item) => {
        if (item.yep) {
          actionResult[item.key] = item.yep;
        }
      });

      this.setState({ actionResult });
    }
  }
  getColumn = () => {
    return [
      {
        title: '项目名称',
        dataIndex: 'pName',
        key: 'pName',
        width: 200,
        fixed: 'left',
      },
      {
        title: '学院',
        dataIndex: 'college',
        key: 'college',
        filters: collage.map((item) => {
          return {
            text: item,
            value: item,
          };
        }),
        onFilter: (value, record) => record.collage === value,
      },
      {
        title: '姓名',
        dataIndex: 'leaderName',
        key: 'leaderName',
      },
      {
        title: '指导教师',
        dataIndex: 'tName',
        key: 'tName',
      },
      {
        title: '类型',
        dataIndex: 'pType',
        key: 'pType',
        filters: projectType.map((item) => {
          return {
            text: item,
            value: item,
          };
        }),
        onFilter: (value, record) => record.pType === value,
      },
      {
        title: '评审1',
        dataIndex: 'oneGrade',
        key: 'oneGrade',
      },
      {
        title: '评审2',
        dataIndex: 'twoGrade',
        key: 'twoGrade',
      },
      {
        title: '评审3',
        dataIndex: 'threeGrade',
        key: 'threeGrade',
      },
      {
        title: '评审4',
        dataIndex: 'fourGrade',
        key: 'fourGrade',
      },
      {
        title: '平均分',
        dataIndex: 'pgAvg',
        key: 'pgAvg',
        sorter: (a, b) => {
          return parseFloat(a.pgAvg) - parseFloat(b.pgAvg);
        },
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 100,
        fixed: 'right',
        filters: actionFilterOption,
        onFilter: (value, record) =>
          String(this.state.actionResult[record.key]) === value,
        render: (text, record) => {
          const { actionResult } = this.state;
          console.log(111111111, actionResult);
          return (
            <Select
              style={{ width: 90 }}
              onChange={(value) => this.selectChange(record, value)}
              value={actionResult[record.key]}
            >
              <Select.Option value="A">A</Select.Option>
              <Select.Option value="B">B</Select.Option>
              <Select.Option value="C">C</Select.Option>
              <Select.Option value="D">D</Select.Option>
            </Select>
          );
        },
      },
    ];
  };
  selectChange = (record, value) => {
    let result = { ...this.state.actionResult };
    result[record.key] = value;

    this.setState({
      actionResult: result,
    });
  };
  batching = () => {
    const { rowSelection, rowSelectValue, actionResult } = this.state;
    let result = {};

    rowSelection.forEach((item) => {
      result[item.key] = rowSelectValue;
    });

    this.setState(
      {
        actionResult: { ...actionResult, ...result },
      },
      () => {
        this.setState({
          rowSelection: [],
        });
      },
    );
  };
  submitResult = () => {
    let flag = true;

    this.props.data.forEach((item) => {
      if (!this.state.actionResult[item.key]) {
        flag = false;
      }
    });

    if (flag) {
      this.props
        .submitFinalResult(
          manageSubmitFormatter(
            this.props.userAccount,
            this.state.actionResult,
          ),
        )
        .then(() => {
          message.success('提交成功！');
          this.props.init();
        });
    } else {
      message.error('请为所有项目评分后再提交!');
    }
  };
  getRowSelection = () => {
    return {
      selectedRowKeys: this.state.rowSelection.map((item) => item.key),
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys);
        this.setState({
          rowSelection: selectedRows,
        });
      },
      getCheckboxProps: (record) => ({
        disabled: false,
        name: record.name,
      }),
    };
  };
  render() {
    const {
      renderChildren,
      title,
      stopCollect,
      getManagerProcess,
      init,
      pKey,
    } = this.props;

    return (
      <div className="manager-table-container">
        <div className="title">
          {title}
          <div className="batching">
            <Select
              style={{ width: 90 }}
              onChange={(value) => this.setState({ rowSelectValue: value })}
              value={this.state.rowSelectValue}
            >
              <Select.Option value="A">A</Select.Option>
              <Select.Option value="B">B</Select.Option>
              <Select.Option value="C">C</Select.Option>
              <Select.Option value="D">D</Select.Option>
            </Select>
            <Button size="small" onClick={this.batching}>
              批量操作
            </Button>
          </div>
        </div>
        <Table
          dataSource={this.props.state === '已提交' ? [] : this.props.data}
          columns={this.getColumn()}
          rowSelection={this.getRowSelection()}
          scroll={{ x: 1300 }}
        />
        <div className="button-container">
          {this.props.level === '校级' && (
            <Button
              onClick={() => {
                if (this.props.state !== '收取材料')
                  return message.error('现在无法停止收取');
                stopCollect({ key: pKey }).then(init);
              }}
            >
              停止收取
            </Button>
          )}
          <Button
            //函数防抖
            onClick={_.throttle(this.submitResult, 2000, { leading: true })}
            type="primary"
          >
            提交结果
          </Button>
        </div>
      </div>
    );
  }
}
