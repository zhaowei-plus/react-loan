import React from 'react';
import { Badge } from 'doraemon';
import { formatNumber, renderCell } from 'commonUtils';

// 合同状态
export const CONTRACT_STATUS = [
  { value: 1, text: '已备案', status: 'success' },
  { value: 2, text: '备案撤回申请中', status: 'processing' },
];

export const BREADCRUMB = [{
  label: '中标合同备案记录',
}];

export const TABS = {
  tabList: [{
    label: '中标合同备案记录',
  }],
};

export const getColumns = (handleClick) => {
  const columns = [{
    title: '中标项目名称',
    dataIndex: 'projectName',
    key: 'projectName',
    width: 200,
    render: renderCell,
  }, {
    title: '合同编号',
    dataIndex: 'code',
    key: 'code',
    width: 200,
  }, {
    title: '合同金额（元）',
    dataIndex: 'amount',
    key: 'amount',
    className: 'money-color',
    align: 'right',
    width: 280,
    render: text => (
      formatNumber(text)
    ),
  }, {
    title: '合同备案状态',
    dataIndex: 'status',
    key: 'status',
    width: 280,
    render: (text) => {
      const statusItem = CONTRACT_STATUS.find(d => Number(text) === d.value);
      if (statusItem) {
        return (
          <Badge status={statusItem.status} text={statusItem.text} />
        );
      }
      return '-';
    },
  }, {
    title: '操作',
    dataIndex: 'detailUrl',
    key: 'action',
    width: 80,
    render: text => (
      <a onClick={handleClick.bind(this, text)}>合同详情</a>
    ),
  }];
  return columns;
};
