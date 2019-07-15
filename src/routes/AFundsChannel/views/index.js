import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import {
  ZcyBreadcrumb,
  Spin,
  ZcyList,
  Input,
  DropList,
  Modal,
  message,
  Badge,
} from 'doraemon';
import { connect } from 'dva';
import { formatDateToLocal, formatNumber, getRelevantName, validationNumber } from 'commonUtils';
import { CHANNEL_STATUS, BADGE_STATUS_CONFIG } from '../component/typeConstants';

const { confirm } = Modal;

@connect(({ loading, fundsChannel }) => ({
  tableQueryParams: fundsChannel.tableQueryParams,
  fundsChannelList: fundsChannel.fundsChannelList,
  listLoading: loading.effects['fundsChannel/getFundsChannelList'],
}))
// 资方渠道
export default class FundsChannelList extends Component {
  // 初始化
  componentDidMount() {
    this.refreshFundsChannelList();
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'fundsChannel/fundsChannelList',
      payload: {},
    });
  }

  // 刷新列表数据
  refreshFundsChannelList=() => {
    const { tableQueryParams } = this.props;
    this.getFundsChannelList(tableQueryParams);
  }

  // 获得资方渠道列表列表
  getFundsChannelList=(params) => {
    this.props.dispatch({
      type: 'fundsChannel/getFundsChannelList',
      payload: {
        ...params,
      },
    });
  }

  onSearch = (params) => {
    this.props.dispatch({
      type: 'fundsChannel/tableQueryParams',
      payload: params,
    });
    this.getFundsChannelList(params);
  }

  // 开启/关闭渠道
  handleChannelClick = (id, category) => {
  /**
   * category  操作类型
   * 0: 点击关闭
   * 1: 点击开启
   */
    let title = '';
    let content = '';
    let msg = '';
    if (category === 1) {
      title = '确认开启该渠道吗?';
      content = '开启后,可以手动上架该渠道下的全部产品';
      msg = '开启成功';
    } else {
      title = '确认关闭该渠道吗?';
      content = '关闭后,该渠道的全部产品将自动下架';
      msg = '关闭成功';
    }
    confirm({
      title,
      content,
      onOk: () => {
        return new Promise((resolve) => {
          this.props.dispatch({
            type: 'fundsChannel/handleChannel',
            payload: {
              id,
              status: category,
            },
          }).then((res) => {
            if (res.success) {
              message.success(msg);
              this.refreshFundsChannelList();
            }
            resolve();
          });
        });
      },
    });
  }

  // 获得columns
  getColumns=() => {
    const getHandle = (record) => {
      const { status, id, channelCode } = record;
      const itemList = [
        {
          label: '还款历史',
          to: `/loan-business-query/list?channelCode=${channelCode}&businessType=2`,
        }, {
          label: '资金流水',
          to: '/loan-business-query/list?businessType=3',
        },
      ];
      if (status === 1) {
        itemList.push({
          label: '关闭渠道',
          handleClick: () => this.handleChannelClick(id, 0),
        });
      } else {
        itemList.push({
          label: '开启渠道',
          handleClick: () => this.handleChannelClick(id, 1),
        });
      }
      return (
        <Fragment>
          <Link to={`/loan-business-query/list?channelCode=${channelCode}&businessType=1`} style={{ marginRight: '10px' }}>还款计划</Link>
          <DropList itemList={itemList}>
            <a>更多</a>
          </DropList>
        </Fragment>
      );
    };
    const columns = [
      {
        title: '资方渠道信息',
        dataIndex: 'fundsChannelInfo',
        key: 'fundsChannelInfo',
        width: 250,
        render: (text, record) => {
          const { channelCode, channelName, contactName, contactNum } = record;
          return (
            <Fragment>
              <p><span className="list-sub-title">资方代码: </span>{channelCode || '-'}</p>
              <p><span className="list-sub-title">资方名称: </span>{channelName || '-'}</p>
              <p><span className="list-sub-title">联系人姓名: </span>{contactName || '-'}</p>
              <p><span className="list-sub-title">联系人电话: </span>{contactNum || '-'}</p>
            </Fragment>
          );
        },
      }, {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        className: 'nowrap',
        render: (text, record) => (
          formatDateToLocal(record.createTime, true)
        ),
      }, {
        title: '累计受理贷款申请',
        dataIndex: 'loanAcceptResult',
        key: 'loanAcceptResult',
        className: 'nowrap',
        render: (text, record) => {
          const { loanAcceptResult, channelCode } = record;
          const { loanAccept, loanAcceptNum } = loanAcceptResult;
          return (
            <Fragment>
              <p><span className="list-sub-title">申请数(笔): </span><Link to={`/loan-business-manage/list?channelCode=${channelCode}&applyType=0&businessType=1`}>{validationNumber(loanAcceptNum)}</Link></p>
              <p className="money-color"><span className="list-sub-title">金额(元): </span>{formatNumber(loanAccept)}</p>
            </Fragment>
          );
        },
      }, {
        title: '贷款办理中',
        dataIndex: 'loanCheckInResult',
        className: 'nowrap',
        key: 'loanCheckInResult',
        render: (text, record) => {
          const { loanCheckInResult, channelCode } = record;
          const { loanCheckIn, loanCheckInNum } = loanCheckInResult;
          return (
            <Fragment>
              <p><span className="list-sub-title">办理中(笔): </span><Link to={`/loan-business-manage/list?channelCode=${channelCode}&applyType=1&businessType=1`}>{validationNumber(loanCheckInNum)}</Link></p>
              <p className="money-color"><span className="list-sub-title">金额(元): </span>{formatNumber(loanCheckIn)}</p>
            </Fragment>
          );
        },
      }, {
        title: '累计借款',
        dataIndex: 'loanAmountResult',
        key: 'loanAmountResult',
        className: 'nowrap',
        render: (text, record) => {
          const { loanAmountResult, channelCode } = record;
          const { loanAmount, loanAmountNum } = loanAmountResult;
          return (
            <Fragment>
              <p><span className="list-sub-title">借款数(笔): </span><Link to={`/loan-business-manage/list?channelCode=${channelCode}&businessType=2&borrowType=0`}>{validationNumber(loanAmountNum)}</Link></p>
              <p className="money-color"><span className="list-sub-title">金额(元): </span>{formatNumber(loanAmount)}</p>
            </Fragment>
          );
        },
      }, {
        title: '还款中',
        dataIndex: 'repaymentResult',
        key: 'repaymentResult',
        className: 'nowrap',
        render: (text, record) => {
          const { repaymentResult, channelCode } = record;
          const { repaymentAmount, repaymentNum } = repaymentResult;
          return (
            <Fragment>
              <p><span className="list-sub-title">还款中(笔): </span><Link to={`/loan-business-manage/list?channelCode=${channelCode}&businessType=2&borrowType=1`}>{validationNumber(repaymentNum)}</Link></p>
              <p className="money-color"><span className="list-sub-title">金额(元): </span>{formatNumber(repaymentAmount)}</p>
            </Fragment>
          );
        },
      }, {
        title: '逾期中',
        dataIndex: 'loanOverdueResult',
        key: 'loanOverdueResult',
        className: 'nowrap',
        render: (text, record) => {
          const { loanOverdueResult, channelCode } = record;
          const { loanOverdue, loanOverdueNum } = loanOverdueResult;
          return (
            <Fragment>
              <p><span className="list-sub-title">逾期中(笔): </span><Link to={`/loan-business-query/list?channelCode=${channelCode}&businessType=1&repayType=3`}>{validationNumber(loanOverdueNum) }</Link></p>
              <p className="money-color"><span className="list-sub-title">金额(元): </span>{formatNumber(loanOverdue)}</p>
            </Fragment>
          );
        },
      }, {
        title: '上架产品数(个)',
        dataIndex: 'productNumResult',
        key: 'productNumResult',
        className: 'nowrap',
        render: (text, record) => {
          const { productNumResult } = record;
          const { productNum } = productNumResult;
          return <Link to="/product-release/list?tab=1">{validationNumber(productNum)}</Link>;
        },
      }, {
        title: '累计客户数(位)',
        dataIndex: 'customerNum',
        key: 'customerNum',
        className: 'nowrap',
        render: (text, record) => (
          validationNumber(record.customerNum)
        ),
      }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        className: 'nowrap',
        render: (text, record) => {
          const { status } = record;
          const name = getRelevantName(status, CHANNEL_STATUS);
          return (
            <Badge className="list-badge" status={BADGE_STATUS_CONFIG[status]} text={name} />
          );
        },
      }, {
        title: '操作',
        dataIndex: 'handle',
        key: 'handle',
        fixed: 'right',
        width: 140,
        render: (text, record) => {
          const handle = getHandle(record);
          return handle;
        },
      },
    ];
    return columns;
  }

  // 获得customItem
  getCustomItem=() => {
    const customItem = [
      {
        label: '资方名称',
        id: 'channelName',
        render: () => {
          return <Input placeholder="请输入" />;
        },
      }, {
        label: '资方代码',
        id: 'channelCode',
        render: () => {
          return <Input placeholder="请输入" />;
        },
      },
    ];
    return customItem;
  }


  getConfigInfo = () => ({
    routes: [{
      label: '资方渠道',
    }],
    tabList: [{
      label: '资方渠道列表',
    }],
  })


  render() {
    const { listLoading, fundsChannelList, tableQueryParams } = this.props;
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
      dataSource: fundsChannelList.data || [],
      pagination: {
        pageSize,
        current: pageNo,
        showSizeChanger: true,
        total: fundsChannelList.total,
      },
      scroll: { x: 1800 },
      rowKey: record => record.id,
    };
    return (
      <Spin spinning={listLoading}>
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
