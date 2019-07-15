import React, { Component } from 'react';
import {
  ZcyBreadcrumb,
  Spin,
  ZcyList,
  Input,
} from 'doraemon';
import { connect } from 'dva';
import { formatDateToLocal, formatNumber } from 'commonUtils';

@connect(({ loading, serviceChargeManage }) => ({
  tableQueryParams: serviceChargeManage.tableQueryParams,
  serviceChargeList: serviceChargeManage.serviceChargeList,
  serviceChargeLoading: loading.effects['serviceChargeManage/getServiceChargeList'],
}))
export default class ServiceChargeManage extends Component {
  componentDidMount() {
    const { tableQueryParams } = this.props;
    this.getServiceChargeList(tableQueryParams);
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'serviceChargeManage/serviceChargeList',
      payload: {},
    });
  }

  // 获得服务台账报表列表
  getServiceChargeList=(params) => {
    this.props.dispatch({
      type: 'serviceChargeManage/getServiceChargeList',
      payload: {
        ...params,
      },
    });
  }

  onSearch=(params) => {
    this.props.dispatch({
      type: 'serviceChargeManage/tableQueryParams',
      payload: params,
    });
    this.getServiceChargeList(params);
  }

  // 获得columns
  getColumns=() => {
    const columns = [
      {
        title: '客户名称',
        dataIndex: 'supplierName',
        key: 'supplierName',
        render: (text, record) => (
          record.supplierName || '-'
        ),
      }, {
        title: '借款编号',
        dataIndex: 'loanNo',
        key: 'loanNo',
        className: 'nowrap',
        render: (text, record) => (
          record.loanNo || '-'
        ),
      }, {
        title: '费用类型',
        dataIndex: 'paidType',
        key: 'paidType',
        className: 'nowrap',
        render: (text, record) => (
          record.paidType || '-'
        ),
      }, {
        title: '计划收入金额(元)',
        dataIndex: 'planChargeAmount',
        key: 'planChargeAmount',
        className: 'nowrap money',
        align: 'right',
        render: (text, record) => (
          formatNumber(record.planChargeAmount)
        ),
      }, {
        title: '计划到账日',
        dataIndex: 'planChargeTime',
        key: 'planChargeTime',
        className: 'nowrap ',
        align: 'right',
        render: (text, record) => (
          formatDateToLocal(record.planChargeTime, false)
        ),
      }, {
        title: '实际收入金额(元)',
        dataIndex: 'realityChargeAmount',
        key: 'realityChargeAmount',
        className: 'nowrap money',
        align: 'right',
        render: (text, record) => (
          formatNumber(record.realityChargeAmount)
        ),
      }, {
        title: '收入账户',
        dataIndex: 'accountNo',
        key: 'accountNo',
        render: (text, record) => {
          const { accountBank, accountName, accountNo } = record;
          return `${accountName}-${accountBank} ${accountNo}`;
        },
      }, {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        render: (text, record) => (
          record.remark || '-'
        ),
      },
    ];
    return columns;
  }

  // 获得customItem
  getCustomItem=() => {
    const customItem = [
      {
        label: '客户名称',
        id: 'supplierName',
        render: () => {
          return <Input placeholder="请输入" />;
        },
      }, {
        label: '借款编号',
        id: 'loanNo',
        render: () => {
          return <Input placeholder="请输入" />;
        },
      },
    ];
    return customItem;
  }

  getConfigInfo=() => ({
    routes: [
      {
        label: '服务费台账',
      },
    ],
    tabList: [{
      label: '服务费台账列表',
    }],
  })

  render() {
    const { serviceChargeLoading, serviceChargeList, tableQueryParams } = this.props;
    const { pageSize, pageNo, type, ...initSearchParams } = tableQueryParams;

    const configInfo = this.getConfigInfo();

    const routes = configInfo.routes || [];
    const tabList = configInfo.tabList || [];

    const columns = this.getColumns();
    const customItem = this.getCustomItem();

    const tabs = {
      defaultActiveKey: type,
      activeKey: type,
      tabList,
    };

    const table = {
      columns,
      dataSource: serviceChargeList.data || [],
      pagination: {
        pageSize,
        current: pageNo,
        showSizeChanger: true,
        total: serviceChargeList.total,
      },
      rowKey: record => record.id,
    };
    return (
      <Spin spinning={serviceChargeLoading}>
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
