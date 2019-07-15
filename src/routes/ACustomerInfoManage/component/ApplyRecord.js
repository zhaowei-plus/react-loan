import React, { Component } from 'react';
import {
  Spin,
  ZcySearch,
  Table,
  DatePicker,
  Select,
  Tooltip,
  Badge,
} from 'doraemon';
import { connect } from 'dva';
import { formatNumber, getRelevantName, fixDateRequestParams, transformPercent } from 'commonUtils';
import {
  PRODUCT_CATEGORY,
  PRODUCT_TYPE,
  APPLY_STATUS,
  APPLY_BADGE_STATUS_CONFIG,
} from './typeConstants';

const { RangePicker } = DatePicker;
const { Option } = Select;

@connect(({ loading, customerInfo }) => ({
  applyRecord: customerInfo.applyRecord,
  orgList: customerInfo.orgList,
  applyRecordLoading: loading.effects['customerInfo/getApplyRecord'],
}))
export default class ApplyRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 1,
      pageSize: 10,
      customerId: props.customerId,
    };
  }

  componentDidMount() {
    const { pageNo, pageSize } = this.state;
    this.getApplyRecord({ pageNo, pageSize });
  }

  // 获得申请记录列表
  getApplyRecord=(params) => {
    const { applyTime, ...resetParams } = params;
    if (applyTime) {
      resetParams.startTime = fixDateRequestParams(applyTime[0]);
      resetParams.endTime = fixDateRequestParams(applyTime[1], true);
    }
    const { customerId } = this.state;
    this.props.dispatch({
      type: 'customerInfo/getApplyRecord',
      payload: {
        ...resetParams,
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
    this.getApplyRecord(this.searchParams);
  }

  // 获得columns
  getColumns=() => {
    const columns = [
      {
        title: '贷款申请编号',
        dataIndex: 'applyCode',
        key: 'applyCode',
        width: 200,
        render: (text, record) => (
          record.applyCode || '-'
        ),
      }, {
        title: '申请人',
        dataIndex: 'applicant',
        key: 'applicant',
        width: 100,
        render: (text, record) => (
          record.applicant || '-'
        ),
      }, {
        title: '申请发起人',
        dataIndex: 'onlineInitiator',
        key: 'onlineInitiator',
        width: 100,
        render: (text, record) => (
          record.onlineInitiator || '-'
        ),
      }, {
        title: '申请时间',
        dataIndex: 'applyTime',
        key: 'applyTime',
        className: 'nowrap',
        render: (text, record) => (
          record.applyTime || '-'
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
        title: '产品类别',
        dataIndex: 'productCategory',
        key: 'productCategory',
        className: 'nowrap',
        render: (text, record) => {
          const name = getRelevantName(record.productCategory, PRODUCT_CATEGORY);
          return name;
        },
      }, {
        title: '产品类型',
        dataIndex: 'productType',
        key: 'productType',
        className: 'nowrap',
        render: (text, record) => {
          const name = getRelevantName(record.productType, PRODUCT_TYPE);
          return name;
        },
      }, {
        title: '申请额度(元)',
        dataIndex: 'applyAmount',
        key: 'applyAmount',
        className: 'money nowrap',
        align: 'right',
        render: (text, record) => (
          formatNumber(record.applyAmount)
        ),
      }, {
        title: '审批额度(元)',
        dataIndex: 'approveAmount',
        key: 'approveAmount',
        className: 'money nowrap',
        align: 'right',
        render: (text, record) => (
          formatNumber(record.approveAmount)
        ),
      }, {
        title: '审批年化利率(%)',
        dataIndex: 'annualizedRate',
        key: 'annualizedRate',
        className: 'nowrap',
        render: (text, record) => (
          transformPercent(record.annualizedRate)
        ),
      }, {
        title: '审批完成时间',
        dataIndex: 'approveTime',
        key: 'approveTime',
        className: 'nowrap',
        render: (text, record) => (
          record.approveTime || '-'
        ),
      }, {
        title: '申请状态',
        dataIndex: 'customerApplyStatus',
        key: 'customerApplyStatus',
        width: 120,
        fixed: 'right',
        render: (text, record) => {
          const name = getRelevantName(record.customerApplyStatus, APPLY_STATUS);
          return (
            <Badge className="list-badge" status={APPLY_BADGE_STATUS_CONFIG[record.customerApplyStatus]} text={name} />
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
        label: '申请状态',
        id: 'customerApplyStatus',
        decoratorOptions: {
          initialValue: null,
        },
        render: () => {
          return (
            <Select>
              {APPLY_STATUS.map((status) => {
                return (
                  <Option key={status.type} value={status.type}>{status.name}</Option>
                );
              })}
            </Select>
          );
        },
      }, {
        label: '申请时间',
        id: 'applyTime',
        render: () => {
          return <RangePicker />;
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
    this.getApplyRecord({
      ...this.searchParams,
      pageSize,
      pageNo: current,
    });
  }

  render() {
    const { applyRecordLoading, applyRecord = {} } = this.props;
    const { pageSize, pageNo } = this.state;
    const customItem = this.getCustomItem();
    const columns = this.getColumns();
    const pagination = {
      pageSize,
      current: pageNo,
      showSizeChanger: true,
      total: applyRecord.total,
    };
    return (
      <Spin spinning={applyRecordLoading}>
        <ZcySearch
          customItem={customItem}
          onSearch={this.onSearch}
          className="apply-record"
        />
        <Table
          columns={columns}
          dataSource={applyRecord.data || []}
          pagination={pagination}
          onChange={this.onTableChange}
          scroll={{ x: 1700 }}
          rowKey={(record => record.id)}
        />
      </Spin>
    );
  }
}
