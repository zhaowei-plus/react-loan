import React, { Component, Fragment } from 'react';
import {
  ZcyBreadcrumb,
  Spin,
  ZcyList,
  Input,
  Select,
  Badge,
} from 'doraemon';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { formatDateToLocal, getRelevantName } from 'commonUtils';
import { PROCESS_STATUS, LOAN_STATUS, BADGE_STATUS_CONFIG, ACTION_TYPE } from '../component/typeConstants';

import ManualHandleRecordModal from '../modal/ManualHandleRecordModal';

const { Option } = Select;
@connect(({ loading, marketingManage }) => ({
  tableQueryParams: marketingManage.tableQueryParams,
  marketingManageList: marketingManage.marketingManageList,
  listLoading: loading.effects['marketingManage/getMarketingManageList'],
}))
// 营销中心列表
export default class MarketingManageList extends Component {
  state={
    supplierId: '',
    operatorId: '',
    showManualModal: false,
  }
  // 初始化
  componentDidMount() {
    this.refreshMarketingManageList();
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'marketingManage/marketingManageList',
      payload: {},
    });
  }

  // 刷新列表数据
  refreshMarketingManageList=() => {
    const { tableQueryParams } = this.props;
    this.getMarketingManageList(tableQueryParams);
  }

  // 获得营销中心列表
  getMarketingManageList=(params) => {
    this.props.dispatch({
      type: 'marketingManage/getMarketingManageList',
      payload: {
        ...params,
      },
    });
  }

  onSearch=(params) => {
    this.props.dispatch({
      type: 'marketingManage/tableQueryParams',
      payload: params,
    });
    this.getMarketingManageList(params);
  }

  // 点击人工处理记录
  clickManualHandle=(supplierId, operatorId) => {
    const { showManualModal } = this.state;
    this.setState({
      supplierId,
      operatorId,
      showManualModal: !showManualModal,
    });
  }

  // 获得columns
  getColumns=() => {
    const columns = [
      {
        title: '客户信息',
        dataIndex: 'supplierName',
        key: 'supplierName',
        render: (text, record) => {
          const { supplierName, certificateNo, supplierId } = record;
          return (
            <Fragment>
              <p><span className="list-sub-title">客户名称: </span><Link to={`/customer/view/${supplierId}`}>{supplierName || '-'}</Link></p>
              <p><span className="list-sub-title">证件号码: </span>{certificateNo || '-'}</p>
            </Fragment>
          );
        },
      }, {
        title: '最新识别事件',
        dataIndex: 'newEvent',
        key: 'newEvent',
        render: (text, record) => {
          const { actionName, createTime } = record;
          return (
            <Fragment>
              <p><span className="list-sub-title">事件名称: </span>{actionName || '-'}</p>
              <p><span className="list-sub-title">识别时间: </span>{formatDateToLocal(createTime, true)}</p>
            </Fragment>
          );
        },
      }, {
        title: '参考处理方案',
        dataIndex: 'remark',
        key: 'remark',
        width: 200,
        render: (text, record) => (
          record.remark || '-'
        ),
      }, {
        title: '联系信息',
        dataIndex: 'contactInfo',
        key: 'contactInfo',
        render: (text, record) => {
          const { operatorName, operatorAccount } = record;
          return (
            <Fragment>
              <p><span className="list-sub-title">事件触发人: </span>{operatorName || '-'}</p>
              <p><span className="list-sub-title">事件触发账号: </span>{operatorAccount || '-'}</p>
            </Fragment>
          );
        },
      }, {
        title: '处理状态',
        dataIndex: 'status',
        key: 'status',
        className: 'nowrap',
        render: (text, record) => {
          const { status } = record;
          const name = getRelevantName(status, PROCESS_STATUS);
          return (
            <Badge className="list-badge" status={BADGE_STATUS_CONFIG[status]} text={name} />
          );
        },
      }, {
        title: '是否有贷款记录',
        dataIndex: 'loanStatus',
        key: 'loanStatus',
        className: 'nowrap',
        render: (text, record) => {
          const name = getRelevantName(record.loanStatus, LOAN_STATUS);
          return name;
        },
      }, {
        title: '操作',
        dataIndex: 'handle',
        key: 'handle',
        fixed: 'right',
        width: 100,
        render: (text, record) => {
          const { supplierId, operatorId } = record;
          return <a onClick={() => this.clickManualHandle(supplierId, operatorId)}>人工处理记录</a>;
        },
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
        label: '证件号码',
        id: 'certificateNo',
        render: () => {
          return <Input placeholder="请输入" />;
        },
      }, {
        label: '处理状态',
        id: 'status',
        decoratorOptions: {
          initialValue: null,
        },
        render: () => {
          return (
            <Select>
              {
                PROCESS_STATUS.map(status => (
                  <Option key={status.type} value={status.type}>{status.name}</Option>
                ))
              }
            </Select>
          );
        },
      }, {
        label: '贷款记录',
        id: 'loanStatus',
        decoratorOptions: {
          initialValue: null,
        },
        render: () => {
          return (
            <Select>
              {
                LOAN_STATUS.map(recordInfo => (
                  <Option key={recordInfo.type} value={recordInfo.type}>{recordInfo.name}</Option>
                ))
              }
            </Select>
          );
        },
      }, {
        label: '行为事件',
        id: 'actionType',
        decoratorOptions: {
          initialValue: null,
        },
        render: () => {
          return (
            <Select>
              {
                ACTION_TYPE.map(actionInfo => (
                  <Option key={actionInfo.type} value={actionInfo.type}>{actionInfo.name}</Option>
                ))
              }
            </Select>
          );
        },
      },
    ];
    return customItem;
  }

  getConfigInfo=() => ({
    routes: [
      {
        label: '行为事件识别与管理',
      },
    ],
    tabList: [{
      label: '行为事件识别与管理列表',
    }],
  })

  render() {
    const { listLoading, marketingManageList, tableQueryParams } = this.props;
    const { pageSize, pageNo, type, ...initSearchParams } = tableQueryParams;
    const { supplierId, operatorId, showManualModal } = this.state;

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
      dataSource: marketingManageList.data || [],
      pagination: {
        pageSize,
        current: pageNo,
        showSizeChanger: true,
        total: marketingManageList.total,
      },
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
        {
          showManualModal ? (
            <ManualHandleRecordModal
              visible={showManualModal}
              supplierId={supplierId}
              operatorId={operatorId}
              onCancel={this.clickManualHandle}
              refreshMarketingManageList={this.refreshMarketingManageList}
            />
          ) : null
        }
      </Spin>
    );
  }
}
