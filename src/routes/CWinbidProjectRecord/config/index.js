import React, { Fragment } from 'react';
import { Link } from 'dva/router';
import { Badge } from 'doraemon';
import { formatString } from 'commonUtils';

// 项目状态
export const projectStatus = [
  { type: 1, name: '待生成合同' },
  { type: 2, name: '已生成部分合同' },
  { type: 3, name: '全部生成合同' },
  { type: 4, name: '已发废标公告' },
  { type: 5, name: '项目终止' },
];

// 申请状态
export const financeStatus = [
  { type: null, name: '全部' },
  { type: 1, name: '可申请', status: 'processing' },
  { type: 2, name: '不可申请', status: 'error' },
  { type: 3, name: '申请审批中', status: 'processing' },
  { type: 4, name: '申请通过', status: 'success' },
];

export const getColumns = (toggleRecommend) => {
  /**
   * 立即申请权限状态集：
   *  申请状态：
   *    1 - 可申请
   *  项目状态：
   *    1 待生成合同
   *    2 已生成部分合同
   *    3 全部生成合同
   * */
  const permApplyImmediatelys = {
    financeStatus: [1],
    projectStatus: [1, 2, 3],
  };

  const columns = [{
    title: '业务类型',
    dataIndex: 'bizTypeDesc',
    key: 'bizTypeDesc',
    width: 200,
    render: text => (
      formatString(text)
    ),
  }, {
    title: '中标项目信息',
    dataIndex: 'projectInfo',
    key: 'projectInfo',
    width: 280,
    render: (text, record) => {
      const { projectName, bidTime } = record;
      return (
        <Fragment>
          <p><span className="list-sub-title">中标项目名称: </span><span>{ formatString(projectName) }</span></p>
          <p><span className="list-sub-title">中标时间: </span>{ formatString(bidTime) }</p>
        </Fragment>
      );
    },
  }, {
    title: '项目状态',
    dataIndex: 'projectStatus',
    key: 'projectStatus',
    width: 140,
    render: (text) => {
      const statusItem = projectStatus.find(d => Number(text) === d.type);
      if (statusItem) {
        return statusItem.name;
      }
      return '-';
    },
  }, {
    title: '融资申请状态',
    dataIndex: 'financeStatus',
    key: 'financeStatus',
    width: 140,
    render: (text) => {
      const statusItem = financeStatus.find(d => Number(text) === d.type);
      if (statusItem) {
        return (
          <Badge status={statusItem.status} text={statusItem.name} />
        );
      }
    },
  }, {
    title: '操作',
    dataIndex: 'id',
    key: 'action',
    width: 160,
    render: (text, record) => {
      const { projectCode } = record;
      return (
        <Fragment>
          {
            permApplyImmediatelys.projectStatus.includes(record.projectStatus) &&
            permApplyImmediatelys.financeStatus.includes(record.financeStatus) && (
              <a className="mr-10" onClick={toggleRecommend.bind(this, 1, projectCode)}>立即申请</a>
            )
          }
          <Link to="/cloan-apply-record?tab=all">申请记录</Link>
        </Fragment>
      );
    },
  }];
  return columns;
};

export const breadcrumb = [{
  label: '中标项目记录',
}];

export const tabs = {
  defaultActiveKey: '1',
  tabList: [{
    label: '可融资',
    value: '1',
    key: '1',
  }, {
    label: '全部',
    value: '0',
    key: '0',
    isAll: true,
  }],
};
