import React, { Component } from 'react';
import { Table, Form } from 'doraemon';
import AgreementInfoModal from 'common/modal/AgreementInfoModal';

const { Item } = Form;


/**
 * 贷款产品合同
 */
export default class ProdProtocolTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [{
        key: '1',
        name: '政采云融资信息服务协议',
      }],
      visible: false,
    };
  }


  toggleAgreement=() => {
    this.setState(({ visible }) => {
      return {
        visible: !visible,
      };
    });
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


  render() {
    const { form } = this.props;
    const { dataSource, visible } = this.state;
    const { getFieldDecorator } = form;
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        render: (text, record, index) => {
          return index + 1;
        },
      }, {
        title: '业务节点',
        dataIndex: 'node',
        key: 'node',
        render: (current, record, index) => {
          return (
            <Item
              key={index}
            >
              {
                getFieldDecorator(`productProtocol.node[${record.key}]`, {
                  rules: [],
                  initialValue: current || 1,
                })(
                  <span>
                发起贷款申请
                  </span>
                )
              }
            </Item>
          );
        },
      },
      {
        title: '协议名称',
        dataIndex: 'name',
        key: 'name',
        render: (name, record, index) => {
          return (
            <Item
              key={index}
            >
              {
                getFieldDecorator(`productProtocol.name[${record.key}]`, {
                  rules: [],
                  initialValue: '政采云融资信息服务协议',
                })(
                  <a onClick={this.toggleAgreement}>
                    政采云融资信息服务协议
                  </a>
                )
              }
            </Item>
          );
        },
      }, {
        title: '协议类型',
        dataIndex: 'types',
        key: 'types',
        render: (current, record, index) => {
          return (
            <Item
              key={index}
            >
              {
                getFieldDecorator(`productProtocol.types[${record.key}]`, {
                  rules: [],
                  initialValue: current || 1,
                })(
                  <span>
                线上协议
                  </span>
                )
              }
            </Item>
          );
        },
      }];

    const pagination = dataSource.length > 10 ? {
      total: dataSource.length,
    } : false;
    return (
      <div id="contract-table">
        <span className="panel-sub-title mb-20">
               贷款产品合同
        </span>
        <Table
          className="table-width-input"
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
          rowKey={(record, index) => record.key || index}
        />
        {
          visible && (
            <AgreementInfoModal
              visible={visible}
              onCancel={this.toggleAgreement}
            />
          )
        }
      </div>

    );
  }
}
