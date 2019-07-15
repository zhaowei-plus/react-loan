import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import qs from 'qs';
import { Spin, ZcyList, Input, ZcyBreadcrumb, Modal, message, DropList } from 'doraemon';
import { Link } from 'react-router-dom';
import { formatDateToLocal } from 'commonUtils';
import { PROD_RELEASE_STATUS } from '../constant';

@connect(({ loading, prodReleaseManage }) => ({
  loading: loading.effects['prodReleaseManage/getList'],
  releaseList: prodReleaseManage.releaseList,
  tableQueryParams: prodReleaseManage.tableQueryParams,
}))
export default class ProdReleaseManage extends Component {
  constructor(props) {
    super(props);


    const tableQueryParamsWithUrlParams = this.storeUrlQueryParams(props);

    const { tabType, pageSize, pageNo, ...initSearchParams } = tableQueryParamsWithUrlParams;
    this.state = {
      selectedRowKeys: [],
      initSearchParams,
    };
  }

  storeUrlQueryParams = (props) => {
    let { search } = props.location;

    search = search.substring(1);

    const { tab } = qs.parse(search);

    tab && (this.urlParams.tabType = tab);

    this.initOnce = true;


    const tableQueryParamsWithUrlParams = {
      ...props.tableQueryParams,
      ...this.urlParams,
    };

    if (tab) {
      /**
       * 创建渠道产品成功，带参数返回渠道产品列表,默认进入暂存tab
       */
      this.props.dispatch({
        type: 'prodReleaseManage/tableQueryParams',
        payload: tableQueryParamsWithUrlParams,
      });
    }

    return tableQueryParamsWithUrlParams;
  }

  urlParams = {};


  componentDidMount() {
    this.fetchList();
  }

  fetchList = (params = {}) => {
    const { tableQueryParams } = this.props;


    let urlParams = {};

    /**
     * 第一次进入页面 tableQueryParams可能未及时更新
     * 手动获取url上的参数
     */
    if (this.initOnce) {
      urlParams = this.urlParams;
      this.initOnce = false;
    }
    const payload = {
      ...tableQueryParams,
      ...params,
      ...urlParams,
    };

    this.props.dispatch({
      type: 'prodReleaseManage/getList',
      payload,
    });
  };

  handleSearch = (params) => {
    this.props.dispatch({
      type: 'prodReleaseManage/tableQueryParams',
      payload: params,
    });

    this.fetchList(params);
  };

  /**
   * 批量上下架
   * @param e
   * @param selectedRowKeys
   */
  batchProdStatusHandle = (e, selectedRowKeys) => {
    const { tableQueryParams } = this.props;
    const { tabType } = tableQueryParams;

    const text = tabType === '1' ? '批量下架' : '批量上架';

    const payload = {
      ids: selectedRowKeys.join(','),
      releaseType: tabType === '1' ? 2 : 1,
    };

    this.changeProdStatus({
      payload,
      text,
      title: `正在${text}已选中产品，是否继续操作？`,
    });
  };

  /**
   * 上下架
   * @param record
   */
  handleProdStatus = (record) => {
    const { id, status, name } = record;
    const text = status === 1 ? '下架' : '上架';

    this.changeProdStatus({
      text,
      title: `正在${text}${name}产品，是否继续操作？`,
      payload: {
        ids: [Number(id)].join(','),
        releaseType: status === 1 ? 2 : 1,
      },
    });
  };

  changeProdStatus = ({ payload, text, title }) => {
    Modal.confirm({
      title,
      onOk: () => {
        return new Promise((resolve, reject) => {
          this.props.dispatch({
            type: 'prodReleaseManage/toggleStatus',
            payload,
          })
            .then((res) => {
              if (res.success) {
                resolve();
                message.success(`${text}成功`);
                this.setState({
                  selectedRowKeys: [],
                });
                this.fetchList();
                return;
              }
              reject();
              message.error(res.error || `${text}失败`);
            }, (res) => {
              reject(res);
            });
        });
      },
    });
  };


  get activeTabKey() {
    const { tableQueryParams } = this.props;
    const { tabType } = tableQueryParams;

    let activeTab = tabType;
    /**
     * 页面初始化的时候
     * url中如果有参数，使用url中的参数
     */
    if (this.initOnce) {
      activeTab = this.urlParams.tab || tabType;
    }
    return activeTab;
  }

  onRowSelectionChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  render() {
    const { loading, tableQueryParams, releaseList } = this.props;

    const { selectedRowKeys, initSearchParams } = this.state;

    const { tabType, pageSize, pageNo } = tableQueryParams;

    const customItem = [
      {
        label: '渠道产品名称',
        id: 'name',
        decoratorOptions: {
          initialValue: '',
        },
        render: () => {
          return (
            <Input placeholder="请输入" />
          );
        },
      }, {
        label: '渠道产品编码',
        id: 'code',
        decoratorOptions: {
          initialValue: '',
        },
        render: () => {
          return (
            <Input placeholder="请输入" />
          );
        },
      }, {
        label: '渠道产品代码',
        id: 'num',
        decoratorOptions: {
          initialValue: '',
        },
        render: () => {
          return (
            <Input
              placeholder="请输入"
            />
          );
        },
      }];

    const columns = [
      {
        title: '资方渠道',
        dataIndex: 'channelName',
        key: 'channelName',
      }, {
        title: '产品简介',
        dataIndex: 'prodIntro',
        key: 'prodIntro',
        render: (text, record) => {
          return (
            <Fragment>
              <div>
                <span className="list-sub-title">
                   渠道产品名称：
                </span>
                {record.name}
              </div>
              <div>
                <span className="list-sub-title">
                  流程名称：
                </span>
                {record.processName}
              </div>
            </Fragment>
          );
        },
      },
      {
        title: '橱窗位',
        dataIndex: 'productShow',
        key: 'productShow',
        width: 100,
        render: (productShow) => {
          if (!productShow || !productShow.length) {
            return '-';
          }
          return (
            <span>
              {productShow.join('、')}
            </span>
          );
        },
      }, {
        title: '操作记录',
        dataIndex: 'shelfTime',
        key: 'shelfTime',
        className: 'nowrap',
        render: (text, record) => {
          return (
            <Fragment>
              <div>
                <span className="list-sub-title">
                  上架时间：
                </span>
                <span>
                  {formatDateToLocal(text, true)}
                </span>
              </div>
              <div>
                <span className="list-sub-title">
                   操作人：
                </span>
                <span>
                  {record.creatorName || '-'}
                </span>
              </div>
            </Fragment>
          );
        },
      }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        className: 'nowrap',
        render: (text) => {
          const [{ label: statusText = '-' }] = PROD_RELEASE_STATUS.filter(status => status.value === text);
          return statusText;
        },
      }, {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        className: 'nowrap',
        width: 40,
        render: (text, record) => {
          const { status } = record;

          if (status === 1) {
            return (
              <Fragment>
                <a
                  onClick={() => {
                    this.handleProdStatus(record);
                  }}
                >下架
                </a>
                <Link className="pl-10" to={`/product-release/view/${record.id}`}>查看</Link>
              </Fragment>
            );
          } else {
            const itemList = [{
              label: '配置',
              to: `/product-release/edit/${record.id}`,
            }, {
              label: '查看',
              to: `/product-release/view/${record.id}`,
            }];
            return (
              <Fragment>
                <a
                  onClick={() => {
                    this.handleProdStatus(record);
                  }}
                >上架
                </a>
                <DropList itemList={itemList} className="pl-10">
                  <a>更多</a>
                </DropList>
              </Fragment>
            );
          }
        },
      }];

    const tabs = {
      defaultActiveKey: '1',
      activeKey: this.activeTabKey,
      tabList: [{
        label: '已上架',
        key: '1',
      }, {
        label: '暂存',
        key: '3',
      }, {
        label: '已下架',
        key: '2',
      }],
    };

    const pagination = {
      total: releaseList.total,
      pageSize,
      current: pageNo,
      showSizeChanger: true,
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onRowSelectionChange,
    };
    const batchBtn = [
      {
        label: tabType === '1' ? '批量下架' : '批量上架',
        handleClick: this.batchProdStatusHandle,
      },
    ];
    const table = {
      columns,
      dataSource: releaseList.data,
      pagination,
      rowKey: record => record.id,
      rowSelection,
    };


    return (
      <Spin
        spinning={loading}
      >
        <ZcyBreadcrumb
          routes={[{
            label: '产品发布记录',
          }]}
        />
        <ZcyList
          tabs={tabs}
          tabKey="tabType"
          table={table}
          initSearchParams={initSearchParams}
          customItem={customItem}
          onSearch={this.handleSearch}
          batchBtn={batchBtn}
        />
      </Spin>
    );
  }
}
