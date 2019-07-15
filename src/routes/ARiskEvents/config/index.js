import React from 'react';
import { Input, Badge, DatePicker, Tooltip } from 'doraemon';
import { Link } from 'react-router-dom';
import {
  getRelevantName,
  formatString,
} from 'commonUtils';
import TableOperateList from '../component/TableOperateList';

import { STATUS, TAB_LIST, BADGE_STATUS } from '../constants';
import { getOperationConfig } from './operation';

const { RangePicker } = DatePicker;

// 风险祥诉超出长度部分省略, 长度超出的hover提示
const RiskDetail = ({ content }) => {
  let showContent;
  let msgContent;

  if (content.length + 3 > 64) {
    showContent = content.slice(0, 64 - 3).concat('...');
    msgContent = (
      <Tooltip title={content}>
        <p className="message-content">{`${showContent}`}</p>
      </Tooltip>
    );
  } else {
    showContent = content;
    msgContent = (
      <p className="message-content">{`${showContent}`}</p>
    );
  }
  return (
    <div className="minHeightDiv">
      {msgContent}
    </div>
  );
};

// 获得表格配置项
export const getTableConfig = (component) => {
  const { handleClick, props } = component;
  const { list = {}, tableQueryParams } = component.props;
  const { pageSize, pageNo } = tableQueryParams;
  const { platformApprove } = props.privileges;

  const getColumns = () => {
    // 获得操作项
    const getOperationBtn = (record) => {
      const { status, id } = record;

      const getOperationBtnType = (currentStatus) => {
        /**
         * 默认查看按钮
         * @type {string[]}
         */
        let btnTypes = ['VIEW'];
        /**
         * 展示审核按钮判断条件
         * 1. 是否有审核权限
         * 2. 状态是否为2 (即, 待平台处理)
         */
        if (currentStatus === 2 && platformApprove) {
          btnTypes = ['APPROVE', ...btnTypes];
        }
        return btnTypes;
      };

      const operationBtnType = getOperationBtnType(status);

      // 所有操作项配置信息
      const allOperationConfig = getOperationConfig(id, handleClick);
      // 获得操作项对应配置信息
      const operationConfig = [];
      operationBtnType.forEach((btnType) => {
        const btnConfig = allOperationConfig.filter(config => btnType === config.key);
        operationConfig.push(btnConfig[0]);
      });

      return <TableOperateList operationConfig={operationConfig} />;
    };
    return [
      {
        title: '风险编号',
        dataIndex: 'code',
        key: 'code',
        width: 200,
        render: (text, record) => (
          <Link to={`/risk-events/view/${record.id}`}>{formatString(text)}</Link>
        ),
      }, {
        title: '风险类型',
        dataIndex: 'typeDesc',
        key: 'typeDesc',
        className: 'nowrap',
        render: text => (
          formatString(text)
        ),
      }, {
        title: '风险简诉',
        dataIndex: 'briefDesc',
        key: 'briefDesc',
        width: 200,
        render: text => (
          formatString(text, true)
        ),
      }, {
        title: '风险详诉',
        dataIndex: 'riskDetail',
        key: 'riskDetail',
        width: 250,
        render: text => (
          <RiskDetail content={text} />
        ),
      }, {
        title: '合规建议',
        dataIndex: 'advice',
        key: 'advice',
        width: 200,
        render: text => (
          formatString(text)
        ),
      }, {
        title: '风险对象',
        dataIndex: 'riskTarget',
        key: 'riskTarget',
        width: 150,
        render: text => (
          formatString(text)
        ),
      }, {
        title: '报送机构',
        dataIndex: 'reportInstitution',
        key: 'reportInstitution',
        width: 150,
        render: text => (
          formatString(text)
        ),
      }, {
        title: '报送时间',
        dataIndex: 'reportTime',
        key: 'reportTime',
        className: 'nowrap',
        render: text => (
          formatString(text, true)
        ),
      }, {
        title: '当前执行人',
        dataIndex: 'executor',
        key: 'executor',
        width: 150,
        render: text => (
          formatString(text)
        ),
      }, {
        title: '完结时间',
        dataIndex: 'finishTime',
        key: 'finishTime',
        className: 'nowrap',
        render: text => (
          formatString(text)
        ),
      }, {
        title: '风险状态',
        dataIndex: 'status',
        key: 'status',
        className: 'nowrap',
        render: (text) => {
          const name = getRelevantName(text, STATUS);
          return <Badge className="list-badge" status={BADGE_STATUS[text]} text={name} />;
        },
      }, {
        title: '耗时',
        dataIndex: 'consumeTime',
        key: 'consumeTime',
        className: 'nowrap',
        render: text => (
          formatString(text)
        ),
      }, {
        title: '操作',
        dataIndex: 'handle',
        key: 'handle',
        fixed: 'right',
        width: 120,
        render: (text, record) => {
          return getOperationBtn(record);
        },
      },
    ];
  };


  const columns = getColumns();

  const { data = [], total } = list;
  return {
    columns,
    dataSource: data,
    pagination: {
      pageSize,
      current: pageNo,
      showSizeChanger: true,
      total,
    },
    rowKey: 'id',
    scroll: { x: 2000 },
  };
};

// 获得customItem
export const getCustomItem = () => {
  return [
    {
      label: '风险对象',
      id: 'riskTarget',
      render: () => <Input placeholder="请输入" />,
    }, {
      label: '报送时间',
      id: 'reportTime',
      render: () => <RangePicker />,
    },
  ];
};

// 获得tab配置信息
export const getTabsConfig = tab => (
  {
    defaultActiveKey: tab,
    activeKey: tab,
    tabList: TAB_LIST,
  }
);

// 获得面包屑操作
export const getGlobalBtn = (component, status) => {
  const { goBack, isApprove, approve, props } = component;
  const { platformApprove } = props.privileges;
  /**
   * 展示审核按钮判断条件
   * 1. 是否有审核权限
   * 2. 是否为审核页面
   * 3. 状态是否为2 (即, 待平台处理)
   */
  const isShowApprove = platformApprove && isApprove && status === 2;

  // 若新开页面展示信息(即,window.history.length<=1),则不显示返回按钮
  const historyLen = window.history.length;
  const globalBtn = [];
  if (historyLen >= 2) {
    globalBtn.push({
      label: '返回',
      onClick: goBack,
    });
  }
  if (isShowApprove) {
    globalBtn.push({
      label: '审批',
      type: 'primary',
      onClick: approve,
    });
  }
  return globalBtn;
};

// 获得详情页面包屑
export const getDetailRoutes = (isApprove) => {
  const routes = [
    {
      label: '风险事件识别与管理',
    },
  ];
  if (isApprove) {
    routes.push({
      label: '审批',
    });
  } else {
    routes.push({
      label: '详情',
    });
  }

  return routes;
};

