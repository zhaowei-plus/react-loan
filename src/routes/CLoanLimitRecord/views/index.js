import React, { Component } from 'react';
import { ZcyList, ZcyBreadcrumb, Select, Spin, Tooltip, Badge } from 'doraemon';
import { connect } from 'dva';
import { formatNumber, transformPercent, formatString } from 'commonUtils';
import { limitStatus, limitTypes } from '../config';

const { Option } = Select;

const columns = [{
  title: '贷款合同编号',
  dataIndex: 'contractCode',
  key: 'contractCode',
  fixed: 'left',
  width: 140,
}, {
  title: '授信机构',
  dataIndex: 'creditInstitution',
  key: 'creditInstitution',
  width: 140,
}, {
  title: '产品名称',
  dataIndex: 'productName',
  key: 'productName',
  width: 140,
}, {
  title: '额度类型',
  dataIndex: 'quotaType',
  key: 'quotaType',
  width: 120,
  render: (text) => {
    const quotaType = limitTypes.find(d => d.value === text);
    return quotaType ? quotaType.text : '-';
  },
}, {
  title: '授信额度（元）',
  dataIndex: 'quota',
  key: 'quota',
  width: 140,
  className: 'money',
  align: 'right',
  render: text => (formatNumber(text)),
}, {
  title: '可用额度（元）',
  dataIndex: 'availableQuota',
  key: 'availableQuota',
  width: 140,
  className: 'money',
  align: 'right',
  render: text => (formatNumber(text)),
}, {
  title: '贷款年化利率（%）',
  dataIndex: 'annualizedRate',
  key: 'annualizedRate',
  width: 160,
  render: (text) => {
    return transformPercent(text);
  },
}, {
  title: '额度期限（月）',
  dataIndex: 'duration',
  key: 'duration',
  width: 140,
}, {
  title: '额度起止时间',
  dataIndex: 'startEndTime',
  key: 'startEndTime',
  width: 140,
  render: (text, record) => {
    const { startTime, endTime } = record;
    return `${startTime}至${endTime}`;
  },
}, {
  title: '利率类型',
  dataIndex: 'rateTypeDesc',
  key: 'rateTypeDesc',
  width: 140,
  render: text => (
    formatString(text)
  ),
}, {
  title: '浮动比例（%）',
  dataIndex: 'floatRate',
  key: 'floatRate',
  width: 120,
  render: (text) => {
    return transformPercent(text);
  },
}, {
  title: '额度状态',
  dataIndex: 'status',
  key: 'status',
  width: 100,
  fixed: 'right',
  render: (text) => {
    const statusItem = limitStatus.find(d => Number(text) === d.value);
    if (statusItem) {
      return (
        <Badge status={statusItem.status} text={statusItem.text} />
      );
    }
    return '-';
  },
}];

const breadcrumb = [{
  label: '额度记录',
}];

const tabs = {
  defaultActiveKey: '2',
  tabList: [{
    label: '生效中',
    value: '2',
    key: '2',
  }, {
    label: '全部',
    value: '0',
    key: '0',
    isAll: true,
  }],
};

@connect(({ cLoanLimitRecord, loading }) => ({
  approvalOrg: cLoanLimitRecord.approvalOrg,
  limitRecord: cLoanLimitRecord.limitRecord,
  loading: loading.effects['cLoanLimitRecord/fetchLimitRecord'],
}))
export default class CLoanLimitRecord extends Component {
  componentDidMount() {
    this.fetchApprovalOrg();
    this.fetchList({
      type: tabs.defaultActiveKey,
    });
  }

  fetchApprovalOrg = (params = {}) => {
    this.props.dispatch({
      type: 'cLoanLimitRecord/fetchApprovalOrg',
      payload: params,
    });
  }

  fetchList = (params = {}) => {
    this.props.dispatch({
      type: 'cLoanLimitRecord/fetchLimitRecord',
      payload: {
        ...params,
      },
    });
  }

  onSearch = (params) => {
    // "全部" tab时，tab设置为空
    if (params.type === '0') {
      params.type = null;
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
      label: '额度状态',
      id: 'quotaStatus',
      decoratorOptions: {
        initialValue: null,
      },
      render: () => {
        return (
          <Select placeholder="全部">
            <Option value={null}>全部</Option>
            {
              limitStatus.map(d =>
                <Option key={d.value} value={d.value}>{d.text}</Option>
              )
            }
          </Select>
        );
      },
    }];
    return customItem;
  }

  getTable = () => {
    const { limitRecord = {} } = this.props;
    const { data = [], total = 0 } = limitRecord;

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
          tabKey="type"
          customItem={customItem}
          onSearch={this.onSearch}
          tabs={tabs}
          table={table}
        />
      </Spin>
    );
  }
}
