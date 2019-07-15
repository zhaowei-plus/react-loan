import React, { Component, Fragment } from 'react';
import { ZcyList, ZcyBreadcrumb, Select, Spin, DatePicker, Tooltip, Badge } from 'doraemon';
import { connect } from 'dva';
import { Link } from 'dva/router';
import moment from 'moment';
import { FormatFix, formatString, getUrlSearchParams } from 'commonUtils';
import { applyStatus } from '../config';

const { Option } = Select;
const { RangePicker } = DatePicker;

const columns = [{
  title: '贷款申请编号',
  dataIndex: 'applyCode',
  key: 'applyCode',
  width: 180,
  render: (text, record) => (
    <Link to={`/cloan-apply/${record.id}`}>{text}</Link>
  ),
}, {
  title: '项目合同编号',
  dataIndex: 'contractCode',
  key: 'contractCode',
  width: 120,
  render: text => (formatString(text)),
}, {
  title: '申请信息',
  dataIndex: 'applyInfo',
  key: 'applyInfo',
  render: (text, record) => {
    return (
      <Fragment>
        <p><span className="list-sub-title">申请人：</span> { formatString(record.applicant) }</p>
        <p><span className="list-sub-title">发起人：</span> { formatString(record.onlineInitiator) }</p>
        <p><span className="list-sub-title">申请时间：</span> { formatString(record.applyTime) }</p>
        <p>
          <span className="list-sub-title">申请额度(元)：</span>
          <span className="money">{ FormatFix.formatMoney(record.applyAmount) }</span>
        </p>
        <p>
          <span className="list-sub-title">测算总额度(元): </span>
          <span className="money-color">{FormatFix.formatMoney(record.estimateTotalAmount)}</span>
        </p>
      </Fragment>
    );
  },
}, {
  title: '产品信息',
  dataIndex: 'produceInfo',
  key: 'produceInfo',
  render: (text, record) => {
    return (
      <p><span className="list-sub-title">产品名称：</span>{ formatString(record.productName) }</p>
    );
  },
}, {
  title: '审批信息',
  dataIndex: 'approvalInfo',
  key: 'approvalInfo',
  render: (text, record) => {
    return (
      <Fragment>
        <p><span className="list-sub-title">审批机构：</span>{ formatString(record.capitalChannel) }</p>
        <p>
          <span className="list-sub-title">审批额度(元)：</span>
          <span className="money">{ FormatFix.formatMoney(record.approveAmount) }</span>
        </p>
        <p><span className="list-sub-title">审批完成时间：</span>{ formatString(record.approveTime) }</p>
        <p><span className="list-sub-title">借款年化利率(%)：</span>{ FormatFix.formatPercent(record.annualizedRate) }</p>
      </Fragment>
    );
  },
}, {
  title: '申请状态',
  dataIndex: 'customerApplyStatus',
  key: 'customerApplyStatus',
  width: 100,
  render: (text) => {
    const statusItem = applyStatus.find(d => Number(text) === d.value);
    if (statusItem) {
      return (
        <Badge status={statusItem.status} text={statusItem.text} />
      );
    }
    return '-';
  },
}, {
  title: '操作',
  width: 80,
  dataIndex: 'action',
  key: 'action',
  render: (text, record) => (
    <Link to={`/cloan-apply/${record.id}`}>查看</Link>
  ),
}];

const breadcrumb = [{
  label: '贷款申请记录',
}];

const tabs = {
  defaultActiveKey: '1',
  tabList: [{
    label: '申请中',
    value: '1',
    key: '1',
  }, {
    label: '全部',
    value: '0',
    key: '0',
    isAll: true,
  }],
};

@connect(({ cLoanApplyRecord, loading }) => ({
  approvalOrg: cLoanApplyRecord.approvalOrg,
  applyRecord: cLoanApplyRecord.applyRecord,
  tableSearchParams: cLoanApplyRecord.tableSearchParams,
  loading: loading.effects['cLoanApplyRecord/fetchApplyRecord'],
}))
export default class CLoanApplyRecord extends Component {
  constructor(props) {
    super(props);

    const { search } = props.location;
    const urlSearchParams = getUrlSearchParams(search);
    const { tab } = urlSearchParams;

    if (tab === 'all') {
      this.tab = '0';
    }
  }

  componentDidMount() {
    const { tableSearchParams } = this.props;
    let { tab } = tableSearchParams;
    if (this.tab) {
      this.props.dispatch({
        type: 'cLoanApplyRecord/tableSearchParams',
        payload: {
          tab: this.tab,
        },
      });

      tab = this.tab;
    }

    // "全部" tab时，tab设置为空
    if (tab === '0') {
      tab = null;
    }

    this.fetchApprovalOrg();
    this.fetchList({ tab });
  }

  fetchApprovalOrg = (params = {}) => {
    this.props.dispatch({
      type: 'cLoanApplyRecord/fetchApprovalOrg',
      payload: params,
    });
  }

  fetchList = (params) => {
    const { tableSearchParams } = this.props;
    const { applyTime, ...rest } = tableSearchParams;

    this.props.dispatch({
      type: 'cLoanApplyRecord/fetchApplyRecord',
      payload: {
        ...rest,
        ...params,
      },
    });
  }

  onSearch = (params) => {
    this.props.dispatch({
      type: 'cLoanApplyRecord/tableSearchParams',
      payload: params,
    });

    const { applyTime, ...rest } = params;
    if (applyTime) {
      rest.startTime = `${moment(applyTime[0]).format('YYYY-MM-DD')} 00:00:00`;
      rest.endTime = `${moment(applyTime[1]).format('YYYY-MM-DD')} 23:59:59`;
    }

    // "全部" tab时，tab设置为空
    if (rest.tab === '0') {
      rest.tab = null;
    }

    this.fetchList(rest);
  }

  getCustomItem = () => {
    const { approvalOrg = [] } = this.props;
    return [{
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
      label: '申请状态',
      id: 'customerApplyStatus',
      decoratorOptions: {
        initialValue: null,
      },
      render: () => (
        <Select placeholder="全部">
          <Option value={null}>全部</Option>
          {
            applyStatus.map(d =>
              <Option key={d.value} value={d.value} >{d.text}</Option>
            )
          }
        </Select>
      ),
    }, {
      label: '申请时间',
      id: 'applyTime',
      render: () => (
        <RangePicker />
      ),
    }];
  }

  getTable = () => {
    const { applyRecord = {}, tableSearchParams } = this.props;
    const { data = [], total } = applyRecord;
    return {
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
  }

  render() {
    const { tableSearchParams, loading } = this.props;
    const table = this.getTable();
    const customItem = this.getCustomItem();
    tabs.activeKey = tableSearchParams.tab;

    return (
      <Spin spinning={loading}>
        <ZcyBreadcrumb routes={breadcrumb} />
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
