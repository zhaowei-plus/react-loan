import React, { Component, Fragment } from 'react';
import {
  Spin,
  ZcyList,
  Input,
  Select,
  Tooltip,
  Badge,
} from 'doraemon';
import { connect } from 'dva';
import { formatNumber, getRelevantName, transformPercent } from 'commonUtils';
import { REPAY_HISTORY_STATUS, REPAY_BADGE_STATUS_CONFIG } from 'common/constants';

const { Option } = Select;

@connect(({ loading, loanAfterBusinessQuery }) => ({
  repayHistoryList: loanAfterBusinessQuery.repayHistoryList,
  channelNameList: loanAfterBusinessQuery.channelNameList,
  repayHistoryLoading: loading.effects['loanAfterBusinessQuery/getRepayHistoryList'],
}))
export default class RepayHistoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 1,
      pageSize: 10,
      initSearchParams: {
        channelCode: props.channelCode,
      },
    };
  }

  componentDidMount() {
    const { pageNo, pageSize, initSearchParams } = this.state;
    this.getRepayHistoryList({ pageNo, pageSize, ...initSearchParams });
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'loanAfterBusinessQuery/repayHistoryList',
      payload: {},
    });
  }

  // 获得还款历史列表
  getRepayHistoryList=(params) => {
    this.props.dispatch({
      type: 'loanAfterBusinessQuery/getRepayHistoryList',
      payload: {
        ...params,
      },
    });
  }

  onSearch=(params) => {
    const { pageSize, pageNo, ...initSearchParams } = params;
    this.setState({
      pageSize,
      pageNo,
      initSearchParams,
    }, () => {
      this.getRepayHistoryList(params);
    });
  }

  // 获得columns
  getColumns=() => {
    const columns = [
      {
        title: '借款编号',
        dataIndex: 'loanCode',
        key: 'loanCode',
        width: 200,
        render: (text, record) => (
          record.loanCode || '-'
        ),
      }, {
        title: '客户名称',
        dataIndex: 'customerName',
        key: 'customerName',
        width: 200,
        render: (text, record) => (
          record.customerName || '-'
        ),
      },
      {
        title: '放款机构',
        dataIndex: 'loanInstitution',
        key: 'loanInstitution',
        width: 200,
        render: (text, record) => (
          record.loanInstitution || '-'
        ),
      }, {
        title: '产品名称',
        dataIndex: 'productName',
        key: 'productName',
        width: 200,
        render: (text, record) => (
          record.productName || '-'
        ),
      }, {
        title: '期数',
        dataIndex: 'period',
        key: 'period',
        className: 'nowrap',
        render: (text, record) => (
          record.period || '-'
        ),
      }, {
        title: '借款本金余额(元)',
        dataIndex: 'restAmount',
        key: 'restAmount',
        className: 'nowrap money',
        align: 'right',
        render: (text, record) => (
          formatNumber(record.restAmount)
        ),
      }, {
        title: '起止时间',
        dataIndex: 'startEndTime',
        key: 'startEndTime',
        className: 'nowrap',
        render: (text, record) => (
          <span>{record.startTime || '-'} 至 {record.endTime || '-'}</span>
        ),
      }, {
        title: '应还款信息',
        dataIndex: 'shouldRepaymentInfo',
        key: 'shouldRepaymentInfo',
        width: 160,
        render: (text, record) => {
          const { shouldRepaymentInfo } = record;

          const { date,
            interest,
            overdueInterest,
            overdueAmount,
            penalty,
            principal,
            totalAmount,
          } = shouldRepaymentInfo;
          return (
            <Fragment>
              <p className="money-color"><span className="list-sub-title">应还本金(元): </span>
                {formatNumber(principal)}
              </p>
              <p className="money-color"><span className="list-sub-title">应还利息(元):</span>{formatNumber(interest)}</p>
              <p className="money-color"><span className="list-sub-title">应还总额(元):</span>{formatNumber(totalAmount)}</p>
              <p><span className="list-sub-title">应还日期:</span>{date || '-'}</p>
              <p className="money-color"><span className="list-sub-title">违约金(元):</span>{formatNumber(penalty)}</p>
              <p className="money-color"><span className="list-sub-title">逾期金额(元):</span>{formatNumber(overdueAmount)}</p>
              <p><span className="list-sub-title">逾期罚息(%):</span>{transformPercent(overdueInterest)}</p>
            </Fragment>
          );
        },
      }, {
        title: '实还款信息',
        dataIndex: 'realRepaymentInfo',
        key: 'realRepaymentInfo',
        width: 200,
        render: (text, record) => {
          const { realRepaymentInfo } = record;
          const { principal,
            interest,
            totalAmount,
            date,
            account,
          } = realRepaymentInfo;
          return (
            <Fragment>
              <p className="money-color"><span className="list-sub-title">实还本金(元):</span>
                {formatNumber(principal)}
              </p>
              <p className="money-color"><span className="list-sub-title">实还利息(元):</span>{formatNumber(interest)}</p>
              <p className="money-color"><span className="list-sub-title">实还总额(元):</span>{formatNumber(totalAmount)}</p>
              <p><span className="list-sub-title">实还日期:</span>{date || '-'}</p>
              <p><span className="list-sub-title">还款账号:</span>{account}</p>
            </Fragment>
          );
        },
      }, {
        title: '还款状态',
        dataIndex: 'status',
        key: 'status',
        className: 'nowrap',
        width: 80,
        fixed: 'right',
        render: (text, record) => {
          const name = getRelevantName(record.status, REPAY_HISTORY_STATUS);
          return (
            <Badge className="list-badge" status={REPAY_BADGE_STATUS_CONFIG[record.status]} text={name} />
          );
        },
      },
    ];
    return columns;
  }

  // 获得customItem
  getCustomItem=() => {
    const { channelNameList, channelCode } = this.props;
    const customItem = [
      {
        label: '渠道名称',
        id: 'channelCode',
        decoratorOptions: {
          initialValue: channelCode,
        },
        render: () => {
          return (
            <Select
              defaultActiveFirstOption={false}
              placeholder="请选择"
              allowClear
            >
              {
                channelNameList.map(list => (
                  <Option key={list.channelCode} value={list.channelCode}>
                    <Tooltip title={list.channelName} >
                      {list.channelName}
                    </Tooltip>
                  </Option>
                ))
              }
            </Select>
          );
        },
      }, {
        label: '还款状态',
        id: 'status',
        decoratorOptions: {
          initialValue: null,
        },
        render: () => {
          return (
            <Select>
              {REPAY_HISTORY_STATUS.map((status) => {
                return (
                  <Option key={status.type} value={status.type}>{status.name}</Option>
                );
              })}
            </Select>
          );
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

  getConfigInfo=() => ({
    tabList: [
      {
        label: '还款历史列表',
      },
    ],
  })

  render() {
    const { repayHistoryLoading, repayHistoryList } = this.props;
    const { pageNo, pageSize, type, initSearchParams } = this.state;

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
      dataSource: repayHistoryList.data || [],
      pagination: {
        pageSize,
        current: pageNo,
        showSizeChanger: true,
        total: repayHistoryList.total,
      },
      rowKey: record => record.id,
      scroll: { x: 1600 },
    };

    return (
      <Spin spinning={repayHistoryLoading}>
        <ZcyList
          tabs={tabs}
          tabKey="type"
          table={table}
          customItem={customItem}
          onSearch={this.onSearch}
          initSearchParams={initSearchParams}
        />
      </Spin>
    );
  }
}
