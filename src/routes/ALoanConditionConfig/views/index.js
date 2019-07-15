import React, { Component } from 'react';
import { connect } from 'dva';
import { Spin, ZcyList, Input, ZcyBreadcrumb } from 'doraemon';

import AddConditionModal from '../modal/AddConditionModal';

@connect(({ loading, loanConditionConfig }) => ({
  loading: loading.effects['loanConditionConfig/getList'],
  conditionList: loanConditionConfig.conditionList,
  tableQueryParams: loanConditionConfig.tableQueryParams,
}))
export default class LoanConditionConfig extends Component {
  state = {
    visible: false,
    modalType: '',
  };

  componentDidMount() {
    this.fetchList();
  }

  fetchList = (params = {}) => {
    const { tableQueryParams } = this.props;
    const payload = {
      ...tableQueryParams,
      ...params,
    };

    this.props.dispatch({
      type: 'loanConditionConfig/getList',
      payload,
    });
  };

  handleSearch = (params) => {
    this.props.dispatch({
      type: 'loanConditionConfig/tableQueryParams',
      payload: params,
    });

    this.fetchList(params);
  };

  addCondition = () => {
    this.setState({
      visible: true,
      modalType: 'ADD',
      modalData: {},
    });
  };

  editCondition = (record) => {
    this.setState({
      visible: true,
      modalType: 'EDIT',
      modalData: record,
    });
  };

  handleCancel = (reload) => {
    this.setState({
      visible: false,
    });

    reload === true && this.fetchList();
  };

  render() {
    const { visible, modalType, modalData = {} } = this.state;
    const { loading, tableQueryParams, conditionList } = this.props;

    const { queryType, pageSize, pageNo, ...initSearchParams } = tableQueryParams;

    const customItem = [
      {
        label: '准入条件名称',
        id: 'name',
        decoratorOptions: {
          initialValue: '',
        },
        render: () => {
          return (
            <Input placeholder="请输入" />
          );
        },
      }];

    const columns = [
      {
        title: '准入条件名称',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '是否系统定义',
        dataIndex: 'isSystem',
        key: 'isSystem',
        className: 'nowrap',
        render: (text) => {
          return text === true ? '是' : '否';
        },
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
      }, {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        className: 'nowrap',
        width: 40,
        render: (text, record) => {
          return (
            <a onClick={() => {
              this.editCondition(record);
            }}
            >修改
            </a>
          );
        },
      }];

    const tabs = {
      tabList: [{
        label: '基础贷款条件列表',
        key: '1',
      }],
    };

    const pagination = {
      total: conditionList.total,
      pageSize,
      current: pageNo,
      showSizeChanger: true,
    };


    const table = {
      columns,
      dataSource: conditionList.data,
      pagination,
      rowKey: record => record.id,
    };

    const globalBtn = [{
      label: '新增准入条件',
      type: 'primary',
      onClick: this.addCondition,
    }];

    return (
      <Spin
        spinning={loading}
      >
        <ZcyBreadcrumb
          routes={[{
            label: '基础条件配置',
          }]}
          globalBtn={globalBtn}
        />
        <ZcyList
          tabs={tabs}
          table={table}
          initSearchParams={initSearchParams}
          customItem={customItem}
          onSearch={this.handleSearch}
        />
        {visible && (
          <AddConditionModal
            modalType={modalType}
            modalData={modalData}
            visible={visible}
            onCancel={this.handleCancel}
          />
        )}
      </Spin>
    );
  }
}
