import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import {
  ZcyBreadcrumb,
  Spin,
  ZcyList,
  Input,
  Select,
} from 'doraemon';
import { connect } from 'dva';
import { getRelevantName } from 'commonUtils';
import { PROJECT_PHASE } from 'common/constants';

const { Option } = Select;

@connect(({ loading, loanProcess }) => ({
  tableQueryParams: loanProcess.tableQueryParams,
  synthesisList: loanProcess.synthesisList,
  workbenchList: loanProcess.workbenchList,
  listLoading: loading.effects['loanProcess/getSynthesisList'] || loading.effects['loanProcess/getWorkbenchList'],
}))
// 流程任务综合监控列表
export default class LoanProcessList extends Component {
  constructor(props) {
    super(props);
    const { match } = props;
    const { path } = match;
    this.isSynthesis = path.indexOf('synthesis') > -1;// 流程任务综合监控
  }
  componentDidMount() {
    const { tableQueryParams } = this.props;
    this.getLoanProcessList(tableQueryParams);
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'loanProcess/resetList',
    });
  }

  // 获得流程列表
  getLoanProcessList=(params) => {
    const { workbenchInitSearch, synthesisInitSearch, ...otherParams } = params;
    let resetParams = {};
    if (this.isSynthesis) { // 流程任务综合监控
      resetParams = {
        ...synthesisInitSearch,
        ...otherParams,
      };
      this.props.dispatch({
        type: 'loanProcess/getSynthesisList',
        payload: {
          ...resetParams,
        },
      });
    } else { // 流程任务工作台监控
      resetParams = {
        ...workbenchInitSearch,
        ...otherParams,
      };
      this.props.dispatch({
        type: 'loanProcess/getWorkbenchList',
        payload: {
          ...resetParams,
        },
      });
    }
  }

  onSearch=(params) => {
    // 不同列表默认搜索值需要区分
    const { pageNo, pageSize, ...initSearchParams } = params;
    let synthesisInitSearch = {};
    let workbenchInitSearch = {};
    if (this.isSynthesis) { // 综合监控列表
      synthesisInitSearch = initSearchParams;
    } else {
      workbenchInitSearch = initSearchParams;
    }
    this.props.dispatch({
      type: 'loanProcess/tableQueryParams',
      payload: {
        workbenchInitSearch,
        synthesisInitSearch,
        pageNo,
        pageSize,
      },
    });
    this.getLoanProcessList(params);
  }

  // 获得columns
  getColumns=() => {
    const columns = [
      {
        title: '项目名称',
        dataIndex: 'projectName',
        key: 'projectName',
        render: (text, record) => (
          record.projectName || '-'
        ),
      }, {
        title: '项目阶段',
        dataIndex: 'projectStatus',
        key: 'projectStatus',
        render: (text, record) => {
          const name = getRelevantName(record.projectStatus, PROJECT_PHASE);
          return name;
        },
      }, {
        title: '执行人',
        dataIndex: 'executor',
        key: 'executor',
        width: 200,
        render: (text, record) => (
          record.executor || '-'
        ),
      }, {
        title: this.isSynthesis ? '分配时间' : '开始时间',
        dataIndex: 'assignmentTime',
        key: 'assignmentTime',
        render: (text, record) => (
          record.assignmentTime || '-'
        ),
      }, {
        title: '到期时间',
        dataIndex: 'expireTime',
        key: 'expireTime',
        width: 80,
        render: (text, record) => (
          record.expireTime || '暂无'
        ),
      }, {
        title: '项目开始时间',
        dataIndex: 'startTime',
        key: 'startTime',
        render: (text, record) => (
          record.startTime || '-'
        ),
      }, {
        title: '项目结束时间',
        dataIndex: 'endTime',
        key: 'endTime',
        render: (text, record) => (
          record.endTime || '-'
        ),
      }, {
        title: '耗时',
        dataIndex: 'consumingTime',
        key: 'consumingTime',
        render: (text, record) => (
          record.consumingTime || '-'
        ),
      }, {
        title: '操作',
        dataIndex: 'handle',
        key: 'handle',
        width: 80,
        fixed: 'right',
        render: (text, record) => (
          <Fragment>
            {
              this.isSynthesis ? (
                <Link to={`/loan-process-synthesis/view/${record.applyId}`}>查看</Link>
              ) : (
                <Link to={`/loan-process-workbench/view/${record.applyId}`}>查看</Link>
              )
            }
          </Fragment>
        ),
      },
    ];
    return columns;
  }

  // 获得customItem
  getCustomItem=() => {
    const customItem = [
      {
        label: '项目名称',
        id: 'projectName',
        render: () => {
          return <Input placeholder="请输入" />;
        },
      }, {
        label: '项目阶段',
        id: 'projectStatus',
        decoratorOptions: {
          initialValue: null,
        },
        render: () => {
          return (
            <Select>
              {
                PROJECT_PHASE.map((phase) => {
                  return (
                    <Option key={phase.type} value={phase.type}>{phase.name}</Option>
                  );
                })
              }
            </Select>
          );
        },
      },
    ];
    return customItem;
  }

  // 获得配置信息
  getConfigInfo=() => {
    // 面包屑路由
    let routes = [];
    let tabList = [];
    if (this.isSynthesis) {
      routes = [
        {
          label: '流程任务综合监控',
        },
      ];
      tabList = [{
        label: '流程任务综合监控列表',
      }];
    } else {
      routes = [
        {
          label: '流程任务工作台监控',
        },
      ];
      tabList = [{
        label: '流程任务工作台监控列表',
      }];
    }
    return {
      routes,
      tabList,
    };
  }

  render() {
    const { listLoading = false, synthesisList, workbenchList, tableQueryParams } = this.props;
    const { pageSize, pageNo, type, workbenchInitSearch, synthesisInitSearch } = tableQueryParams;
    const loadProcessList = this.isSynthesis ? synthesisList : workbenchList;

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
      dataSource: loadProcessList.data || [],
      pagination: {
        pageSize,
        current: pageNo,
        showSizeChanger: true,
        total: loadProcessList.total,
      },
      rowKey: record => record.id,
      scroll: { x: 1300 },
    };
    return (
      <Spin spinning={listLoading}>
        <ZcyBreadcrumb
          routes={routes}
        />
        <ZcyList
          tabs={tabs}
          tabKey="type"
          table={table}
          customItem={customItem}
          onSearch={this.onSearch}
          initSearchParams={this.isSynthesis ? synthesisInitSearch : workbenchInitSearch}
        />
      </Spin>
    );
  }
}
