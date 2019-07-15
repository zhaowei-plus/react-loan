import React, { Component } from 'react';
import { ZcyList, ZcyBreadcrumb, Select, Spin, Tooltip, Badge } from 'doraemon';
import { connect } from 'dva';
import { formatNumber } from 'commonUtils';
import { repayStatus, repayPlanStatus } from '../config';

const { Option } = Select;

const columns = [{
  title: '借款编号',
  dataIndex: 'loanCode',
  key: 'loanCode',
  fixed: 'left',
  width: 180,
}, {
  title: '审批机构',
  dataIndex: 'loanInstitution',
  key: 'loanInstitution',
  width: 260,
}, {
  title: '产品名称',
  dataIndex: 'productName',
  key: 'productName',
  width: 120,
}, {
  title: '期数',
  dataIndex: 'currentPeriod',
  key: 'currentPeriod',
  width: 60,
}, {
  title: '借款本金余额（元）',
  dataIndex: 'restAmount',
  key: 'restAmount',
  className: 'money',
  align: 'right',
  width: 150,
  render: text => (formatNumber(text)),
}, {
  title: '起始日/到期日',
  dataIndex: 'startEndTime',
  key: 'startEndTime',
  width: 200,
  render: (text, record) => {
    const { startTime, endTime } = record;
    return `${startTime}至${endTime}`;
  },
}, {
  title: '应还日期',
  dataIndex: 'shouldRepaymentInfo',
  key: 'mustRepaymentDate',
  width: 120,
  render: (text, record) => {
    const { shouldRepaymentInfo = {} } = record;
    return (shouldRepaymentInfo.date || '-');
  },
}, {
  title: '应还本金（元）',
  dataIndex: 'shouldRepaymentInfo',
  key: 'mustRepaymentPrincipal',
  className: 'money',
  align: 'right',
  width: 120,
  render: (text, record) => {
    const { shouldRepaymentInfo = {} } = record;
    return formatNumber(shouldRepaymentInfo.principal);
  },
}, {
  title: '应还利息（元）',
  dataIndex: 'shouldRepaymentInfo',
  key: 'mustRepaymentInterest',
  className: 'money',
  align: 'right',
  width: 120,
  render: (text, record) => {
    const { shouldRepaymentInfo = {} } = record;
    return formatNumber(shouldRepaymentInfo.interest);
  },
}, {
  title: '应还总额（元）',
  dataIndex: 'shouldRepaymentInfo',
  key: 'mustRepaymentAmount',
  className: 'money',
  align: 'right',
  width: 120,
  render: (text, record) => {
    const { shouldRepaymentInfo = {} } = record;
    return formatNumber(shouldRepaymentInfo.totalAmount);
  },
}, {
  title: '违约金（元）',
  dataIndex: 'shouldRepaymentInfo',
  key: 'vidlateTreatyAmount',
  className: 'money',
  align: 'right',
  width: 120,
  render: (text, record) => {
    const { shouldRepaymentInfo = {} } = record;
    return formatNumber(shouldRepaymentInfo.penalty);
  },
}, {
  title: '逾期金额（元）',
  dataIndex: 'shouldRepaymentInfo',
  key: 'overdueAmount',
  className: 'money',
  align: 'right',
  width: 120,
  render: (text, record) => {
    const { shouldRepaymentInfo = {} } = record;
    return formatNumber(shouldRepaymentInfo.lateFee);
  },
}, {
  title: '逾期罚息（%）',
  dataIndex: 'shouldRepaymentInfo',
  key: 'overdueInterest',
  width: 120,
  render: (text, record) => {
    const { shouldRepaymentInfo = {} } = record;
    return (shouldRepaymentInfo.lateCharge || '-');
  },
}, {
  title: '还款账号',
  dataIndex: 'repaymentAccount',
  key: 'repaymentAccount',
  width: 250,
}, {
  title: '还款状态',
  dataIndex: 'repaymentStatus',
  key: 'repaymentStatus',
  fixed: 'right',
  width: 100,
  render: (text) => {
    const statusItem = repayStatus.find(d => Number(text) === d.value);
    if (statusItem) {
      return (
        <Badge status={statusItem.status} text={statusItem.text} />
      );
    }
    return '-';
  },
}];

const breadcrumb = [{
  label: '还款计划',
}];

const tabs = {
  tabList: [{
    label: '还款计划列表',
  }],
};
@connect(({ cRepaymentManage, loading }) => ({
  approvalOrg: cRepaymentManage.approvalOrg,
  repaymentPlan: cRepaymentManage.repaymentPlan,
  loading: loading.effects['cRepaymentManage/fetchRepaymentPlan'],
}))
export default class CRepaymentPlan extends Component {
  searchParams = {
    pageNo: 1,
    pageSize: 10,
  }

  componentDidMount() {
    const { pageNo, pageSize } = this.searchParams;
    this.fetchApprovalOrg();
    this.fetchList({
      pageNo,
      pageSize,
    });
  }

  fetchApprovalOrg = (params = {}) => {
    this.props.dispatch({
      type: 'cRepaymentManage/fetchApprovalOrg',
      payload: params,
    });
  }

  fetchList = (params = {}) => {
    this.props.dispatch({
      type: 'cRepaymentManage/fetchRepaymentPlan',
      payload: params,
    });
  }

  onSearch = (params) => {
    this.searchParams = params;
    this.fetchList(params);
  }

  getCustomItem = () => {
    const { approvalOrg = [] } = this.props;

    const customItem = [{
      label: '审批机构',
      id: 'channelCode',
      decoratorOptions: {
        initialValue: null,
      },
      render: () => (
        <Select placeholder="全部">
          <Option value={null}>全部</Option>
          {
            approvalOrg.map(d => (
              <Option key={d.channelCode} value={d.channelCode}>
                <Tooltip title={d.channelName} >
                  {d.channelName}
                </Tooltip>
              </Option>
            ))
          }
        </Select>
      ),
    }, {
      label: '还款状态',
      id: 'status',
      decoratorOptions: {
        initialValue: null,
      },
      render: () => (
        <Select placeholder="全部">
          {
            repayPlanStatus.map(d =>
              <Option key={d.value} value={d.value}>{d.text}</Option>
            )
          }
        </Select>
      ),
    }];

    return customItem;
  }

  getTable = () => {
    const { repaymentPlan = {} } = this.props;
    const { data = [], total = 0 } = repaymentPlan;
    const { pageNo, pageSize } = this.searchParams;

    const table = {
      columns,
      dataSource: data,
      pagination: {
        total,
        current: pageNo,
        pageSize,
        showSizeChanger: true,
      },
      scroll: { x: true },
      rowKey: record => record.id,
    };

    return table;
  }

  render() {
    const { loading } = this.props;

    const table = this.getTable();
    const customItem = this.getCustomItem();

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
