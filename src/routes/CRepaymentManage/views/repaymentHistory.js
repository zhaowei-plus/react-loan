import React, { Component, Fragment } from 'react';
import { ZcyList, ZcyBreadcrumb, Select, Spin, Tooltip, Badge } from 'doraemon';
import { connect } from 'dva';
import { formatNumber, formatString, transformPercent } from 'commonUtils';
import { repayStatus, repayHistoryStatus } from '../config';

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
  width: 100,
}, {
  title: '期数',
  dataIndex: 'period',
  align: 'center',
  width: 60,
}, {
  title: '借款本金余额（元）',
  dataIndex: 'restAmount',
  className: 'money',
  align: 'right',
  width: 180,
  render: text => (formatNumber(text)),
}, {
  title: '起始日/到期日',
  dataIndex: 'startEndTime',
  width: 110,
  render: (text, record) => {
    const { startTime, endTime } = record;
    return `${startTime}至${endTime}`;
  },
}, {
  title: '应还款信息',
  dataIndex: 'shouldRepaymentInfo',
  width: 240,
  render: (text, record) => {
    const { shouldRepaymentInfo = {} } = record;
    return (
      <Fragment>
        <p><span className="list-sub-title">应还本金（元）：</span><span className="money">{ formatNumber(shouldRepaymentInfo.principal) }</span></p>
        <p><span className="list-sub-title">应还利息（元）：</span><span className="money">{ formatNumber(shouldRepaymentInfo.interest) }</span></p>
        <p><span className="list-sub-title">应还总额（元）：</span><span className="money">{ formatNumber(shouldRepaymentInfo.totalAmount) }</span></p>
        <p><span className="list-sub-title">应还日期：</span> { formatString(shouldRepaymentInfo.date) }</p>
        <p><span className="list-sub-title">违约金（元）：</span><span className="money">{ formatNumber(shouldRepaymentInfo.penalty) }</span></p>
        <p><span className="list-sub-title">逾期金额（元）：</span><span className="money">{ formatNumber(shouldRepaymentInfo.overdueAmount) }</span></p>
        <p><span className="list-sub-title">逾期罚息（%）：</span> { transformPercent(shouldRepaymentInfo.overdueInterest) }</p>
      </Fragment>
    );
  },
}, {
  title: '实还款信息',
  dataIndex: 'realRepaymentInfo',
  width: 320,
  render: (text, record) => {
    const { realRepaymentInfo = {} } = record;
    return (
      <Fragment>
        <p><span className="list-sub-title">实还本金（元）：</span><span className="money">{ formatNumber(realRepaymentInfo.principal) }</span></p>
        <p><span className="list-sub-title">实还利息（元）：</span><span className="money">{ formatNumber(realRepaymentInfo.interest) }</span></p>
        <p><span className="list-sub-title">实还总额（元）：</span><span className="money">{ formatNumber(realRepaymentInfo.totalAmount) }</span></p>
        <p><span className="list-sub-title">实还日期：</span> { formatString(realRepaymentInfo.date) }</p>
        <p><span className="list-sub-title">还款账号：</span> { formatString(realRepaymentInfo.account) }</p>
      </Fragment>
    );
  },
}, {
  title: '还款状态',
  dataIndex: 'status',
  width: 120,
  fixed: 'right',
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
  label: '还款历史',
}];

const tabs = {
  tabList: [{
    label: '还款历史列表',
  }],
};
@connect(({ cRepaymentManage, loading }) => ({
  approvalOrg: cRepaymentManage.approvalOrg,
  repaymentHistory: cRepaymentManage.repaymentHistory,
  loading: loading.effects['cRepaymentManage/fetchRepaymentHistory'],
}))
export default class CRepaymentHistory extends Component {
  searchParams = {
    pageNo: 1,
    pageSize: 10,
  };

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
      type: 'cRepaymentManage/fetchRepaymentHistory',
      payload: params,
    });
  }

  onSearch = (params) => {
    this.searchParams = params;
    this.fetchList(this.searchParams);
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
            repayHistoryStatus.map(d =>
              <Option key={d.value} value={d.value}>{d.text}</Option>
            )
          }
        </Select>
      ),
    }];

    return customItem;
  }

  getTable = () => {
    const { repaymentHistory = {} } = this.props;
    const { data = [], total } = repaymentHistory;
    const table = {
      columns,
      dataSource: data,
      pagination: {
        total,
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
