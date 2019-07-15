import React, { Fragment } from 'react';
import { FormGrid } from 'doraemon';
import { formatString, FormatFix } from 'commonUtils';
import { FROM_ITEM_LAYOUT_8 } from 'common/constants';
import { approveResults } from '../config';
import { applyStatus } from '../../CLoanApplyRecord/config';

export default function ApproveInfo(props) {
  const { approveInfo = {} } = props;
  const status = applyStatus.find(d => d.value === approveInfo.applyStatus) || {};

  const formGridItem = [
    {
      label: '申请状态',
      render: () => (
        formatString(status.text)
      ),
    }, {
      label: '贷款合同编号',
      render: () => (
        formatString(approveInfo.contractCode)
      ),
    }, {
      label: '审批完成时间',
      render: () => (
        formatString(approveInfo.time)
      ),
    }, {
      label: '审批额度(元)',
      render: () => (
        FormatFix.formatMoney(approveInfo.amount)
      ),
    }, {
      label: '审批结果',
      render: () => (
        formatString(approveResults[approveInfo.result])
      ),
    }, {
      label: '贷款年化利率(%)',
      render: () => (
        FormatFix.formatPercent(approveInfo.annualizedRate)
      ),
    }, {
      label: '审批意见',
      render: () => (
        formatString(approveInfo.remark)
      ),
    }, {
      label: '审批产品名称',
      render: () => (
        formatString(approveInfo.productName)
      ),
    },
  ];

  return (
    <Fragment>
      <div className="panel-sub-title">贷款审批信息</div>
      <FormGrid
        {...FROM_ITEM_LAYOUT_8}
        formGridItem={formGridItem}
      />
    </Fragment>
  );
}
