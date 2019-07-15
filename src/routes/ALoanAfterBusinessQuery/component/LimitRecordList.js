import React, { Component } from 'react';
import {
  Spin,
  ZcyList,
  Input,
  Select,
  Tooltip,
  Badge,
} from 'doraemon';
import { connect } from 'dva';
import { formatNumber, getRelevantName, transformPercent } from 'commonUtils';
import { LIMIT_STATUS, QUOTA_TYPE, LIMIT_BADGE_STATUS_CONFIG } from 'common/constants';

const { Option } = Select;

@connect(({ loading, loanAfterBusinessQuery }) => ({
  limitRecordList: loanAfterBusinessQuery.limitRecordList,
  channelNameList: loanAfterBusinessQuery.channelNameList,
  limitRecordLoading: loading.effects['loanAfterBusinessQuery/getLimitRecordList'],
}))
export default class LimitRecordList extends Component {
  state = {
    pageNo: 1,
    pageSize: 10,
    type: '2',
  };
  componentDidMount() {
    const { pageNo, pageSize, type } = this.state;
    this.getLimitRecordList({ pageNo, pageSize, type });
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'loanAfterBusinessQuery/limitRecordList',
      payload: {},
    });
  }

  // 获得额度记录列表
  getLimitRecordList=(params) => {
    const { type, ...resetParams } = params;

    resetParams.type = type === '0' ? null : type;

    this.props.dispatch({
      type: 'loanAfterBusinessQuery/getLimitRecordList',
      payload: {
        ...resetParams,
      },
    });
  }

  onSearch=(params) => {
    const { pageSize, pageNo, type } = params;
    this.setState({
      pageSize,
      pageNo,
      type,
    });
    this.getLimitRecordList(params);
  }

  // 获得columns
  getColumns=() => {
    const columns = [
      {
        title: '贷款合同编号',
        dataIndex: 'contractCode',
        key: 'contractCode',
        width: 200,
        render: (text, record) => (
          record.contractCode || '-'
        ),
      }, {
        title: '客户名称',
        dataIndex: 'customerName',
        key: 'customerName',
        width: 200,
        render: (text, record) => (
          record.customerName || '-'
        ),
      }, {
        title: '授信机构',
        dataIndex: 'creditInstitution',
        key: 'creditInstitution',
        width: 200,
        render: (text, record) => (
          record.creditInstitution || '-'
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
        title: '年化利率(%)',
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
          record.duration || '-'
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
        className: 'nowrap',
        width: 80,
        fixed: 'right',
        render: (text, record) => {
          const { status } = record;
          const name = getRelevantName(status, LIMIT_STATUS);
          return (
            <Badge className="list-badge" status={LIMIT_BADGE_STATUS_CONFIG[status]} text={name} />
          );
        },
      },
    ];
    return columns;
  }

  // 获得customItem
  getCustomItem=() => {
    const { channelNameList } = this.props;
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
                channelNameList.map(list => (
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
      }, {
        label: '客户名称',
        id: 'customerName',
        render: () => {
          return <Input placeholder="请输入" />;
        },
      },
    ];
    return customItem;
  }

  getConfigInfo=() => ({
    tabList: [
      {
        label: '生效中',
        key: '2',
      }, {
        label: '全部',
        key: '0',
        isAll: true,
      },
    ],
  })


  render() {
    const { limitRecordLoading, limitRecordList } = this.props;
    const { pageNo, pageSize, type } = this.state;

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
      dataSource: limitRecordList.data || [],
      pagination: {
        pageSize,
        current: pageNo,
        showSizeChanger: true,
        total: limitRecordList.total,
      },
      rowKey: record => record.id,
      scroll: { x: 1700 },
    };

    return (
      <Spin spinning={limitRecordLoading}>
        <ZcyList
          tabs={tabs}
          tabKey="type"
          table={table}
          customItem={customItem}
          onSearch={this.onSearch}
        />
      </Spin>
    );
  }
}
