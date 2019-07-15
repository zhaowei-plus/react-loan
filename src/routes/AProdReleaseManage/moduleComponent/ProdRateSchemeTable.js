import React, { Component } from 'react';
import { Table, Button, Form, InputNumber, Popconfirm } from 'doraemon';

const { Item } = Form;

/**
 * 利率方案
 */
export default class ProdRateSchemeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [{
        key: '0',
      }],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource && (nextProps.dataSource !== this.props.dataSource)) {
      const dataSource = nextProps.dataSource || [];

      const widthKeyDataSource = dataSource.map((item, index) => {
        return {
          ...item,
          key: new Date().getTime() + index,
        };
      });

      this.setState({
        dataSource: widthKeyDataSource,
      });
    }
  }


  deleteRow = (index) => {
    this.setState(({ dataSource }) => {
      const filtered = dataSource.filter((data, dataIndex) => dataIndex !== index);
      return {
        dataSource: filtered,
      };
    });
  };


  addRow = () => {
    const { dataSource } = this.state;

    this.setState({
      dataSource: [
        ...dataSource,
        {
          key: `${new Date().getTime()}`,
        },
      ],
    });
  };

  render() {
    const { form, view, selectedChannelName } = this.props;
    const { getFieldDecorator } = form;

    const { dataSource } = this.state;
    const operation = view ? [] : [{
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render: (text, record, index) => {
        return (
          <Popconfirm
            title="你确定要删除这行内容吗？"
            onConfirm={() => {
              this.deleteRow(index);
            }}
          >
            <a>删除</a>
          </Popconfirm>
        );
      },
    }];
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        render: (text, record, index) => {
          return index + 1;
        },
      }, {
        title: (
          <span className="ant-form-item-required">
            贷款期限（月）
          </span>
        ),
        dataIndex: 'deadLine',
        key: 'deadLine',
        render: (text, record, index) => {
          return view ? text : (
            <Item
              key={index}
            >
              {
                getFieldDecorator(`productRateList.deadLine[${record.key}]`, {
                  rules: [{
                    required: true, message: '请输入贷款期限',
                  }],
                  initialValue: record.deadLine,
                })(
                  <InputNumber placeholder="请输入" max={60} min={1} />
                )
              }
            </Item>
          );
        },
      },
      {
        title: (
          <span className="ant-form-item-required">
           贷款月利率（%）
          </span>
        ),
        dataIndex: 'monthRate',
        key: 'monthRate',
        render: (text, record, index) => {
          // TODO
          return view ? text : (
            <Item
              key={index}
            >
              {
                getFieldDecorator(`productRateList.monthRate[${record.key}]`, {
                  rules: [{
                    required: true, message: '请输入贷款月利率',
                  }, {
                    pattern: /^(([0-9]\d*)(\.\d{1,4})?)$|(0\.0?([1-9]\d?))$/,
                    message: '请输入正确的金额(整数或最多四位小数)',
                  }],
                  initialValue: record.monthRate,
                })(
                  <InputNumber placeholder="请输入" max={100} min={0} />
                )
              }
            </Item>
          );
        },
      }, {
        title: '资方渠道',
        dataIndex: 'channelName',
        key: 'channelName',
        render: (channelName, record, index) => {
          return view ? channelName : (
            <Item
              key={index}
            >
              {
                getFieldDecorator(`productRateList.channelName[${record.key}]`, {
                  rules: [],
                  initialValue: selectedChannelName || channelName,
                })(
                  <span>
                    {
                      selectedChannelName || channelName
                    }
                  </span>
                )
              }
            </Item>
          );
          // return selectedChannelName || channelName;
        },
      }, ...operation];

    const pagination = dataSource.length > 10 ? {
      total: dataSource.length,
    } : false;
    return (

      <div id="rate-scheme">
        <span className="panel-sub-title">
               利率方案
        </span>
        <div className="clearfix">
          {view ? null : (
            <Button
              style={{ float: 'right', margin: '10px 0' }}
              onClick={this.addRow}
            >
              添加行
            </Button>
          )}
        </div>
        <Table
          className="table-width-input"
          columns={columns}
          pagination={pagination}
          dataSource={dataSource}
          rowKey={(record, index) => record.key || index}
        />
      </div>
    );
  }
}

ProdRateSchemeTable.defaultProps = {
  dataSource: [],
};
