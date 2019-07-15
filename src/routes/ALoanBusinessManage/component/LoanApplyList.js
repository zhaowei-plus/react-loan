import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  Spin,
  ZcyList,
  Input,
  Select,
  DatePicker,
  Tooltip,
  Badge,
} from 'doraemon';
import { connect } from 'dva';
import { formatNumber, getRelevantName, fixDateRequestParams, transformPercent, getUrlSearchParams } from 'commonUtils';
import { PROJECT_PHASE, APPLY_STATUS, PROJECT_SOURCE } from 'common/constants';

import InviteCustomerModal from 'common/modal/InviteCustomerModal';
import ApproveRecordModal from '../modal/ApproveRecordModal';

import { BADGE_STATUS_CONFIG } from './typeConstants';
import AmountRange from './AmountRange';

const { Option } = Select;
const { RangePicker } = DatePicker;

@connect(({ loading, loanBusinessManage }) => ({
  applyTableQueryParams: loanBusinessManage.applyTableQueryParams,
  loanApplyList: loanBusinessManage.loanApplyList,
  channelList: loanBusinessManage.channelList,
  loanApplyLoading: loading.effects['loanBusinessManage/getLoanApplyList'],
}))
export default class LoanApplyList extends Component {
  constructor(props) {
    super(props);
    const { applyTableQueryParams, search } = props;
    const UrlSearchParams = getUrlSearchParams(search);
    const { applyType, channelCode, supplierName } = UrlSearchParams;
    const { type } = applyTableQueryParams;
    this.initial = true;
    this.state = {
      showInviteCustomer: false, // 邀请客户弹窗
      showApproveRecord: false, // 审批记录弹窗
      selectedRecord: {}, // 选中的列表信息
      searchParams: search ? {
        channelCode,
        ...applyTableQueryParams,
        projectName: supplierName || applyTableQueryParams.projectName,
        type: applyType || type || '0',
      } : {
        ...applyTableQueryParams,
      },
    };
  }

  componentDidMount() {
    const { searchParams } = this.state;
    this.props.dispatch({
      type: 'loanBusinessManage/applyTableQueryParams',
      payload: searchParams,
    });
    this.refreshList();
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'loanBusinessManage/loanApplyList',
      payload: {},
    });
  }

  // 刷新列表
  refreshList=() => {
    const { searchParams } = this.state;
    const { applyTableQueryParams } = this.props;
    const params = this.initial ? searchParams : applyTableQueryParams;

    this.getLoanApplyList(params);
  }

  // 获得贷款申请列表
  getLoanApplyList=(params = {}) => {
    const { amountRange = {}, applyTime, type, ...resetParams } = params;
    if (amountRange) {
      resetParams.minAmount = amountRange.min;
      resetParams.maxAmount = amountRange.max;
    }
    if (applyTime) {
      resetParams.startTime = fixDateRequestParams(applyTime[0]);
      resetParams.endTime = fixDateRequestParams(applyTime[1], true);
    }

    resetParams.type = type === '0' ? null : type;

    this.props.dispatch({
      type: 'loanBusinessManage/getLoanApplyList',
      payload: {
        ...resetParams,
      },
    });
  }

  onSearch=(params) => {
    this.initial = false;
    this.props.dispatch({
      type: 'loanBusinessManage/applyTableQueryParams',
      payload: params,
    });

    this.getLoanApplyList(params);
  }

  // 操作邀请客户
  inviteCustomer=(record) => {
    const { showInviteCustomer } = this.state;
    this.setState({
      showInviteCustomer: !showInviteCustomer,
      selectedRecord: record,
    });
  }

  // 操作审批记录
  approveRecord=(record) => {
    const { showApproveRecord } = this.state;
    this.setState({
      showApproveRecord: !showApproveRecord,
      selectedRecord: record,
    });
  }

  // 获得columns
  getColumns=() => {
    const { search } = this.props;
    //  获得操作项
    const getHandle = (record) => {
      const { projectStatus, applyStatus, id } = record;
      let VIEW_BTN = '';
      if (!search) {
        VIEW_BTN = <Link key={1} to={`/loan-business-manage/view/${id}`}>查看</Link>;
      } else {
        // 若有默认搜索参数时,详情页点击返回,固定跳转到贷款申请列表页
        VIEW_BTN = <Link key={1} to={`/loan-business-manage/view/${id}/1`}>查看</Link>;
      }

      const APPROVE_BTN = <a key={2} onClick={() => this.approveRecord(record)} style={{ marginRight: '10px' }}>审批记录</a>;
      const INVITE_BTN = <a key={3} onClick={() => this.inviteCustomer(record)} style={{ marginRight: '10px' }}>邀请客户</a>;

      const handleBtn = [];
      /**
       * projectStatus
       * 10: 额度测算中
       * 20: 额度测算
       * 30: 贷款申请平台审批
       * 40: 贷款申请资方审批
       * 41: 贷款申请未通过待处理
       * 50: 贷款放款平台审批
       * 60: 贷款放款资方审批
       * 61: 贷款放款未通过待处理
       * 70: 贷款申请成功
       * 80: 贷款申请失败
       */
      switch (projectStatus) {
      case 10:
      case 20:
        if (applyStatus === 1) { // 可申请状态
          handleBtn.push(INVITE_BTN);
        }
        handleBtn.push(VIEW_BTN);
        break;
      case 30:
        handleBtn.push(VIEW_BTN);
        break;
      default:
        handleBtn.push(APPROVE_BTN);
        handleBtn.push(VIEW_BTN);
      }
      return handleBtn;
    };

    const columns = [
      {
        title: '贷款申请编号',
        dataIndex: 'applyCode',
        key: 'applyCode',
        width: 200,
        render: (text, record) => {
          if (!search) {
            return <Link to={`/loan-business-manage/view/${record.id}`}>{record.applyCode || '-'}</Link>;
          } else {
            return <Link to={`/loan-business-manage/view/${record.id}/1`}>{record.applyCode || '-'}</Link>;
          }
        },
      }, {
        title: '客户名称',
        dataIndex: 'customerName',
        key: 'customerName',
        width: 200,
        render: (text, record) => (
          record.customerName || '-'
        ),
      },
      {
        title: '项目信息',
        dataIndex: 'projectInfo',
        key: 'projectInfo',
        render: (text, record) => {
          const { projectName, channelName, channelProductName, projectApplyRes } = record;
          return (
            <Fragment>
              <p><span className="list-sub-title">项目名称: </span>{projectName || '-'}</p>
              <p><span className="list-sub-title">渠道名称: </span>{channelName || '-'}</p>
              <p><span className="list-sub-title">渠道产品名称: </span>{channelProductName || '-'}</p>
              <p><span className="list-sub-title">项目申请来源: </span>{getRelevantName(projectApplyRes, PROJECT_SOURCE)}</p>
            </Fragment>
          );
        },
      }, {
        title: '额度测算信息',
        dataIndex: 'measureInfo',
        key: 'measureInfo',
        className: 'nowrap',
        render: (text, record) => {
          const { estimateTime, estimateAmount, estimateTotalAmount } = record;
          return (
            <Fragment>
              <p><span className="list-sub-title">测算时间: </span>{estimateTime || '-'}</p>
              <p><span className="list-sub-title">测算结果金额(元): </span><span className="money-color">{formatNumber(estimateAmount)}</span></p>
              <p><span className="list-sub-title">测算总额度(元): </span><span className="money-color">{formatNumber(estimateTotalAmount)}</span></p>
            </Fragment>
          );
        },
      }, {
        title: '贷款申请信息',
        dataIndex: 'loanApplyInfo',
        key: 'loanApplyInfo',
        className: 'nowrap',
        render: (text, record) => {
          const { applyTime, applyAmount } = record;
          return (
            <Fragment>
              <p><span className="list-sub-title">申请时间: </span>{applyTime || '-'}</p>
              <p><span className="list-sub-title">申请贷款金额(元): </span><span className="money-color">{formatNumber(applyAmount)}</span></p>
            </Fragment>
          );
        },
      }, {
        title: '流程信息',
        dataIndex: 'processInfo',
        key: 'processInfo',
        className: 'nowrap',
        render: (text, record) => {
          const { projectStatus, startTime, endTime } = record;
          const phaseName = getRelevantName(projectStatus, PROJECT_PHASE);
          return (
            <Fragment>
              <p><span className="list-sub-title">项目阶段: </span><span className="money-color">{phaseName}</span></p>
              <p><span className="list-sub-title">项目开始时间: </span>{startTime || '-'}</p>
              <p><span className="list-sub-title">项目终止时间: </span>{endTime || '-'}</p>
            </Fragment>
          );
        },
      }, {
        title: '审批结果',
        dataIndex: 'approveResult',
        key: 'approveResult',
        className: 'nowrap',
        render: (text, record) => {
          const { approveAmount, annualizedRate } = record;
          return (
            <Fragment>
              <p><span className="list-sub-title">审批额度(元): </span><span className="money-color">{formatNumber(approveAmount)}</span></p>
              <p><span className="list-sub-title">贷款年化利率(%): </span>{transformPercent(annualizedRate)}</p>
            </Fragment>
          );
        },
      }, {
        title: '申请状态',
        dataIndex: 'applyStatus',
        key: 'applyStatus',
        className: 'nowrap',
        render: (text, record) => {
          const name = getRelevantName(record.applyStatus, APPLY_STATUS);
          return (
            <Badge className="list-badge" status={BADGE_STATUS_CONFIG[record.applyStatus]} text={name} />
          );
        },
      }, {
        title: '操作',
        dataIndex: 'handle',
        key: 'handle',
        className: 'nowrap',
        fixed: 'right',
        width: 100,
        render: (text, record) => {
          const name = getHandle(record);
          return name;
        },
      },
    ];
    return columns;
  }

  // 获得customItem
  getCustomItem=() => {
    const { channelList } = this.props;
    const customItem = [
      {
        label: '贷款申请编号',
        id: 'applyCode',
        render: () => {
          return <Input placeholder="请输入" />;
        },
      }, {
        label: '项目名称',
        id: 'projectName',
        render: () => {
          return <Input placeholder="请输入" />;
        },
      }, {
        label: '申请时间',
        id: 'applyTime',
        render: () => {
          return <RangePicker />;
        },
      }, {
        label: '项目阶段',
        id: 'projectStatus',
        decoratorOptions: {
          initialValue: null,
        },
        render: () => {
          return (
            <Select>
              {PROJECT_PHASE.map((status) => {
                return (
                  <Option key={status.type} value={status.type}>{status.name}</Option>
                );
              })}
            </Select>
          );
        },
      },
      {
        label: '申请金额区间',
        id: 'amountRange',
        render: () => {
          return <AmountRange />;
        },
      }, {
        label: '产品名称',
        id: 'productName',
        render: () => {
          return <Input placeholder="请输入" />;
        },
      }, {
        label: '资方渠道',
        id: 'channelCode',
        render: () => {
          return (
            <Select
              defaultActiveFirstOption={false}
              placeholder="请选择"
              allowClear
            >
              {
                channelList.map(list => (
                  <Option key={list.channelCode} value={list.channelCode} className="option">
                    <Tooltip title={list.channelName}>
                      {list.channelName}
                    </Tooltip>
                  </Option>
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
    tabList: [
      {
        label: '全部',
        key: '0',
        isAll: true,
      }, {
        label: '办理中',
        key: '1',
      }, {
        label: '已完成',
        key: '2',
      },
    ],
  })

  render() {
    const { loanApplyLoading, loanApplyList, applyTableQueryParams } = this.props;
    const {
      showInviteCustomer,
      showApproveRecord,
      selectedRecord,
      searchParams,
    } = this.state;

    const tableQueryParams = this.initial ? searchParams : applyTableQueryParams;
    const { pageNo, pageSize, type, ...initSearchParams } = tableQueryParams;

    const customItem = this.getCustomItem();
    const columns = this.getColumns();

    const configInfo = this.getConfigInfo();

    const tabList = configInfo.tabList || [];

    const tabs = {
      defaultActiveKey: type || '0',
      activeKey: type || '0',
      tabList,
    };

    const table = {
      columns,
      dataSource: loanApplyList.data || [],
      pagination: {
        pageSize,
        current: pageNo,
        showSizeChanger: true,
        total: loanApplyList.total,
      },
      rowKey: record => record.id,
      scroll: { x: 1700 },
    };

    return (
      <Spin spinning={loanApplyLoading}>
        <ZcyList
          tabs={tabs}
          tabKey="type"
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
              pageType={1}
            />
          ) : null
        }
        {
          showApproveRecord ? (
            <ApproveRecordModal
              visible={showApproveRecord}
              onCancel={this.approveRecord}
              selectedRecord={selectedRecord}
            />
          ) : null
        }
      </Spin>
    );
  }
}
