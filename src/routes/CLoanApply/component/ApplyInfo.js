import React, { Fragment } from 'react';
import { FormGrid } from 'doraemon';
import { FormatFix, formatString } from 'commonUtils';
import { FROM_ITEM_LAYOUT_8 } from 'common/constants';

export default function ApplyInfo(props) {
  const { applyInfo = {}, type } = props;

  // type 1-流水贷 2-合同贷
  const contractFormGridItems = type === 2 ? [
    {
      label: '中标项目编号',
      render: () => (
        formatString(applyInfo.bidProjectCode)
      ),
    }, {
      label: '中标项目名称',
      render: () => (
        formatString(applyInfo.bidProjectName)
      ),
    },
  ] : [];

  const formGridItem = [
    {
      label: '申请时间',
      render: () => (
        formatString(applyInfo.time)
      ),
    }, {
      label: '申请发起人',
      render: () => (
        formatString(applyInfo.applicant)
      ),
    }, {
      label: '申请贷款金额(元)',
      render: () => (
        <span className="money">{FormatFix.formatMoney(applyInfo.amount)}</span>
      ),
    }, {
      label: '申请发起人电话',
      render: () => (
        formatString(applyInfo.phoneNo)
      ),
    },
    ...contractFormGridItems,
  ];

  return (
    <Fragment>
      <div className="panel-sub-title">贷款申请信息</div>
      <FormGrid
        {...FROM_ITEM_LAYOUT_8}
        formGridItem={formGridItem}
      />
    </Fragment>
  );
}
