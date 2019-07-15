import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
  ZcyBreadcrumb,
  Spin,
  ZcyList,
  Input,
  Badge,
} from 'doraemon';
import { connect } from 'dva';
import { formatDateToLocal, getRelevantName } from 'commonUtils';
import AgreementInfoModal from 'common/modal/AgreementInfoModal';
import { CONTRACT_STATUS, SCENES } from '../component/typeConstants';

@connect(({ loading, contractManage }) => ({
  tableQueryParams: contractManage.tableQueryParams,
  contractManageList: contractManage.contractManageList,
  contractManageLoading: loading.effects['contractManage/getContractManageList'],
}))
export default class ContractManage extends Component {
  state={
    showAgreementInfoModal: false, // 展示协议内容
  }
  componentDidMount() {
    const { tableQueryParams } = this.props;
    this.getContractManageList(tableQueryParams);
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'contractManage/contractManageList',
      payload: {},
    });
  }

  // 获得合同管理列表
  getContractManageList = (params) => {
    this.props.dispatch({
      type: 'contractManage/getContractManageList',
      payload: {
        ...params,
      },
    });
  }

  onSearch = (params) => {
    this.props.dispatch({
      type: 'contractManage/tableQueryParams',
      payload: params,
    });
    this.getContractManageList(params);
  }

  // 点击合同名称
  handleContractClick = () => {
    const { showAgreementInfoModal } = this.state;
    this.setState({
      showAgreementInfoModal: !showAgreementInfoModal,
    });
  }

  // 获得columns
  getColumns = () => {
    const columns = [
      {
        title: '客户名称',
        dataIndex: 'name',
        key: 'name',
        width: 200,
        render: (text, record) => (
          record.name || '-'
        ),
      }, {
        title: '证件号码',
        dataIndex: 'code',
        key: 'code',
        className: 'nowrap',
        width: 120,
        render: (text, record) => (
          record.code || '-'
        ),
      }, {
        title: '项目名称',
        dataIndex: 'projectName',
        key: 'projectName',
        width: 200,
        render: (text, record) => (
          record.projectName || '-'
        ),
      }, {
        title: '贷款申请编号',
        dataIndex: 'applyCode',
        key: 'applyCode',
        width: 200,
        render: (text, record) => (
          record.applyCode || '-'
        ),
      }, {
        title: '业务场景类型',
        dataIndex: 'scenes',
        key: 'scenes',
        width: 120,
        render: (text, record) => {
          const name = getRelevantName(record.scenes, SCENES);
          return name;
        },
      }, {
        title: '合同状态',
        dataIndex: 'status',
        key: 'status',
        className: 'nowrap',
        render: (text, record) => {
          // 合同状态本期只有'有效'一种状态
          const name = getRelevantName(record.status, CONTRACT_STATUS);
          return (
            <Badge status="success" text={name} />
          );
        },
      }, {
        title: '合同生效时间',
        dataIndex: 'effectiveDate',
        key: 'effectiveDate',
        className: 'nowrap',
        width: 100,
        render: (text, record) => (
          formatDateToLocal(record.effectiveDate, true)
        ),
      }, {
        title: '合同失效时间',
        dataIndex: 'invalidDate',
        key: 'invalidDate',
        className: 'nowrap',
        width: 100,
        render: (text, record) => (
          formatDateToLocal(record.invalidDate, true)
        ),
      }, {
        title: '合同',
        dataIndex: 'contract',
        key: 'contract',
        width: 200,
        render: () => {
          return <a onClick={this.handleContractClick}>政采云融资信息服务协议</a>;
        },
      }, {
        title: '操作',
        dataIndex: 'handle',
        key: 'handle',
        fixed: 'right',
        width: 80,
        render: (text, record) => (
          <Link to={`/contract/view/${record.loanId}`}>查看项目</Link>
        ),
      },
    ];
    return columns;
  }

  // 获得customItem
  getCustomItem = () => {
    const customItem = [
      {
        label: '客户名称',
        id: 'name',
        render: () => {
          return <Input placeholder="请输入" />;
        },
      }, {
        label: '证件号码',
        id: 'code',
        render: () => {
          return <Input placeholder="请输入" />;
        },
      },
    ];
    return customItem;
  }

  getConfigInfo = () => ({
    routes: [{
      label: '合同管理',
    }],
    tabList: [{
      label: '合同管理列表',
    }],
  })

  render() {
    const { contractManageLoading, contractManageList = {}, tableQueryParams } = this.props;
    const { pageSize, pageNo, type, ...initSearchParams } = tableQueryParams;
    const { showAgreementInfoModal } = this.state;

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
      dataSource: contractManageList.data || [],
      pagination: {
        pageSize,
        current: pageNo,
        showSizeChanger: true,
        total: contractManageList.total,
      },
      rowKey: record => record.id,
      scroll: { x: 1500 },
    };
    return (
      <Spin spinning={contractManageLoading}>
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
          showAgreementInfoModal ? (
            <AgreementInfoModal
              visible={showAgreementInfoModal}
              onCancel={this.handleContractClick}
            />
          ) : null
        }
      </Spin>
    );
  }
}
