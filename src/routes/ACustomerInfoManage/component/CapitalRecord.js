import React, { Component } from 'react';
import {
  Spin,
  ZcySearch,
  Table,
  DatePicker,
  Select,
} from 'doraemon';
import { connect } from 'dva';
import { formatNumber, getRelevantName, fixDateRequestParams } from 'commonUtils';
import { DEAL_TYPE } from 'common/constants';
import { BANK_REMARK } from '../component/typeConstants';

const { RangePicker } = DatePicker;
const { Option } = Select;

@connect(({ loading, customerInfo }) => ({
  capitalRecord: customerInfo.capitalRecord,
  capitalRecordLoading: loading.effects['customerInfo/getCapitalRecord'],
}))
export default class CapitalRecord extends Component {
  state = {
    pageNo: 1,
    pageSize: 10,
    inOutType: '0',
  };

  componentDidMount() {
    const { pageNo, pageSize } = this.state;
    this.getCapitalRecord({ pageNo, pageSize });
  }

  // 获得资金流水列表
  getCapitalRecord=(params) => {
    const { inOutType, tradeTime, ...resetParams } = params;
    const { customerId } = this.props;
    // 收入/支出时,不需传值
    if (inOutType === '0') {
      resetParams.amountType = null;
    } else {
      resetParams.amountType = inOutType;
    }
    if (tradeTime) {
      resetParams.startTime = fixDateRequestParams(tradeTime[0]);
      resetParams.endTime = fixDateRequestParams(tradeTime[1], true);
    }
    this.props.dispatch({
      type: 'customerInfo/getCapitalRecord',
      payload: {
        ...resetParams,
        customerId,
      },
    });
  }

  onSearch=(params) => {
    const { pageSize, inOutType } = this.state;

    this.searchParams = {
      ...params,
      pageSize,
      pageNo: 1,
      inOutType,
    };
    this.setState({
      pageNo: 1,
    });
    this.getCapitalRecord(this.searchParams);
  }

  // 获得columns
  getColumns=() => {
    const { inOutType } = this.state;
    let inOutText = '收入/支出';
    switch (inOutType) {
    case '1':
      inOutText = '收入';
      break;
    case '2':
      inOutText = '支出';
      break;
    default:
      inOutText = '收入/支出';
      break;
    }
    const columns = [
      {
        title: '交易时间',
        dataIndex: 'tradeTime',
        key: 'tradeTime',
        className: 'nowrap',
        render: (text, record) => (
          record.tradeTime || '-'
        ),
      }, {
        title: '交易类型',
        dataIndex: 'tradeType',
        key: 'tradeType',
        className: 'nowrap',
        render: (text, record) => {
          const name = getRelevantName(record.tradeType, DEAL_TYPE);
          return name;
        },
      }, {
        title: inOutText,
        dataIndex: 'tradeAmount',
        key: 'tradeAmount',
        align: 'right',
        className: 'nowrap',
        filters: [{
          text: '收入/支出',
          value: '0',
        }, {
          text: '只看收入',
          value: '1',
        }, {
          text: '只看支出',
          value: '2',
        }],
        filterMultiple: false,
        filteredValue: [inOutType],
        render: (text, record) => {
          const { amountType, tradeAmount } = record;
          if (amountType === 1) { // 金额类型   1-收入; 2-支出
            return <span className="green">+ {formatNumber(tradeAmount)}</span>;
          } else {
            return <span className="red">- {formatNumber(tradeAmount)}</span>;
          }
        },
      }, {
        title: '交易渠道',
        dataIndex: 'tradeChannel',
        key: 'tradeChannel',
        width: 200,
        render: (text, record) => (
          record.tradeChannel || '-'
        ),
      }, {
        title: '交易账号',
        dataIndex: 'tradeAccount',
        key: 'tradeAccount',
        width: 200,
        render: (text, record) => (
          record.tradeAccount || '-'
        ),
      }, {
        title: '银行摘要',
        dataIndex: 'bankRemark',
        key: 'bankRemark',
        width: 150,
        render: (text, record) => {
          const name = getRelevantName(record.bankRemark, BANK_REMARK);
          return name;
        },
      }, {
        title: '交易备注',
        dataIndex: 'remark',
        key: 'remark',
        width: 150,
        render: (text, record) => (
          record.remark || '-'
        ),
      },
    ];
    return columns;
  }

  // 获得customItem
  getCustomItem=() => {
    const customItem = [
      {
        label: '交易时间',
        id: 'tradeTime',
        render: () => {
          return <RangePicker />;
        },
      }, {
        label: '交易类别',
        id: 'tradeType',
        decoratorOptions: {
          initialValue: null,
        },
        render: () => {
          return (
            <Select>
              {DEAL_TYPE.map((status) => {
                return (
                  <Option key={status.type} value={status.type}>{status.name}</Option>
                );
              })}
            </Select>
          );
        },
      },
    ];
    return customItem;
  }

  // 点击分页/筛选时触发
  onTableChange=(pagination, filters) => {
    const { pageSize, current } = pagination;
    const { tradeAmount = [] } = filters;
    this.setState({
      pageSize,
      pageNo: current,
      inOutType: tradeAmount[0] || '0',
    });
    this.getCapitalRecord({
      ...this.searchParams,
      pageSize,
      pageNo: current,
      inOutType: tradeAmount[0] || '0',
    });
  }

  render() {
    const { capitalRecordLoading, capitalRecord = {} } = this.props;
    const { pageSize, pageNo } = this.state;
    const customItem = this.getCustomItem();
    const columns = this.getColumns();

    const pagination = {
      pageSize,
      current: pageNo,
      showSizeChanger: true,
      total: capitalRecord.total,
    };
    return (
      <Spin spinning={capitalRecordLoading}>
        <ZcySearch
          customItem={customItem}
          onSearch={this.onSearch}
        />
        <Table
          columns={columns}
          dataSource={capitalRecord.data || []}
          pagination={pagination}
          onChange={this.onTableChange}
          rowKey={(record => record.id)}
        />
      </Spin>
    );
  }
}
