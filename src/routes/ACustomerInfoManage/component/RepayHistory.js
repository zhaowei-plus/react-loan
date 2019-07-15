import React, { Component, Fragment } from 'react';
import {
  Spin,
  ZcySearch,
  Table,
  Select,
  Tooltip,
  Badge,
} from 'doraemon';
import { connect } from 'dva';
import { formatNumber, getRelevantName, validationNumber, transformPercent } from 'commonUtils';
import { REPAY_HISTORY_STATUS, REPAY_BADGE_STATUS_CONFIG } from 'common/constants';
import { BANK_REMARK } from '../component/typeConstants';

const { Option } = Select;

@connect(({ loading, customerInfo }) => ({
  repayHistory: customerInfo.repayHistory,
  orgList: customerInfo.orgList,
  repayHistoryLoading: loading.effects['customerInfo/getRepayHistory'],
}))
export default class RepayHistory extends Component {
  state = {
    pageNo: 1,
    pageSize: 10,
  };
  componentDidMount() {
    const { pageNo, pageSize } = this.state;
    this.getRepayHistory({ pageNo, pageSize });
  }

  // 获得还款历史列表
  getRepayHistory=(params) => {
    const { customerId } = this.props;
    this.props.dispatch({
      type: 'customerInfo/getRepayHistory',
      payload: {
        ...params,
        customerId,
      },
    });
  }

  onSearch=(params) => {
    const { pageSize } = this.state;
    this.setState({
      pageNo: 1,
    });
    this.searchParams = {
      ...params,
      pageSize,
      pageNo: 1,
    };
    this.getRepayHistory(this.searchParams);
  }

  // 获得columns
  getColumns=() => {
    const columns = [
      {
        title: '授信机构',
        dataIndex: 'loanInstitution',
        key: 'loanInstitution',
        width: 200,
        render: (text, record) => (
          record.loanInstitution || '-'
        ),
      }, {
        title: '产品名称',
        dataIndex: 'productName',
        key: 'productName',
        width: 200,
        render: (text, record) => (
          record.productName || '-'
        ),
      }, {
        title: '期数',
        dataIndex: 'period',
        key: 'period',
        className: 'nowrap',
        render: (text, record) => (
          validationNumber(record.period)
        ),
      }, {
        title: '贷款编号',
        dataIndex: 'loanCode',
        key: 'loanCode',
        width: 200,
        render: (text, record) => (
          record.loanCode || '-'
        ),
      }, {
        title: '贷款余额(元)',
        dataIndex: 'restAmount',
        key: 'restAmount',
        className: 'nowrap money',
        align: 'right',
        render: (text, record) => (
          formatNumber(record.restAmount)
        ),
      }, {
        title: '起止时间',
        dataIndex: 'startEndTime',
        key: 'startEndTime',
        className: 'nowrap',
        render: (text, record) => (
          <span>{record.startTime || '-'} 至 {record.endTime || '-'}</span>
        ),
      }, {
        title: '应还款信息',
        dataIndex: 'shouldRepaymentInfo',
        key: 'shouldRepaymentInfo',
        className: 'nowrap',
        render: (text, record) => {
          const { shouldRepaymentInfo } = record;

          const { date,
            interest,
            overdueInterest,
            overdueAmount,
            penalty,
            principal,
            totalAmount,
          } = shouldRepaymentInfo;
          return (
            <Fragment>
              <p className="money-color"><span className="list-sub-title">应还本金(元): </span>
                {formatNumber(principal)}
              </p>
              <p className="money-color"><span className="list-sub-title">应还利息(元): </span>{formatNumber(interest)}</p>
              <p className="money-color"><span className="list-sub-title">应还总额(元): </span>{formatNumber(totalAmount)}</p>
              <p><span className="list-sub-title">应还日期: </span>{date || '-'}</p>
              <p className="money-color"><span className="list-sub-title">违约金(元): </span>{formatNumber(penalty)}</p>
              <p className="money-color"><span className="list-sub-title">逾期金额(元): </span>{formatNumber(overdueAmount)}</p>
              <p><span className="list-sub-title">逾期罚息(%): </span>{transformPercent(overdueInterest)}</p>
            </Fragment>
          );
        },
      }, {
        title: '实还款信息',
        dataIndex: 'realRepaymentInfo',
        key: 'realRepaymentInfo',
        width: 200,
        render: (text, record) => {
          const { realRepaymentInfo } = record;
          const { principal,
            interest,
            totalAmount,
            date,
            account,
          } = realRepaymentInfo;
          return (
            <Fragment>
              <p className="money-color"><span className="list-sub-title">实还本金(元): </span>
                {formatNumber(principal)}
              </p>
              <p className="money-color"><span className="list-sub-title">实还利息(元): </span>{formatNumber(interest)}</p>
              <p className="money-color"><span className="list-sub-title">实还总额(元): </span>{formatNumber(totalAmount)}</p>
              <p><span className="list-sub-title">实还日期: </span>{date || '-'}</p>
              <p><span className="list-sub-title">还款账号: </span>{account}</p>
            </Fragment>
          );
        },
      }, {
        title: '还款状态',
        dataIndex: 'status',
        key: 'status',
        className: 'nowrap',
        render: (text, record) => {
          const name = getRelevantName(record.status, REPAY_HISTORY_STATUS);
          return (
            <Badge className="list-badge" status={REPAY_BADGE_STATUS_CONFIG[record.status]} text={name} />
          );
        },
      }, {
        title: '还款类型',
        dataIndex: 'deductionType',
        key: 'deductionType',
        className: 'nowrap',
        render: (text, record) => {
          const name = getRelevantName(record.deductionType, BANK_REMARK);
          return name;
        },
      },
    ];
    return columns;
  }

  // 获得customItem
  getCustomItem=() => {
    const { orgList } = this.props;

    const customItem = [
      {
        label: '审批机构',
        id: 'channelCode',
        render: () => {
          return (
            <Select
              defaultActiveFirstOption={false}
              placeholder="请选择"
              allowClear
            >
              {
                orgList.map(list => (
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
      }, {
        label: '还款状态',
        id: 'status',
        decoratorOptions: {
          initialValue: null,
        },
        render: () => {
          return (
            <Select>
              {REPAY_HISTORY_STATUS.map((status) => {
                return (
                  <Option key={status.type} value={status.type}>{status.name}</Option>
                );
              })}
            </Select>
          );
        },
      },
    ];
    return customItem;
  }

  // 点击分页时触发
  onTableChange=(pagination) => {
    const { pageSize, current } = pagination;
    this.setState({
      pageSize,
      pageNo: current,
    });
    this.getRepayHistory({
      ...this.searchParams,
      pageSize,
      pageNo: current,
    });
  }

  render() {
    const { repayHistoryLoading, repayHistory = {} } = this.props;
    const { pageSize, pageNo } = this.state;
    const customItem = this.getCustomItem();
    const columns = this.getColumns();

    const pagination = {
      pageSize,
      current: pageNo,
      showSizeChanger: true,
      total: repayHistory.total,
    };
    return (
      <Spin spinning={repayHistoryLoading}>
        <ZcySearch
          customItem={customItem}
          onSearch={this.onSearch}
        />
        <Table
          columns={columns}
          dataSource={repayHistory.data || []}
          pagination={pagination}
          onChange={this.onTableChange}
          scroll={{ x: 1500 }}
          rowKey={(record => record.id)}
        />
      </Spin>
    );
  }
}
