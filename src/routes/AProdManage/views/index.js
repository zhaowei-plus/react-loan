import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Spin, ZcyList, Input, ZcyBreadcrumb, DropList } from 'doraemon';
import { formatDateToLocal } from 'commonUtils';

@connect(({ loading, basicProdReleaseManage }) => ({
  tableQueryParams: basicProdReleaseManage.tableQueryParams,
  loading: loading.effects['basicProdReleaseManage/getList'],
  basicProdList: basicProdReleaseManage.basicProdList,
}))
export default class BasicProdManage extends Component {
  componentDidMount() {
    this.fetchList();
  }

  fetchList = (params = {}) => {
    const { tableQueryParams } = this.props;
    const payload = {
      ...tableQueryParams,
      ...params,
    };

    this.props.dispatch({
      type: 'basicProdReleaseManage/getList',
      payload,
    });
  };

  handleSearch = (params) => {
    this.props.dispatch({
      type: 'basicProdReleaseManage/tableQueryParams',
      payload: params,
    });

    this.fetchList(params);
  };


  render() {
    const { loading, tableQueryParams = {}, basicProdList } = this.props;

    const { queryType, pageSize, pageNo, ...initSearchParams } = tableQueryParams;

    const customItem = [
      {
        label: '基础产品名称',
        id: 'name',
        decoratorOptions: {
          initialValue: '',
        },
        render: () => {
          return (
            <Input placeholder="请输入" />
          );
        },
      }];

    const columns = [
      {
        title: '基础产品名称',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => (
          <Link to={`/product-basic-config/view/${record.id}`}>{text}</Link>
        ),
      }, {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text) => {
          return formatDateToLocal(text);
        },
      },
      {
        title: '已使用（次）',
        dataIndex: 'refNum',
        key: 'refNum',
        width: 100,
        render: (text) => {
          return text || '-';
        },
      }, {
        title: '授权渠道',
        dataIndex: 'channelName',
        key: 'channelName',
        render: (text) => {
          return text || '-';
        },
      }, {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        className: 'nowrap',
        width: 40,
        render: (text, record) => {
          const itemList = [{
            label: '创建渠道产品',
            to: `/product-release/create/${record.id}`,
          }, {
            label: '查看',
            to: `/product-basic-config/view/${record.id}`,
          }];
          return (
            <Fragment>
              <a
                data-id={record.id}
                data-status={record.status}
                href={`#/product-basic-config/edit/${record.id}`}
              >配置
              </a>
              <DropList itemList={itemList} className="pl-10">
                <a>更多</a>
              </DropList>
            </Fragment>
          );
        },
      }];

    const tabs = {
      tabList: [{
        label: '基础产品列表',
        key: '1',
      }],
    };

    const pagination = {
      total: basicProdList.total,
      pageSize,
      current: pageNo,
      showSizeChanger: true,
    };

    const table = {
      columns,
      dataSource: basicProdList.data || [],
      pagination,
      rowKey: record => record.id,
    };

    const globalBtn = [{
      label: '新增基础产品',
      type: 'primary',
      to: '/product-basic-config/create',
    }];


    return (
      <Spin
        spinning={loading}
      >
        <ZcyBreadcrumb
          routes={[{
            label: '基础产品设计',
          }]}
          globalBtn={globalBtn}
        />
        <ZcyList
          tabs={tabs}
          table={table}
          initSearchParams={initSearchParams}
          customItem={customItem}
          onSearch={this.handleSearch}
        />
      </Spin>
    );
  }
}
