import React, { Fragment } from 'react';
import { FormGrid } from 'doraemon';
import { FormatFix, formatString } from 'commonUtils';
import { FROM_ITEM_LAYOUT_8 } from 'common/constants';

import { estimateResults } from '../config';

export default function EstimateInfo(props) {
  const { estimateInfo = {} } = props;

  const formGridItem = [
    {
      label: '测算时间',
      render: () => (
        formatString(estimateInfo.time)
      ),
    }, {
      label: '测算结果',
      render: () => (
        formatString(estimateResults[estimateInfo.result])
      ),
    }, {
      label: '测算结果金额(元)',
      render: () => (
        <span className="money">{FormatFix.formatMoney(estimateInfo.resultAmount)}</span>
      ),
    }, {
      label: '测算贷款利率(%)',
      render: () => (
        FormatFix.formatPercent(estimateInfo.annualizedRate)
      ),
    }, {
      label: '备注',
      render: () => (
        formatString(estimateInfo.remark)
      ),
    }, {
      label: '测算总额度(元)',
      render: () => (
        <span className="money">{FormatFix.formatMoney(estimateInfo.totalAmount)}</span>
      ),
    },
  ];

  return (
    <Fragment>
      <div className="panel-sub-title">额度测算信息</div>
      <FormGrid
        {...FROM_ITEM_LAYOUT_8}
        formGridItem={formGridItem}
      />
    </Fragment>
  );
}
