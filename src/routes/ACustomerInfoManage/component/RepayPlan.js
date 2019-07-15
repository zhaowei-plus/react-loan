import React, { Component } from 'react';
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
import { REPAY_PLAN_STATUS, REPAY_BADGE_STATUS_CONFIG } from 'common/constants';

const { Option } = Select;

@connect(({ loading, customerInfo }) => ({
  repayPlan: customerInfo.repayPlan,
  orgList: customerInfo.orgList,
  repayPlanLoading: loading.effects['customerInfo/getRepayPlan'],
}))
export default class RepayPlan extends Component {
  state = {
    pageNo: 1,
    pageSize: 10,
  };
  componentDidMount() {
    const { pageNo, pageSize } = this.state;
    this.getRepayPlan({ pageNo, pageSize });
  }

  // 获得申请记录列表
  getRepayPlan=(params) => {
    const { customerId } = this.props;
    this.props.dispatch({
      type: 'customerInfo/getRepayPlan',
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
    this.getRepayPlan(this.searchParams);
  }

  // 获得columns
  getColumns=() => {
    const columns = [
      {
        title: '资方渠道',
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
        dataIndex: 'currentPeriod',
        key: 'currentPeriod',
        className: 'nowrap',
        render: (text, record) => (
          validationNumber(record.currentPeriod)
        ),
      }, {
        title: '借款编号',
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
        title: '应还日期',
        dataIndex: 'date',
        key: 'date',
        className: 'nowrap',
        render: (text, record) => (
          record.shouldRepaymentInfo.date || '-'
        ),
      }, {
        title: '应还本金(元)',
        dataIndex: 'principal',
        key: 'principal',
        className: 'nowrap money',
        align: 'right',
        render: (text, record) => (
          formatNumber(record.shouldRepaymentInfo.principal)
        ),
      }, {
        title: '应还利息(元)',
        dataIndex: 'interest',
        key: 'interest',
        className: 'nowrap money',
        align: 'right',
        render: (text, record) => (
          formatNumber(record.shouldRepaymentInfo.interest)
        ),
      }, {
        title: '应还总额(元)',
        dataIndex: 'totalAmount',
        key: 'totalAmount',
        className: 'nowrap money',
        align: 'right',
        render: (text, record) => (
          formatNumber(record.shouldRepaymentInfo.totalAmount)
        ),
      }, {
        title: '违约金(元)',
        dataIndex: 'penalty',
        key: 'penalty',
        className: 'nowrap money',
        align: 'right',
        render: (text, record) => (
          formatNumber(record.shouldRepaymentInfo.penalty)
        ),
      }, {
        title: '逾期金额(元)',
        dataIndex: 'overdueAmount',
        key: 'overdueAmount',
        className: 'nowrap money',
        align: 'right',
        render: (text, record) => (
          formatNumber(record.shouldRepaymentInfo.overdueAmount)
        ),
      }, {
        title: '逾期罚息(%)',
        dataIndex: 'overdueInterest',
        key: 'overdueInterest',
        className: 'nowrap',
        render: (text, record) => (
          transformPercent(record.shouldRepaymentInfo.overdueInterest)
        ),
      }, {
        title: '还款账号',
        dataIndex: 'repaymentAccount',
        key: 'repaymentAccount',
        width: 180,
        render: (text, record) => (
          record.repaymentAccount || '-'
        ),
      }, {
        title: '还款状态',
        dataIndex: 'repaymentStatus',
        key: 'repaymentStatus',
        width: 100,
        fixed: 'right',
        render: (text, record) => {
          const name = getRelevantName(record.repaymentStatus, REPAY_PLAN_STATUS);
          return (
            <Badge className="list-badge" status={REPAY_BADGE_STATUS_CONFIG[record.repaymentStatus]} text={name} />
          );
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
              {REPAY_PLAN_STATUS.map((status) => {
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
    this.getRepayPlan({
      ...this.searchParams,
      pageSize,
      pageNo: current,
    });
  }


  render() {
    const { repayPlanLoading, repayPlan = {} } = this.props;
    const { pageSize, pageNo } = this.state;
    const customItem = this.getCustomItem();
    const columns = this.getColumns();

    const pagination = {
      pageSize,
      current: pageNo,
      showSizeChanger: true,
      total: repayPlan.total,
    };
    return (
      <Spin spinning={repayPlanLoading}>
        <ZcySearch
          customItem={customItem}
          onSearch={this.onSearch}
        />
        <Table
          columns={columns}
          dataSource={repayPlan.data || []}
          onChange={this.onTableChange}
          pagination={pagination}
          scroll={{ x: 1900 }}
          rowKey={(record => record.id)}
        />
      </Spin>
    );
  }
}
