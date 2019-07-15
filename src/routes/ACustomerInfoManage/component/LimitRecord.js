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
import { LIMIT_STATUS, QUOTA_TYPE, LIMIT_BADGE_STATUS_CONFIG } from 'common/constants';

const { Option } = Select;

@connect(({ loading, customerInfo }) => ({
  limitRecord: customerInfo.limitRecord,
  orgList: customerInfo.orgList,
  creditRecordListLoading: loading.effects['customerInfo/getLimitRecord'],
}))
export default class LimitRecord extends Component {
  state = {
    pageNo: 1,
    pageSize: 10,
  };
  componentDidMount() {
    const { pageNo, pageSize } = this.state;
    this.getLimitRecord({ pageNo, pageSize });
  }

  // 获得额度记录列表
  getLimitRecord=(params) => {
    const { customerId } = this.props;
    this.props.dispatch({
      type: 'customerInfo/getLimitRecord',
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
    this.getLimitRecord(this.searchParams);
  }

  // 获得columns
  getColumns=() => {
    const columns = [
      {
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
        title: '额度类型',
        dataIndex: 'quotaType',
        key: 'quotaType',
        className: 'nowrap',
        render: (text, record) => {
          const name = getRelevantName(record.quotaType, QUOTA_TYPE);
          return name;
        },
      }, {
        title: '授信额度(元)',
        dataIndex: 'quota',
        key: 'quota',
        className: 'nowrap money',
        align: 'right',
        render: (text, record) => (
          formatNumber(record.quota)
        ),
      }, {
        title: '可用额度(元)',
        dataIndex: 'availableQuota',
        key: 'availableQuota',
        className: 'money nowrap',
        align: 'right',
        render: (text, record) => (
          formatNumber(record.availableQuota)
        ),
      }, {
        title: '申请年化利率(%)',
        dataIndex: 'annualizedRate',
        key: 'annualizedRate',
        className: 'nowrap',
        render: (text, record) => (
          transformPercent(record.annualizedRate)
        ),
      }, {
        title: '额度期限(月)',
        dataIndex: 'duration',
        key: 'duration',
        className: 'nowrap',
        render: (text, record) => (
          validationNumber(record.duration)
        ),
      }, {
        title: '额度起止时间',
        dataIndex: 'startEndTime',
        key: 'startEndTime',
        className: 'nowrap',
        render: (text, record) => (
          <span>{record.startTime || '-'} 至 {record.endTime || '-'}</span>
        ),
      }, {
        title: '利率类型',
        dataIndex: 'rateTypeDesc',
        key: 'rateTypeDesc',
        className: 'nowrap',
        render: (text, record) => (
          record.rateTypeDesc || '-'
        ),
      }, {
        title: '浮动比例(%)',
        dataIndex: 'floatRate',
        key: 'floatRate',
        className: 'nowrap',
        render: (text, record) => (
          transformPercent(record.floatRate)
        ),
      }, {
        title: '额度状态',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        fixed: 'right',
        render: (text, record) => {
          const { status } = record;
          const name = getRelevantName(status, LIMIT_STATUS);
          return (
            <Badge className="list-badge" status={LIMIT_BADGE_STATUS_CONFIG[record.status]} text={name} />
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
        label: '额度状态',
        id: 'quotaStatus',
        decoratorOptions: {
          initialValue: null,
        },
        render: () => {
          return (
            <Select>
              {LIMIT_STATUS.map((status) => {
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
    this.getLimitRecord({
      ...this.searchParams,
      pageSize,
      pageNo: current,
    });
  }

  render() {
    const { creditRecordListLoading, limitRecord = {} } = this.props;
    const { pageSize, pageNo } = this.state;
    const customItem = this.getCustomItem();
    const columns = this.getColumns();
    const pagination = {
      pageSize,
      current: pageNo,
      showSizeChanger: true,
      total: limitRecord.total,
    };
    return (
      <Spin spinning={creditRecordListLoading}>
        <ZcySearch
          customItem={customItem}
          onSearch={this.onSearch}
        />
        <Table
          columns={columns}
          dataSource={limitRecord.data || []}
          pagination={pagination}
          onChange={this.onTableChange}
          scroll={{ x: 1600 }}
          rowKey={(record => record.id)}
        />
      </Spin>
    );
  }
}
