import React, { Component } from 'react';
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
import { REPAY_PLAN_STATUS, REPAY_BADGE_STATUS_CONFIG } from 'common/constants';

const { Option } = Select;

@connect(({ loading, loanAfterBusinessQuery }) => ({
  repayPlanList: loanAfterBusinessQuery.repayPlanList,
  channelNameList: loanAfterBusinessQuery.channelNameList,
  repayPlanLoading: loading.effects['loanAfterBusinessQuery/getRepayPlanList'],
}))
export default class RepayPlanList extends Component {
  constructor(props) {
    super(props);
    const { initType, channelCode } = props;
    this.state = {
      pageNo: 1,
      pageSize: 10,
      type: initType || '0',
      initSearchParams: {
        channelCode,
      },
    };
  }

  componentDidMount() {
    const { pageNo, pageSize, type, initSearchParams } = this.state;
    this.getRepayPlanList({ pageNo, pageSize, type, ...initSearchParams });
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'loanAfterBusinessQuery/repayPlanList',
      payload: {},
    });
  }

  // 获得还款计划列表
  getRepayPlanList=(params) => {
    const { type, ...resetParams } = params;

    resetParams.tab = type === '0' ? null : type;

    this.props.dispatch({
      type: 'loanAfterBusinessQuery/getRepayPlanList',
      payload: {
        ...resetParams,
      },
    });
  }

  onSearch=(params) => {
    const { pageSize, pageNo, type, ...initSearchParams } = params;
    this.setState({
      pageSize,
      pageNo,
      type,
      initSearchParams,
    }, () => {
      this.getRepayPlanList(params);
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
        dataIndex: 'currentPeriod',
        key: 'currentPeriod',
        className: 'nowrap',
        render: (text, record) => (
          record.currentPeriod || '-'
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
        title: '应还日期',
        dataIndex: 'date',
        key: 'date',
        className: 'nowrap',
        render: (text, record) => (
          record.shouldRepaymentInfo.date || '-'
        ),
      }, {
        title: '应还本金(元)',
        dataIndex: 'principal',
        key: 'principal',
        className: 'nowrap money',
        align: 'right',
        render: (text, record) => (
          formatNumber(record.shouldRepaymentInfo.principal)
        ),
      }, {
        title: '应还利息(元)',
        dataIndex: 'interest',
        key: 'interest',
        className: 'nowrap money',
        align: 'right',
        render: (text, record) => (
          formatNumber(record.shouldRepaymentInfo.interest)
        ),
      }, {
        title: '应还总额(元)',
        dataIndex: 'totalAmount',
        key: 'totalAmount',
        className: 'nowrap money',
        align: 'right',
        render: (text, record) => (
          formatNumber(record.shouldRepaymentInfo.totalAmount)
        ),
      }, {
        title: '违约金(元)',
        dataIndex: 'penalty',
        key: 'penalty',
        className: 'nowrap money',
        align: 'right',
        render: (text, record) => (
          formatNumber(record.shouldRepaymentInfo.penalty)
        ),
      }, {
        title: '逾期金额(元)',
        dataIndex: 'overdueAmount',
        key: 'overdueAmount',
        className: 'nowrap money',
        align: 'right',
        render: (text, record) => (
          formatNumber(record.shouldRepaymentInfo.overdueAmount)
        ),
      }, {
        title: '逾期罚息(%)',
        dataIndex: 'overdueInterest',
        key: 'overdueInterest',
        className: 'nowrap',
        render: (text, record) => {
          const { shouldRepaymentInfo = {} } = record;
          const { overdueInterest } = shouldRepaymentInfo;
          return transformPercent(overdueInterest);
        },
      }, {
        title: '还款账号',
        dataIndex: 'repaymentAccount',
        key: 'repaymentAccount',
        width: 200,
        render: (text, record) => (
          record.repaymentAccount || '-'
        ),
      }, {
        title: '还款状态',
        dataIndex: 'repaymentStatus',
        className: 'nowrap',
        key: 'repaymentStatus',
        width: 80,
        fixed: 'right',
        render: (text, record) => {
          const name = getRelevantName(record.repaymentStatus, REPAY_PLAN_STATUS);
          return (
            <Badge className="list-badge" status={REPAY_BADGE_STATUS_CONFIG[record.repaymentStatus]} text={name} />
          );
        },
      },
    ];
    return columns;
  }

  // 获得customItem
  getCustomItem=() => {
    const { channelNameList } = this.props;
    const customItem = [
      {
        label: '渠道名称',
        id: 'channelCode',
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
              {REPAY_PLAN_STATUS.map((status) => {
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
        label: '全部',
        key: '0',
        isAll: true,
      }, {
        label: '今日还款',
        key: '1',
      }, {
        label: '还款中',
        key: '2',
      }, {
        label: '已逾期',
        key: '3',
      },
    ],
  })

  render() {
    const { repayPlanLoading, repayPlanList } = this.props;
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
      dataSource: repayPlanList.data || [],
      pagination: {
        pageSize,
        current: pageNo,
        showSizeChanger: true,
        total: repayPlanList.total,
      },
      rowKey: record => record.id,
      scroll: { x: 2100 },
    };

    return (
      <Spin spinning={repayPlanLoading}>
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
