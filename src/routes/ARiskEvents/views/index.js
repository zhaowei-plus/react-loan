import React, { Component } from 'react';
import {
  ZcyBreadcrumb,
  Spin,
  ZcyList,
  Modal,
  message,
} from 'doraemon';
import { connect } from 'dva';
import { fixDateRequestParams } from 'commonUtils';

import { getCustomItem, getTableConfig, getTabsConfig } from '../config';
import { ROUTES } from '../constants';
import './index.less';

const { confirm } = Modal;

@connect(({ loading, riskEvents, privileges }) => ({
  tableQueryParams: riskEvents.tableQueryParams,
  list: riskEvents.list,
  listLoading: loading.effects['riskEvents/fetchList'],
  privileges: privileges['/risk-events/approve'],
}))

export default class RiskEvents extends Component {
  constructor() {
    super();
    this.minHeightDiv = React.createRef();
  }
  componentDidMount() {
    this.loadList();
  }

  // 加载列表数据
  loadList=() => {
    const { tableQueryParams } = this.props;
    this.fetchList(tableQueryParams);
  }

  // 离开页面时清空数据
  componentWillUnmount() {
    // 清空数据
    this.props.dispatch({
      type: 'riskEvents/resetList',
    });
  }

  // 请求列表数据
  fetchList=(params) => {
    const { reportTime, ...resetParams } = params;
    if (params.reportTime) {
      resetParams.startTime = fixDateRequestParams(params.reportTime[0]);
      resetParams.endTime = fixDateRequestParams(params.reportTime[1], true);
    }
    this.props.dispatch({
      type: 'riskEvents/fetchList',
      payload: {
        ...resetParams,
      },
    });
  }

  // 搜索
  onSearch=(params) => {
    this.props.dispatch({
      type: 'riskEvents/tableQueryParams',
      payload: { ...params },
    });
    this.fetchList(params);
  }

  // 点击操作
  handleClick=(id, type) => {
    switch (type) {
    case 'DELETE':
      this.delete(id);
      break;
    case 'REMIND':
      this.remind(id);
      break;
    case 'CREATE':
      this.create(id);
      break;
    default:
      break;
    }
  }

 // 删除
 delete=(id) => {
   confirm({
     content: '正在操作删除,是否继续操作？',
     onOk: () => {
       return new Promise((resolve) => {
         this.props.dispatch({
           type: 'riskEvents/delete',
           payload: { Ids: [id] },
         }).then((res) => {
           if (res.success) {
             message.success('删除成功');
             this.loadList();
           }
         });
         resolve();
       });
     },
   });
 }

  // 提醒
  remind=(id) => {
    confirm({
      content: '正在操作提醒,是否继续操作？',
      onOk: () => {
        return new Promise((resolve) => {
          this.props.dispatch({
            type: 'riskEvents/remind',
            payload: { id },
          }).then((res) => {
            if (res.success) {
              message.success('提醒成功');
            }
          });
          resolve();
        });
      },
    });
  }

  // 创建
  create=() => {
    message.destroy();
    message.success('创建成功');
  }

  render() {
    const { listLoading, tableQueryParams } = this.props;
    // initSearchParams 搜索项默认回填参数
    const { pageSize, pageNo, tab, ...initSearchParams } = tableQueryParams;

    const customItem = getCustomItem();
    const tabs = getTabsConfig(tab);
    const table = getTableConfig(this);
    return (
      <Spin spinning={listLoading}>
        <ZcyBreadcrumb
          routes={ROUTES}
        />
        <ZcyList
          tabs={tabs}
          tabKey="tab"
          table={table}
          customItem={customItem}
          onSearch={this.onSearch}
          initSearchParams={initSearchParams}
        />
      </Spin>
    );
  }
}
