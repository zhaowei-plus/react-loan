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
import { BORROW_STATUS, REPAY_METHOD, BORROW_BADGE_STATUS_CONFIG } from 'common/constants';

const { Option } = Select;

@connect(({ loading, customerInfo }) => ({
  borrowRecord: customerInfo.borrowRecord,
  orgList: customerInfo.orgList,
  borrowRecordLoading: loading.effects['customerInfo/getBorrowRecord'],
}))
export default class BorrowRecord extends Component {
  state = {
    pageNo: 1,
    pageSize: 10,
  };
  componentDidMount() {
    const { pageNo, pageSize } = this.state;
    this.getBorrowRecord({ pageNo, pageSize });
  }

  // 获得借款记录列表
  getBorrowRecord=(params) => {
    const { customerId } = this.props;
    this.props.dispatch({
      type: 'customerInfo/getBorrowRecord',
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
    this.getBorrowRecord(this.searchParams);
  }

  // 获得columns
  getColumns=() => {
    const columns = [
      {
        title: '借款编号',
        dataIndex: 'code',
        key: 'code',
        width: 200,
        render: (text, record) => (
          record.code || '-'
        ),
      }, {
        title: '项目合同编号',
        dataIndex: 'contractCode',
        key: 'contractCode',
        width: 200,
        render: (text, record) => (
          record.contractCode || '-'
        ),
      }, {
        title: '资方渠道',
        dataIndex: 'capitalChannel',
        key: 'capitalChannel',
        width: 200,
        render: (text, record) => (
          record.capitalChannel || '-'
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
        title: '借款总额(元)',
        dataIndex: 'amount',
        key: 'amount',
        className: 'nowrap money',
        align: 'right',
        render: (text, record) => (
          formatNumber(record.amount)
        ),
      }, {
        title: '借款余额(元)',
        dataIndex: 'restAmount',
        key: 'restAmount',
        className: 'nowrap money',
        align: 'right',
        render: (text, record) => (
          formatNumber(record.restAmount)
        ),
      }, {
        title: '借款年利率(%)',
        dataIndex: 'annualizedRate',
        key: 'annualizedRate',
        className: 'nowrap',
        render: (text, record) => (
          transformPercent(record.annualizedRate)
        ),
      }, {
        title: '总期数',
        dataIndex: 'totalPeriod',
        key: 'totalPeriod',
        className: 'nowrap',
        render: (text, record) => (
          validationNumber(record.totalPeriod)
        ),
      }, {
        title: '剩余期数',
        dataIndex: 'restPeriod',
        key: 'restPeriod',
        className: 'nowrap',
        render: (text, record) => (
          validationNumber(record.restPeriod)
        ),
      }, {
        title: '还款方式',
        dataIndex: 'repaymentMode',
        key: 'repaymentMode',
        className: 'nowrap',
        render: (text, record) => {
          const name = getRelevantName(record.repaymentMode, REPAY_METHOD);
          return name;
        },
      }, {
        title: '还款日',
        dataIndex: 'repaymentDate',
        key: 'repaymentDate',
        className: 'nowrap',
        render: (text, record) => (
          record.repaymentDate || '-'
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
        title: '贷款期限(月)',
        dataIndex: 'duration',
        key: 'duration',
        className: 'nowrap',
        render: (text, record) => (
          validationNumber(record.duration)
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
        title: '借款状态',
        dataIndex: 'status',
        key: 'status',
        className: 'nowrap',
        width: 100,
        fixed: 'right',
        render: (text, record) => {
          const name = getRelevantName(record.status, BORROW_STATUS);
          return (
            <Badge className="list-badge" status={BORROW_BADGE_STATUS_CONFIG[record.status]} text={name} />
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
    this.getBorrowRecord({
      ...this.searchParams,
      pageSize,
      pageNo: current,
    });
  }

  render() {
    const { borrowRecordLoading, borrowRecord = {} } = this.props;
    const { pageSize, pageNo } = this.state;
    const customItem = this.getCustomItem();
    const columns = this.getColumns();

    const pagination = {
      pageSize,
      current: pageNo,
      showSizeChanger: true,
      total: borrowRecord.total,
    };
    return (
      <Spin spinning={borrowRecordLoading}>
        <ZcySearch
          customItem={customItem}
          onSearch={this.onSearch}
        />
        <Table
          columns={columns}
          dataSource={borrowRecord.data || []}
          pagination={pagination}
          onChange={this.onTableChange}
          scroll={{ x: 2000 }}
          rowKey={(record => record.id)}
        />
      </Spin>
    );
  }
}
