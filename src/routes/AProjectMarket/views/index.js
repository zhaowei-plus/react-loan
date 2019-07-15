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
import { formatString, getRelevantName, formatNumber } from 'commonUtils';

import InviteCustomerModal from 'common/modal/InviteCustomerModal';
import TableOperateList from 'common/component/TableOperateList';
import { APPLY_STATUS, PROJECT_STATUS, BADGE_STATUS_CONFIG } from '../constants/typeConstants';
import { getOperationConfig } from '../config';

const { Option } = Select;
@connect(({ loading, projectMarket }) => ({
  tableQueryParams: projectMarket.tableQueryParams,
  projectMarketList: projectMarket.projectMarketList,
  listLoading: loading.effects['projectMarket/fetchProjectMarketList'],
}))

export default class ProjectMarketList extends Component {
  state={
    showInviteCustomer: false, // 邀请客户模块
  }
  // 初始化
  componentDidMount() {
    this.refreshList();
  }

  // 离开页面时清空列表数据
  componentWillUnmount() {
    this.props.dispatch({
      type: 'projectMarket/projectMarketList',
      payload: {},
    });
  }
  // 刷新列表数据
  refreshList=() => {
    const { tableQueryParams } = this.props;
    this.fetchProjectMarketList(tableQueryParams);
  }

  // 获得中标项目营销列表
  fetchProjectMarketList=(params) => {
    const { tab } = params;
    this.props.dispatch({
      type: 'projectMarket/fetchProjectMarketList',
      payload: {
        ...params,
        tab: tab === '0' ? null : tab,
      },
    });
  }

  onSearch=(params) => {
    this.props.dispatch({
      type: 'projectMarket/tableQueryParams',
      payload: params,
    });
    this.fetchProjectMarketList(params);
  }

  // 点击操作
  handleClick = (type, record) => {
    const { announcementUrl, notificationUrl } = record;
    switch (type) {
    case 'INVITE': this.inviteCustomer(record);
      break;
    case 'NOTICE': this.jumpPage(type, announcementUrl);
      break;
    case 'MESSAGE': this.jumpPage(type, notificationUrl);
      break;
    default:
      break;
    }
  }

  // 邀请客户
  inviteCustomer=(selectedRecord) => {
    const { showInviteCustomer } = this.state;
    this.setState({
      selectedRecord,
      showInviteCustomer: !showInviteCustomer,
    });
  }

  // 跳转页面
  // 无跳转url时,toast提示
  jumpPage=(type, url) => {
    message.destroy();
    let msg = '';
    if (type === 'NOTICE') {
      msg = '暂无中标公告链接';
    } else {
      msg = '暂无中标通知书链接';
    }
    if (!url) {
      message.warning(msg);
      return;
    }
    window.open(url);
  }

  // 获得columns
  getColumns=() => {
    // 获得操作项
    const getOperationBtn = (record) => {
      /**
         * financeStatus  融资申请状态
         * 1: 可申请
         * 2: 不可申请
         * 3: 申请审批中
         * 4: 申请通过
         */
      const { financeStatus } = record;

      const getOperationBtnType = (status) => {
        let btnTypes = ['RECORD', 'NOTICE', 'MESSAGE'];
        if (status === 1) {
          btnTypes = ['INVITE', ...btnTypes];
        }
        return btnTypes;
      };


      const operationBtnType = getOperationBtnType(financeStatus);

      // 所有操作项配置信息
      const allOperationConfig = getOperationConfig(record, this.handleClick);
      // 获得操作项对应配置信息
      const operationConfig = [];
      operationBtnType.forEach((btnType) => {
        const btnConfig = allOperationConfig.filter(config => btnType === config.key);
        operationConfig.push(btnConfig[0]);
      });
      return <TableOperateList operationConfig={operationConfig} />;
    };

    const columns = [
      {
        title: '业务类型',
        dataIndex: 'bizTypeDesc',
        key: 'bizTypeDesc',
        width: 150,
        render: text => (
          formatString(text)
        ),
      }, {
        title: '中标供应商信息',
        dataIndex: 'customerInfo',
        key: 'customerInfo',
        width: 300,
        render: (text, record) => {
          const { customerName, enterStatusDesc } = record;
          return (
            <Fragment>
              <p><span className="list-sub-title">中标供应商名称: </span>{formatString(customerName)}</p>
              <p><span className="list-sub-title">入驻状态: </span>{enterStatusDesc}</p>
            </Fragment>
          );
        },
      }, {
        title: '中标项目信息',
        dataIndex: 'projectInfo',
        key: 'projectInfo',
        width: 300,
        render: (text, record) => {
          const {
            projectName,
            bidTotalAmount,
            bidTime,
          } = record;
          return (
            <Fragment>
              <p><span className="list-sub-title">中标项目名称: </span>{formatString(projectName) }</p>
              <p className="money-color"><span className="list-sub-title">中标总金额(元): </span>{formatNumber(bidTotalAmount) }</p>
              <p><span className="list-sub-title">中标时间: </span>{bidTime}</p>
            </Fragment>
          );
        },
      }, {
        title: '项目状态',
        dataIndex: 'projectStatusDesc',
        key: 'projectStatusDesc',
        className: 'nowrap',
        render: text => (
          formatString(text)
        ),
      }, {
        title: '融资申请状态',
        dataIndex: 'financeStatus',
        key: 'financeStatus',
        className: 'nowrap',
        render: text => (
          <Badge status={BADGE_STATUS_CONFIG[text]} text={getRelevantName(text, APPLY_STATUS)} />
        ),
      }, {
        title: '操作',
        dataIndex: 'handle',
        key: 'handle',
        className: 'nowrap',
        fixed: 'right',
        width: 120,
        render: (text, record) => {
          const handleBtn = getOperationBtn(record);
          return handleBtn;
        },
      },
    ];
    return columns;
  }

  // 获得customItem
  getCustomItem=() => {
    const customItem = [
      {
        label: '供应商',
        id: 'customerName',
        render: () => (
          <Input placeholder="请输入" />
        ),
      }, {
        label: '项目名称',
        id: 'projectName',
        render: () => (
          <Input placeholder="请输入" />
        ),
      }, {
        label: '项目状态',
        id: 'projectStatus',
        decoratorOptions: {
          initialValue: null,
        },
        render: () => (
          <Select>
            {
              PROJECT_STATUS.map(status => (
                <Option key={status.type} value={status.type}>{status.name}</Option>
              ))
            }
          </Select>
        ),
      },
      {
        label: '申请状态',
        id: 'financeStatus',
        decoratorOptions: {
          initialValue: null,
        },
        render: () => (
          <Select>
            {
              APPLY_STATUS.map(status => (
                <Option key={status.type} value={status.type}>{status.name}</Option>
              ))
            }
          </Select>
        ),
      },
    ];
    return customItem;
  }

  getConfigInfo=() => ({
    routes: [
      {
        label: '中标项目营销',
      },
    ],
    tabList: [
      {
        label: '可融资',
        key: '1',
      }, {
        label: '全部',
        key: '0',
        isAll: true,
      },
    ],
  })

  render() {
    const { listLoading, projectMarketList, tableQueryParams } = this.props;
    const { pageSize, pageNo, tab, ...initSearchParams } = tableQueryParams;
    const { showInviteCustomer, selectedRecord } = this.state;
    const configInfo = this.getConfigInfo();

    const routes = configInfo.routes || [];
    const tabList = configInfo.tabList || [];

    const customItem = this.getCustomItem();
    const columns = this.getColumns();

    const tabs = {
      defaultActiveKey: tab,
      activeKey: tab,
      tabList,
    };

    const table = {
      columns,
      dataSource: projectMarketList.data || [],
      pagination: {
        pageSize,
        current: pageNo,
        showSizeChanger: true,
        total: projectMarketList.total,
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
          tabKey="tab"
          table={table}
          customItem={customItem}
          onSearch={this.onSearch}
          initSearchParams={initSearchParams}
        />
        {
          showInviteCustomer ? (
            <InviteCustomerModal
              visible={showInviteCustomer}
              selectedRecord={selectedRecord}
              onCancel={this.inviteCustomer}
              refreshList={this.refreshList}
              pageType={2}
            />
          ) : null
        }
      </Spin>
    );
  }
}
