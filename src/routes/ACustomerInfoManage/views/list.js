import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  ZcyBreadcrumb,
  Spin,
  ZcyList,
  Input,
} from 'doraemon';
import { connect } from 'dva';

@connect(({ loading, customerInfo }) => ({
  tableQueryParams: customerInfo.tableQueryParams,
  customerInfoList: customerInfo.customerInfoList,
  customerInfoListLoading: loading.effects['customerInfo/getCustomerInfoList'],
}))
export default class CustomerInfoManageList extends Component {
  componentDidMount() {
    const { tableQueryParams } = this.props;
    this.getCustomerInfoList(tableQueryParams);
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'customerInfo/customerInfoList',
      payload: {},
    });
  }


  // 获得客户档案管理列表
  getCustomerInfoList=(params) => {
    this.props.dispatch({
      type: 'customerInfo/getCustomerInfoList',
      payload: {
        ...params,
      },
    });
  }

  onSearch=(params) => {
    this.props.dispatch({
      type: 'customerInfo/tableQueryParams',
      payload: params,
    });
    this.getCustomerInfoList(params);
  }

  // 获得columns
  getColumns=() => {
    const columns = [
      {
        title: '企业名称',
        dataIndex: 'enterpriseName',
        key: 'enterpriseName',
        render: (text, record) => (
          record.enterpriseName || '-'
        ),
      }, {
        title: '联系电话',
        dataIndex: 'phoneNo',
        key: 'phoneNo',
        render: (text, record) => (
          record.phoneNo || '-'
        ),
      }, {
        title: '企业成立日期',
        dataIndex: 'establishedDate',
        key: 'establishedDate',
        className: 'nowrap',
        render: (text, record) => (
          record.establishedDate || '-'
        ),
      }, {
        title: '操作',
        dataIndex: 'handle',
        key: 'handle',
        fixed: 'right',
        width: 80,
        render: (text, record) => (
          <Link to={`/customer/view/${record.id}`}>查看</Link>
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
        id: 'customerName',
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
        label: '企业客户档案管理',
      },
    ],
    tabList: [{
      label: '企业客户档案管理列表',
    }],
  })

  render() {
    const { customerInfoListLoading, customerInfoList = {}, tableQueryParams } = this.props;
    const { pageSize, pageNo, type, ...initSearchParams } = tableQueryParams;

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
      dataSource: customerInfoList.data || [],
      pagination: {
        pageSize,
        current: pageNo,
        showSizeChanger: true,
        total: customerInfoList.total,
      },
      rowKey: record => record.id,
    };
    return (
      <Spin spinning={customerInfoListLoading}>
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
