import React, { Component, Fragment } from 'react';
import { ZcyList, ZcyBreadcrumb, Select, Spin, Tooltip } from 'doraemon';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { formatNumber, transformPercent, formatString } from 'commonUtils';
import { loanStatus, repaymentTypes } from '../config';

import './index.less';

const { Option } = Select;

const columns = [{
  title: '借款编号',
  dataIndex: 'code',
  key: 'code',
  width: 200,
}, {
  title: '客户信息',
  dataIndex: 'clientInfo',
  key: 'clientInfo',
  render: (text, record) => (
    <Fragment>
      <p><span className="list-sub-title">客户名称: </span>{ formatString(record.customerName) }</p>
      <p><span className="list-sub-title">客户类别: </span>{ formatString(record.customerType) }</p>
    </Fragment>
  ),
}, {
  title: '项目信息',
  dataIndex: 'projectInfo',
  key: 'projectInfo',
  render: (text, record) => {
    return (
      <Fragment>
        <p><span className="list-sub-title">贷款合同编号: </span>{ formatString(record.contractCode) }</p>
        <p><span className="list-sub-title">贷款机构: </span>{ formatString(record.capitalChannel) }</p>
        <p><span className="list-sub-title">产品名称: </span>{ formatString(record.productName) }</p>
      </Fragment>
    );
  },
}, {
  title: '借款信息',
  dataIndex: 'loanInfo',
  key: 'loanInfo',
  width: 280,
  render: (text, record) => {
    const statusItem = loanStatus.find(d => d.value === record.status);
    const status = statusItem ? <span className={statusItem.textClass}>{statusItem.text}</span> : '-';
    return (
      <Fragment>
        <p><span className="list-sub-title">借款时间: </span>{ formatString(record.loanTime) }</p>
        <p><span className="list-sub-title">借款状态: </span>{ status }</p>
        <p><span className="list-sub-title">借款金额（元）: </span><span className="money">{ formatNumber(record.amount) }</span></p>
        <p><span className="list-sub-title">借款本金余额（元）: </span><span className="money">{ formatNumber(record.restAmount) }</span></p>
        <p><span className="list-sub-title">借款年化利率（%）: </span>{ transformPercent(record.annualizedRate) }</p>
      </Fragment>
    );
  },
}, {
  title: '还款信息',
  dataIndex: 'repaymentInfo',
  key: 'repaymentInfo',
  width: 280,
  render: (text, record) => {
    const { startTime, endTime } = record;
    let seDate = '-';
    if (startTime && endTime) {
      seDate = `${startTime} 至 ${endTime}`;
    }
    return (
      <Fragment>
        <p><span className="list-sub-title">总期数: </span>{ formatString(record.totalPeriod) }</p>
        <p><span className="list-sub-title">剩余期数: </span>{ formatString(record.restPeriod) }</p>
        <p><span className="list-sub-title">还款方式: </span>{ formatString(repaymentTypes[record.repaymentMode]) }</p>
        <p><span className="list-sub-title">还款账户: </span>{ formatString(record.repaymentAccount) }</p>
        <p><span className="list-sub-title">借款期限（月）: </span>{ formatString(record.duration) }</p>
        <p><span className="list-sub-title">借款起止日: </span>{ seDate }</p>
      </Fragment>
    );
  },
}, {
  title: '操作',
  dataIndex: 'code',
  key: 'action',
  width: 80,
  render: text => (
    <Link to={`/cloan-detail/${text}`}>还款明细</Link>
  ),
}];

const breadcrumb = [{
  label: '借款记录',
}];

const tabs = {
  defaultActiveKey: '1',
  tabList: [{
    label: '未结清',
    value: '1',
    key: '1',
  }, {
    label: '全部',
    value: '0',
    key: '0',
    isAll: true,
  }],
};

@connect(({ cLoanRecord, loading }) => ({
  approvalOrg: cLoanRecord.approvalOrg,
  loanRecord: cLoanRecord.loanRecord,
  tableSearchParams: cLoanRecord.tableSearchParams,
  loading: loading.effects['cLoanRecord/fetchLoanRecord'],
}))
export default class CLoanRecord extends Component {
  componentDidMount() {
    this.fetchApprovalOrg();

    let { tab } = this.props.tableSearchParams;
    if (tab === '0') {
      tab = null;
    }
    this.fetchList({ tab });
  }

  fetchApprovalOrg = (params = {}) => {
    this.props.dispatch({
      type: 'cLoanRecord/fetchApprovalOrg',
      payload: params,
    });
  }

  fetchList = (params = {}) => {
    const { tableSearchParams } = this.props;

    this.props.dispatch({
      type: 'cLoanRecord/fetchLoanRecord',
      payload: {
        ...tableSearchParams,
        ...params,
      },
    });
  }

  onSearch = (params) => {
    this.props.dispatch({
      type: 'cLoanRecord/tableSearchParams',
      payload: {
        ...params,
      },
    });

    // "全部" tab时，tab设置为空
    if (params.tab === '0') {
      params.tab = null;
    }

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
      render: () => {
        return (
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
        );
      },
    }, {
      label: '借款状态',
      id: 'loanStatus',
      decoratorOptions: {
        initialValue: null,
      },
      render: () => (
        <Select placeholder="全部">
          {
            loanStatus.map(d =>
              <Option key={d.value} value={d.value}>{d.text}</Option>
            )
          }
        </Select>
      ),
    }];

    return customItem;
  }

  getTable = () => {
    const { loanRecord = {}, tableSearchParams } = this.props;
    const { data = [], total } = loanRecord;
    const table = {
      columns,
      dataSource: data,
      pagination: {
        total,
        showSizeChanger: true,
        current: tableSearchParams.pageNo,
        pageSize: tableSearchParams.pageSize,
      },
      rowKey: record => record.id,
    };
    return table;
  }

  render() {
    const { tableSearchParams, loading } = this.props;

    const table = this.getTable();
    const customItem = this.getCustomItem();
    tabs.activeKey = tableSearchParams.tab;

    return (
      <Spin spinning={loading}>
        <ZcyBreadcrumb
          routes={breadcrumb}
        />
        <ZcyList
          tabKey="tab"
          customItem={customItem}
          onSearch={this.onSearch}
          tabs={tabs}
          table={table}
          initSearchParams={tableSearchParams}
        />
      </Spin>
    );
  }
}
