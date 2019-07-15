import React, { Component } from 'react';
import { Table, Button, Select, Form, Popconfirm } from 'doraemon';
import { CHARGE_NODES, CHARGE_TYPES } from '../constant';
import { filterFieldName } from '../../../utils/commonUtil';

const { Option } = Select;
const { Item } = Form;


/**
 * 费用收取清单
 */
export default class ProdChargeListTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [{
        key: new Date().getTime() - 1,
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


  deleteRow = (key) => {
    const { dataSource } = this.state;

    const filteredData = dataSource.filter((data) => {
      return data.key !== key;
    });

    this.setState({
      dataSource: filteredData,
    });
  };

  render() {
    const { form, view } = this.props;
    const { getFieldDecorator } = form;
    const { dataSource } = this.state;

    const operation = view ? [] : [{
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render: (text, record) => {
        return (
          <Popconfirm
            title="你确定要删除这行内容吗？"
            onConfirm={() => {
              this.deleteRow(record.key);
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
           费用类型
          </span>
        ),
        dataIndex: 'types',
        key: 'types',
        render: (text, record, index) => {
          const { types = {} } = record;
          return view ? types.name : (
            <Item
              key={index}
            >
              {
                getFieldDecorator(`productTollList.types[${record.key}]`, {
                  rules: [{
                    required: true,
                    message: '请选择费用类型',
                  }],
                  initialValue: types.id,
                })(
                  <Select
                    placeholder="请选择"
                  >
                    {CHARGE_TYPES.map((node) => {
                      return (
                        <Option value={node.value} key={node.value}>
                          {node.label}
                        </Option>
                      );
                    })}
                  </Select>
                )
              }
            </Item>
          );
        },
      },
      {
        title: (
          <span className="ant-form-item-required">
           收费节点
          </span>
        ),
        dataIndex: 'node',
        key: 'node',
        render: (text, record, index) => {
          return view ? filterFieldName(text, CHARGE_NODES) : (
            <Item
              key={index}
            >
              {
                getFieldDecorator(`productTollList.node[${record.key}]`, {
                  rules: [{
                    required: true,
                    message: '请选择收费节点',
                  }],
                  initialValue: record.node,
                })(
                  <Select
                    placeholder="请选择"
                  >
                    {CHARGE_NODES.map((node) => {
                      return (
                        <Option value={node.value} key={node.value}>
                          {node.label}
                        </Option>
                      );
                    })}
                  </Select>
                )
              }
            </Item>
          );
        },
      }, ...operation];

    const pagination = dataSource.length > 10 ? {
      total: dataSource.length,
    } : false;
    return (
      <div id="charge-table">
        <span className="panel-sub-title">
               费用收取清单
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

ProdChargeListTable.defaultProps = {
  dataSource: [],
  chargeTypes: [],
};
