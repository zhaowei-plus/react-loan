import React, { Component } from 'react';
import { ZcyList, ZcyBreadcrumb, Spin, Input, Select, Tooltip, message } from 'doraemon';
import { connect } from 'dva';
import { mergeTableCellData } from 'commonUtils';
import { getColumns, BREADCRUMB, TABS, CONTRACT_STATUS } from '../config';

const { Option } = Select;

@connect(({ cWinbidContractRecord, loading }) => ({
  contractRecord: cWinbidContractRecord.contractRecord,
  loading: loading.effects['cWinbidContractRecord/fetchContractRecord'],
}))
export default class CWinbidContractRecord extends Component {
  componentDidMount() {
    this.fetchList();
  }

  fetchList = (params = {}) => {
    this.props.dispatch({
      type: 'cWinbidContractRecord/fetchContractRecord',
      payload: {
        ...params,
      },
    });
  }

  onSearch = (params) => {
    this.fetchList(params);
  }

  getCustomItem = () => {
    const customItem = [{
      label: '项目名称',
      id: 'bidProjectName',
      render: () => (
        <Input placeholder="请输入" />
      ),
    }, {
      label: '合同状态',
      id: 'status',
      decoratorOptions: {
        initialValue: null,
      },
      render: () => {
        return (
          <Select placeholder="请搜索或选择">
            <Option value={null}>全部</Option>
            {
              CONTRACT_STATUS.map(d => (
                <Option key={d.value} value={d.value}>
                  <Tooltip title={d.text} >
                    {d.text}
                  </Tooltip>
                </Option>
              ))
            }
          </Select>
        );
      },
    }];

    return customItem;
  }

  linkToDetail = (url) => {
    if (!url) {
      message.destroy();
      message.warn('暂无合同详情链接');
      return false;
    }
    window.open(url);
  }

  getTable = () => {
    const { contractRecord = {} } = this.props;
    const { data = [], total } = contractRecord;
    const columns = getColumns(this.linkToDetail);

    const table = {
      bordered: true,
      columns,
      dataSource: mergeTableCellData(data, 'projectName'),
      pagination: {
        total,
        showSizeChanger: true,
      },
      rowKey: record => record.id,
    };
    return table;
  }

  render() {
    const { loading = false } = this.props;

    const table = this.getTable();
    const customItem = this.getCustomItem();

    return (
      <Spin spinning={loading}>
        <ZcyBreadcrumb
          routes={BREADCRUMB}
        />
        <ZcyList
          tabKey="tab"
          customItem={customItem}
          onSearch={this.onSearch}
          tabs={TABS}
          table={table}
        />
      </Spin>
    );
  }
}
