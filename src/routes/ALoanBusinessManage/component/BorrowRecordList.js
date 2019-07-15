import React, { Component, Fragment } from 'react';
import {
  Spin,
  ZcyList,
  Input,
  Select,
  DatePicker,
  Tooltip,
} from 'doraemon';
import { connect } from 'dva';
import { formatNumber, getRelevantName, fixDateRequestParams, validationNumber, transformPercent, getUrlSearchParams } from 'commonUtils';
import { BORROW_STATUS, REPAY_METHOD } from 'common/constants';

import RepayConditionModal from '../modal/RepayConditionModal';

import AmountRange from './AmountRange';

const { Option } = Select;
const { RangePicker } = DatePicker;

@connect(({ loading, loanBusinessManage }) => ({
  borrowRecordList: loanBusinessManage.borrowRecordList,
  channelList: loanBusinessManage.channelList,
  borrowRecordLoading: loading.effects['loanBusinessManage/getBorrowRecordList'],
}))
export default class BorrowRecordList extends Component {
  constructor(props) {
    super(props);
    const { search } = props;
    const UrlSearchParams = getUrlSearchParams(search);
    const { borrowType, channelCode } = UrlSearchParams;
    this.state = {
      pageNo: 1,
      pageSize: 10,
      type: borrowType || '0',
      showRepayCondition: false, // 还款情况弹窗
      recordInfo: {},
      initSearchParams: {
        channelCode,
      },
    };
  }

  componentDidMount() {
    const { pageNo, pageSize, type, initSearchParams } = this.state;
    this.getBorrowRecordList({ pageNo, pageSize, type, ...initSearchParams });
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'loanBusinessManage/borrowRecordList',
      payload: {},
    });
  }

  // 获得贷款申请列表
  getBorrowRecordList=(params = {}) => {
    const { channelCode } = this.state;
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
      type: 'loanBusinessManage/getBorrowRecordList',
      payload: {
        channelCode,
        ...resetParams,
      },
    });
  }

  onSearch=(params) => {
    const { pageSize, pageNo, type, ...initSearchParams } = params;
    this.setState({
      pageSize,
      pageNo,
      type,
      initSearchParams,
    }, () => {
      this.getBorrowRecordList(params);
    });
  }

  handleClick=(record) => {
    this.setState({
      showRepayCondition: true,
      recordInfo: record,
    });
  }
  repayConditionCancel=() => {
    this.setState({
      showRepayCondition: false,
    });
  }

  // 获得columns
  getColumns=() => {
    const columns = [
      {
        title: '借款编号',
        dataIndex: 'loanCode',
        key: 'loanCode',
        width: 180,
        render: (text, record) => (
          record.loanCode || '-'
        ),
      }, {
        title: '客户名称',
        dataIndex: 'customerName',
        key: 'customerName',
        width: 180,
        render: (text, record) => (
          record.customerName || '-'
        ),
      },
      {
        title: '项目信息',
        dataIndex: 'projectInfo',
        key: 'projectInfo',
        width: 250,
        render: (text, record) => {
          const { projectInfo } = record;
          const { contractCode, channelName, channelProductName } = projectInfo;
          return (
            <Fragment>
              <p><span className="list-sub-title">贷款合同编号: </span>{contractCode || '-'}</p>
              <p><span className="list-sub-title">渠道名称: </span>{channelName || '-'}</p>
              <p><span className="list-sub-title">渠道产品名称: </span>{channelProductName || '-'}</p>
            </Fragment>
          );
        },
      }, {
        title: '借款信息',
        dataIndex: 'loanInfo',
        key: 'loanInfo',
        className: 'nowrap',
        render: (text, record) => {
          const { loanInfo } = record;
          const { annualizedRate, loanAmount, restAmount, time, status, duration } = loanInfo;
          const loanStatus = getRelevantName(status, BORROW_STATUS);
          let statusClassName = '';
          switch (status) {
          case 1:// 还款中
            statusClassName = 'blue';
            break;
          case 2: // 逾期中;
            statusClassName = 'red';
            break;
          default:
            statusClassName = 'green';
            break;
          }
          return (
            <Fragment>
              <p><span className="list-sub-title">借款时间: </span>{time || '-'}</p>
              <p><span className="list-sub-title">借款状态: </span><span className={statusClassName}>{loanStatus}</span></p>
              <p><span className="list-sub-title">借款金额(元): </span><span className="money-color">{formatNumber(loanAmount)}</span></p>
              <p><span className="list-sub-title">借款余额(元): </span><span className="money-color">{formatNumber(restAmount)}</span></p>
              <p><span className="list-sub-title">借款年化利率(%): </span>{transformPercent(annualizedRate)}</p>
              <p><span className="list-sub-title">借款期限(月): </span>{validationNumber(duration)}</p>
            </Fragment>
          );
        },
      }, {
        title: '还款信息',
        dataIndex: 'repayInfo',
        key: 'repayInfo',
        render: (text, record) => {
          const { repaymentInfo } = record;
          const { restPeriod,
            totalPeriod,
            repaymentMode,
            repaymentAccount,
            startTime,
            endTime,
          } = repaymentInfo;
          const repayMethod = getRelevantName(repaymentMode, REPAY_METHOD);
          return (
            <Fragment>
              <p><span className="list-sub-title">剩余期数/总期数: </span>{validationNumber(restPeriod)}/{validationNumber(totalPeriod)}</p>
              <p><span className="list-sub-title">还款方式: </span>{repayMethod}</p>
              <p><span className="list-sub-title">还款账户: </span>{repaymentAccount || '-'}</p>
              <p><span className="list-sub-title">借款起止日: </span>{startTime} 至 {endTime}</p>
            </Fragment>
          );
        },
      }, {
        title: '操作',
        dataIndex: 'handle',
        key: 'handle',
        className: 'nowrap',
        render: (text, record) => {
          return <a onClick={() => this.handleClick(record)}>还款情况</a>;
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
        label: '借款编号',
        id: 'loanCode',
        render: () => {
          return <Input placeholder="请输入" />;
        },
      }, {
        label: '客户名称',
        id: 'customerName',
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
        label: '借款状态',
        id: 'loanStatus',
        decoratorOptions: {
          initialValue: null,
        },
        render: () => {
          return (
            <Select>
              {BORROW_STATUS.map((status) => {
                return (
                  <Option key={status.type} value={status.type}>{status.name}</Option>
                );
              })}
            </Select>
          );
        },
      },
      {
        label: '金额范围',
        id: 'amountRange',
        render: () => {
          return <AmountRange />;
        },
      }, {
        label: '渠道产品名称',
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
                  <Option key={list.channelCode} value={list.channelCode}>
                    <Tooltip title={list.channelName} >
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
        label: '还款中',
        key: '1',
      }, {
        label: '逾期中',
        key: '2',
      }, {
        label: '已结清',
        key: '3',
      },
    ],
  })

  render() {
    const { borrowRecordLoading, borrowRecordList } = this.props;
    const { pageNo,
      pageSize,
      type,
      showRepayCondition,
      recordInfo,
      initSearchParams,
    } = this.state;

    const customItem = this.getCustomItem();
    const columns = this.getColumns();

    const configInfo = this.getConfigInfo();
    const tabList = configInfo.tabList || [];

    const tabs = {
      defaultActiveKey: type,
      activeKey: type,
      tabList,
    };

    const table = {
      columns,
      dataSource: borrowRecordList.data || [],
      pagination: {
        pageSize,
        current: pageNo,
        showSizeChanger: true,
        total: borrowRecordList.total,
      },
      rowKey: record => record.id,
    };

    return (
      <Spin spinning={borrowRecordLoading}>
        <ZcyList
          tabs={tabs}
          tabKey="type"
          table={table}
          customItem={customItem}
          onSearch={this.onSearch}
          initSearchParams={initSearchParams}
        />
        {
          showRepayCondition ? (
            <RepayConditionModal
              visible={showRepayCondition}
              borrowRecordInfo={recordInfo}
              onCancel={this.repayConditionCancel}
            />
          ) : null
        }
      </Spin>
    );
  }
}
