import React, { PureComponent } from 'react';
import { collage, projectType } from 'config/index';
import { Table, Select, Button, message, Input } from 'antd';
import _ from 'lodash';
import './index.less';

export default class proBoard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      changeScore: null,
    };
  }
  componentDidMount() {
    console.log(this.props.data);
    this.setState({
      dataSource: this.props.data,
    });
  }
  componentWillReceiveProps(newProps) {
    if (this.props.data !== newProps.data) {
      this.setState({
        dataSource: newProps.data,
      });
    }
  }
  getColumn = () => {
    return [
      {
        title: '项目名称',
        dataIndex: 'pName',
        key: 'pName',
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
        onFilter: (value, record) => record.type === value,
      },
      {
        title: '评分',
        dataIndex: 'result',
        key: 'result',
        width: 120,
        render: (text, record) => {
          return (
            <Input
              onChange={(e) => {
                this.inputChange(record, 'grade', e.target.value);
              }}
              value={record.grade || ''}
              disabled={
                this.props.type === 'judged' &&
                record.pName !== this.state.changeScore
              }
            />
          );
        },
      },
      {
        title: '备注',
        dataIndex: 'comment',
        key: 'comment',
        render: (text, record) => {
          return (
            <Input.TextArea
              disabled={
                this.props.type === 'judged' &&
                record.pName !== this.state.changeScore
              }
              onChange={(e) => {
                this.inputChange(record, 'inf', e.target.value);
              }}
              value={record.inf || ''}
            />
          );
        },
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => {
          if (this.props.type === 'judging') {
            return (
              <a
                href="javascript:;"
                onClick={() => {
                  this.handleSave(record);
                }}
              >
                保存
              </a>
            );
          } else {
            return record.pName === this.state.changeScore ? (
              <a
                href="javascript:;"
                onClick={() => {
                  this.setState({ changeScore: null });
                }}
              >
                保存
              </a>
            ) : (
              <a
                href="javascript:;"
                onClick={() => {
                  this.setState({ changeScore: record.pName });
                }}
              >
                修改
              </a>
            );
          }
        },
      },
    ];
  };
  inputChange = (record, keyName, value) => {
    const res = this.state.dataSource.map((item) => {
      return item.key === record.key
        ? {
            ...item,
            [keyName]: value,
          }
        : item;
    });

    this.setState({
      dataSource: res,
    });
  };
  handleSave = (record) => {
    this.props.updateData(record);
  };
  submitResult = () => {
    if (this.props.canSubmit) {
      this.props
        .submitJudges({
          account: this.props.userAccount,
          data: this.state.dataSource,
        })
        .then(() => message.success('提交成功！'));
    } else message.error('请为完成所有待审批项目！');
  };
  saveResult = () => {
    this.props.saveJudges({
      account: this.props.userAccount,
      data: this.state.dataSource,
    });
  };
  render() {
    const { renderChildren, title } = this.props;

    return (
      <div className="manager-table-container">
        <div className="title">
          {title}
          <div className="batching">
            <a href="">download</a>
          </div>
        </div>
        <Table dataSource={this.state.dataSource} columns={this.getColumn()} />
        {this.props.type === 'judged' && (
          <div className="button-container">
            <Button
              onClick={_.throttle(this.saveResult, 2000, { leading: true })}
            >
              保存修改
            </Button>
            <Button
              //函数防抖
              onClick={_.throttle(this.submitResult, 2000, { leading: true })}
              type="primary"
            >
              提交结果
            </Button>
          </div>
        )}
      </div>
    );
  }
}
