import React, { Component, Fragment } from 'react';

import {
  ZcyBreadcrumb,
  Spin,
  ZcyList,
  Select,
  Badge,
  Input,
  message,
} from 'doraemon';
import { connect } from 'dva';
import { getRelevantName, formatString, formatNumber, mergeTableCellData, renderCell } from 'commonUtils';
import { RECORD_STATUS, BADGE_STATUS_CONFIG } from '../constants';

const { Option } = Select;

@connect(({ loading, contractRecord }) => ({
  tableQueryParams: contractRecord.tableQueryParams,
  contractRecordList: contractRecord.contractRecordList,
  contractRecordLoading: loading.effects['contractRecord/fetchContractRecordList'],
}))
export default class ContractRecord extends Component {
  componentDidMount() {
    const { tableQueryParams } = this.props;
    this.fetchContractRecordList(tableQueryParams);
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'contractRecord/contractRecordList',
      payload: {},
    });
  }

  // 获得中标合同备案列表
  fetchContractRecordList = (params) => {
    this.props.dispatch({
      type: 'contractRecord/fetchContractRecordList',
      payload: {
        ...params,
      },
    });
  }

  onSearch = (params) => {
    this.props.dispatch({
      type: 'contractRecord/tableQueryParams',
      payload: params,
    });
    this.fetchContractRecordList(params);
  }


  // 跳转页面
  // 无跳转url时,toast提示
  jumpPage=(type, url) => {
    message.destroy();
    let msg = '';
    if (type === 'NOTICE') {
      msg = '暂无合同公告链接';
    } else {
      msg = '暂无合同详情链接';
    }
    if (!url) {
      message.warning(msg);
      return;
    }
    window.open(url);
  }


  // 获得columns
  getColumns = () => {
    const columns = [
      {
        title: '中标(成交)供应商',
        dataIndex: 'customerName',
        key: 'customerName',
        width: 250,
        render: renderCell,
      }, {
        title: '中标项目名称',
        dataIndex: 'projectName',
        key: 'projectName',
        width: 250,
        render: renderCell,
      }, {
        title: '合同编号',
        dataIndex: 'code',
        key: 'contractNo',
        width: 250,
        render: text => (
          formatString(text)
        ),
      }, {
        title: '合同金额(元)',
        dataIndex: 'amount',
        key: 'amount',
        className: 'nowrap money',
        align: 'right',
        render: text => (
          formatNumber(text)
        ),
      }, {
        title: '合同备案状态',
        dataIndex: 'status',
        key: 'status',
        className: 'nowrap',
        render: text => (
          <Badge status={BADGE_STATUS_CONFIG[text]} text={getRelevantName(text, RECORD_STATUS)} />
        ),
      }, {
        title: '操作',
        dataIndex: 'handle',
        key: 'handle',
        className: 'nowrap',
        fixed: 'right',
        width: 150,
        render: (text, record) => (
          <Fragment>
            <a className="mr-10" onClick={() => this.jumpPage('DETAIL', record.detailUrl)}>合同详情</a>
            <a onClick={() => this.jumpPage('NOTICE', record.announceUrl)}>合同公告</a>
          </Fragment>
        ),
      },
    ];
    return columns;
  }

  // 获得customItem
  getCustomItem = () => {
    const customItem = [
      {
        label: '供应商',
        id: 'customerName',
        render: () => (
          <Input placeholder="请输入" />
        ),
      }, {
        label: '项目名称',
        id: 'bidProjectName',
        render: () => (
          <Input placeholder="请输入" />
        ),
      },
      {
        label: '合同状态',
        id: 'status',
        decoratorOptions: {
          initialValue: null,
        },
        render: () => (
          <Select>
            {RECORD_STATUS.map((status) => {
              return (
                <Option key={status.type} value={status.type}>{status.name}</Option>
              );
            })}
          </Select>
        ),
      },
    ];
    return customItem;
  }

  getConfigInfo = () => ({
    routes: [{
      label: '中标合同备案',
    }],
    tabList: [{
      label: '中标合同备案列表',
    }],
  })

  render() {
    const { contractRecordLoading, contractRecordList, tableQueryParams } = this.props;
    const { pageSize, pageNo, type, ...initSearchParams } = tableQueryParams;

    const contractRecordData = mergeTableCellData(contractRecordList.data, 'mergeId');

    const configInfo = this.getConfigInfo();
    const routes = configInfo.routes || [];
    const tabList = configInfo.tabList || [];

    const customItem = this.getCustomItem();
    const columns = this.getColumns();
    const tabs = {
      defaultActiveKey: type,
      activeKey: type,
      tabList,
    };

    const table = {
      columns,
      bordered: true,
      dataSource: contractRecordData || [],
      pagination: {
        pageSize,
        current: pageNo,
        showSizeChanger: true,
        total: contractRecordList.total,
      },
      rowKey: record => record.id,
    };
    return (
      <Spin spinning={contractRecordLoading}>
        <ZcyBreadcrumb
          routes={routes}
        />
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
