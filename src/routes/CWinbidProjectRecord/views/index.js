import React, { Component } from 'react';
import { ZcyList, ZcyBreadcrumb, Select, Spin, Input } from 'doraemon';
import { connect } from 'dva';
import { financeStatus, getColumns, breadcrumb, tabs } from '../config';
import RecommendProduct from '../../CLoanOverview/component/RecommendProduct';

const { Option } = Select;

@connect(({ cWinbidProjectRecord, loading }) => ({
  projectRecord: cWinbidProjectRecord.projectRecord,
  tableSearchParams: cWinbidProjectRecord.tableSearchParams,
  loading: loading.effects['cWinbidProjectRecord/fetchProjectRecord'],
}))
export default class CWinbidProjectRecord extends Component {
  state = {
    recommendProductVisible: false,
    projectCode: '',
    source: '',
  };

  componentDidMount() {
    let { tab } = this.props.tableSearchParams;
    if (tab === '0') {
      tab = null;
    }
    this.fetchList({ tab });
  }

  fetchList = (params = {}) => {
    const { tableSearchParams } = this.props;
    const { projectName, financeStatus: status, ...rest } = tableSearchParams;

    this.props.dispatch({
      type: 'cWinbidProjectRecord/fetchProjectRecord',
      payload: {
        ...rest,
        ...params,
      },
    });
  }

  onSearch = (params) => {
    this.props.dispatch({
      type: 'cWinbidProjectRecord/tableSearchParams',
      payload: {
        ...params,
      },
    });

    // "全部" tab时，tab设置为空
    if (params.tab === '0') {
      params.tab = null;
    }

    this.fetchList(params);
  }

  getCustomItem = () => {
    const customItem = [{
      label: '中标项目名称',
      id: 'projectName',
      render: () => (
        <Input placeholder="请输入" />
      ),
    }, {
      label: '申请状态',
      id: 'financeStatus',
      decoratorOptions: {
        initialValue: null,
      },
      render: () => (
        <Select placeholder="全部">
          {
            financeStatus.map(d =>
              <Option key={d.type} value={d.type}>{d.name}</Option>
            )
          }
        </Select>
      ),
    }];

    return customItem;
  }

  toggleRecommend = (source, projectCode) => {
    this.setState({
      recommendProductVisible: !this.state.recommendProductVisible,
      source,
      projectCode,
    });
  }

  getTable = () => {
    const { projectRecord = {}, tableSearchParams } = this.props;
    const { data = [], total } = projectRecord;
    const columns = getColumns(this.toggleRecommend);

    const table = {
      columns,
      dataSource: data,
      pagination: {
        total,
        showSizeChanger: true,
        current: tableSearchParams.pageNo,
        pageSize: tableSearchParams.pageSize,
      },
      rowKey: record => record.id,
    };
    return table;
  }


  render() {
    const { tableSearchParams, loading } = this.props;
    const {
      source,
      recommendProductVisible,
      projectCode,
    } = this.state;

    const table = this.getTable();
    const customItem = this.getCustomItem();
    tabs.activeKey = tableSearchParams.tab;

    return (
      <Spin spinning={loading}>
        <ZcyBreadcrumb
          routes={breadcrumb}
        />
        <ZcyList
          tabKey="tab"
          customItem={customItem}
          onSearch={this.onSearch}
          tabs={tabs}
          table={table}
          initSearchParams={tableSearchParams}
        />
        {
          recommendProductVisible && (
            <RecommendProduct
              history={this.props.history}
              onCancel={this.toggleRecommend}
              source={source}
              projectCode={projectCode}
            />
          )
        }
      </Spin>
    );
  }
}
