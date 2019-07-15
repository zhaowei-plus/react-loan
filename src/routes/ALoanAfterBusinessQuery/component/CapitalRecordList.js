import React, { Component } from 'react';
import {
  Spin,
  ZcyList,
  Input,
  DatePicker,
} from 'doraemon';
import { connect } from 'dva';
import { formatNumber, getRelevantName, fixDateRequestParams } from 'commonUtils';
import { DEAL_TYPE } from 'common/constants';

const { RangePicker } = DatePicker;


@connect(({ loading, loanAfterBusinessQuery }) => ({
  capitalRecordList: loanAfterBusinessQuery.capitalRecordList,
  channelNameList: loanAfterBusinessQuery.channelNameList,
  capitalRecordLoading: loading.effects['loanAfterBusinessQuery/getCapitalRecordList'],
}))
export default class CapitalRecordList extends Component {
  state = {
    pageNo: 1,
    pageSize: 10,
    inOutType: '0', // 收支类型
  };
  componentDidMount() {
    const { pageNo, pageSize } = this.state;
    this.getCapitalRecordList({ pageNo, pageSize });
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'loanAfterBusinessQuery/capitalRecordList',
      payload: {},
    });
  }

  // 获得资金流水列表
  getCapitalRecordList=(params) => {
    const { tradeTime, inOutType, ...resetParams } = params;
    if (tradeTime) {
      resetParams.startTime = fixDateRequestParams(tradeTime[0]);
      resetParams.endTime = fixDateRequestParams(tradeTime[1], true);
    }
    // 收入/支出时,不需传值
    if (inOutType === '0') {
      resetParams.amountType = null;
    } else {
      resetParams.amountType = inOutType;
    }
    this.props.dispatch({
      type: 'loanAfterBusinessQuery/getCapitalRecordList',
      payload: {
        ...resetParams,
      },
    });
  }

  onSearch=(params, type) => {
    const { pageSize, pageNo } = params;
    const { inOutType } = this.state;
    this.setState({
      pageSize,
      pageNo,
    });
    params.inOutType = inOutType;
    if (type === 'btn') {
      this.getCapitalRecordList(params);
    } else {
      this.searchParams = { ...params };
    }
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
        title: '客户名称',
        dataIndex: 'customerName',
        key: 'customerName',
        width: 250,
        render: (text, record) => (
          record.customerName || '-'
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
        width: 150,
        render: (text, record) => (
          record.tradeChannel || '-'
        ),
      }, {
        title: '交易账号',
        dataIndex: 'tradeAccount',
        key: 'tradeAccount',
        width: 150,
        render: (text, record) => (
          record.tradeAccount || '-'
        ),
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
        label: '客户名称',
        id: 'customerName',
        render: () => {
          return <Input placeholder="请输入" />;
        },
      },
    ];
    return customItem;
  }

  // 点击分页/筛选时触发
  onTableChange=(pagination, filters) => {
    const { tradeAmount = [] } = filters;
    const { searchParams } = this;
    this.setState({
      inOutType: tradeAmount[0] || '0',
    });
    const params = { ...searchParams };
    params.inOutType = tradeAmount[0] || '0';
    this.getCapitalRecordList(params);
  }

  getConfigInfo=() => ({
    tabList: [
      {
        label: '资金流水列表',
      }],
  })

  render() {
    const { capitalRecordLoading, capitalRecordList } = this.props;
    const { pageNo, pageSize, type } = this.state;

    const customItem = this.getCustomItem();
    const columns = this.getColumns();

    const configInfo = this.getConfigInfo();
    const tabList = configInfo.tabList || [];

    const tabs = {
      defaultActiveKey: type,
      activeKey: type,
      tabList,
    };

    const table = {
      columns,
      dataSource: capitalRecordList.data || [],
      pagination: {
        pageSize,
        current: pageNo,
        showSizeChanger: true,
        total: capitalRecordList.total,
      },
      onChange: this.onTableChange,
      rowKey: record => record.id,
    };

    return (
      <Spin spinning={capitalRecordLoading}>
        <ZcyList
          tabs={tabs}
          tabKey="type"
          table={table}
          customItem={customItem}
          onSearch={this.onSearch}
        />
      </Spin>
    );
  }
}
