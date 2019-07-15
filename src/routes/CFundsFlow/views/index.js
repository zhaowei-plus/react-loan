import React, { Component } from 'react';
import { ZcyList, ZcyBreadcrumb, DatePicker, Spin } from 'doraemon';
import { connect } from 'dva';
import moment from 'moment';
import { formatNumber, formatString } from 'commonUtils';

import { flowTypes, tradeType } from '../config';

const { RangePicker } = DatePicker;

// 列表搜索项
const customItem = [{
  label: '交易时间',
  id: 'dealTime',
  render: () => (
    <RangePicker />
  ),
}];

const breadcrumb = [{
  label: '资金流水',
}];

const tabs = {
  tabList: [{
    label: '资金流水列表',
  }],
};

@connect(({ cFundsFlow, loading }) => ({
  fundsFlows: cFundsFlow.fundsFlows,
  loading: loading.effects['cFundsFlow/fetchFundsFlows'],
}))
export default class CFundsFlow extends Component {
  constructor(props) {
    super(props);

    this.searchParams = {
      pageNo: 1,
      pageSize: 10,
      amountType: '0', // 默认为收入支出项
    };
  }

  componentDidMount() {
    const { pageNo, pageSize, amountType } = this.searchParams;
    this.fetchList({
      pageNo,
      pageSize,
      amountType,
    });
  }

  fetchList = (params = {}) => {
    let amountType = params.amountType;
    if (amountType === '0') {
      amountType = null;
    }

    this.props.dispatch({
      type: 'cFundsFlow/fetchFundsFlows',
      payload: {
        ...params,
        amountType,
      },
    });
  }

  onSearch = (params, type) => {
    const { amountType } = this.searchParams;
    const { dealTime, ...rest } = { ...params, amountType };
    if (dealTime) {
      rest.startTime = `${moment(dealTime[0]).format('YYYY-MM-DD')} 00:00:00`;
      rest.endTime = `${moment(dealTime[1]).format('YYYY-MM-DD')} 23:59:59`;
    }

    if (type === 'btn') {
      this.fetchList(rest);
    } else {
      this.searchParams = rest;
    }

    this.searchParams = rest;
  }

  onChange = (pagination, filters) => {
    const { tradeAmount } = filters;
    this.searchParams.amountType = tradeAmount[0] || '0';
    this.fetchList(this.searchParams);
  }

  getColunms = () => {
    const { amountType } = this.searchParams;
    // 修改过滤项标题
    const titleItem = flowTypes.find(d =>
      d.value === Number(amountType)
    );
    const title = titleItem ? titleItem.text : '收入/支出';

    const columns = [{
      title: '交易时间',
      dataIndex: 'tradeTime',
      key: 'tradeTime',
    }, {
      title: '交易类型',
      dataIndex: 'tradeType',
      key: 'tradeType',
      render: (text) => {
        const result = tradeType.find(d => d.value === text);
        if (result) {
          return result.text;
        }
        return '-';
      },
    }, {
      title,
      dataIndex: 'tradeAmount',
      key: 'tradeAmount',
      filters: flowTypes,
      align: 'right',
      filterMultiple: false,
      filteredValue: [amountType],
      render: (text, record) => {
        const { tradeAmount } = record;
        if (record.amountType === 1) { // 金额类型   1-收入; 2-支出
          return <span className="green">+ {formatNumber(tradeAmount)}</span>;
        } else {
          return <span className="red">- {formatNumber(tradeAmount)}</span>;
        }
      },
    }, {
      title: '交易渠道',
      dataIndex: 'tradeChannel',
      key: 'tradeChannel',
    }, {
      title: '交易账号',
      dataIndex: 'tradeAccount',
      key: 'tradeAccount',
    }, {
      title: '交易备注',
      dataIndex: 'remark',
      key: 'remark',
      render: text => (formatString(text)),
    }];

    return columns;
  }

  // 获取 table 配置
  getTable = () => {
    const { fundsFlows = {} } = this.props;
    const { data = [], total } = fundsFlows;
    const { pageNo, pageSize } = this.searchParams;
    const columns = this.getColunms();

    return {
      columns,
      dataSource: data,
      pagination: {
        total,
        current: pageNo,
        pageSize,
        showSizeChanger: true,
      },
      onChange: this.onChange,
      rowKey: record => record.id,
    };
  }

  render() {
    const { loading } = this.props;
    const table = this.getTable();

    return (
      <Spin spinning={loading}>
        <ZcyBreadcrumb
          routes={breadcrumb}
        />
        <ZcyList
          customItem={customItem}
          onSearch={this.onSearch}
          tabs={tabs}
          table={table}
        />
      </Spin>
    );
  }
}
