import React, { Fragment } from 'react';
import { FormGrid } from 'doraemon';
import {
  formatString,
  getRelevantName,
} from 'commonUtils';
import { FROM_ITEM_LAYOUT_8 } from 'common/constants';
import { STATUS } from '../constants';

export default function BaseInfo(props) {
  const { riskRecord = {} } = props;
  const formGridItem = [
    {
      label: '风险编号',
      render: () => (
        formatString(riskRecord.code)
      ),
    }, {
      label: '报送机构',
      render: () => (
        formatString(riskRecord.reportInstitution)
      ),
    }, {
      label: '风险类型',
      render: () => (
        formatString(riskRecord.typeDesc)
      ),
    }, {
      label: '报送时间',
      render: () => (
        formatString(riskRecord.reportTime)
      ),
    }, {
      label: '风险简诉',
      render: () => (
        formatString(riskRecord.briefDesc)
      ),
    }, {
      label: '当前执行人',
      render: () => (
        formatString(riskRecord.executor)
      ),
    }, {
      label: '风险详诉',
      render: () => (
        formatString(riskRecord.riskDetail)
      ),
    }, {
      label: '风险状态',
      render: () => (
        getRelevantName(riskRecord.status, STATUS)
      ),
    }, {
      label: '合规建议',
      render: () => (
        formatString(riskRecord.advice)
      ),
    }, {
      label: '耗时',
      render: () => (
        formatString(riskRecord.consumeTime)
      ),
    }, {
      label: '风险对象',
      render: () => (
        formatString(riskRecord.riskTarget)
      ),
    },
  ];

  return (
    <Fragment>
      <div className="panel-sub-title">基础信息</div>
      <FormGrid
        {...FROM_ITEM_LAYOUT_8}
        formGridItem={formGridItem}
      />
    </Fragment>
  );
}
