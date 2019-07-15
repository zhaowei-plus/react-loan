import React, { Fragment } from 'react';
import { FormGrid } from 'doraemon';
import { formatString } from 'commonUtils';
import { FROM_ITEM_LAYOUT_8 } from 'common/constants';


export default function SupplierInfo(props) {
  const { supplierInfo = {} } = props;
  const formGridItem = [
    {
      label: '供应商名称',
      render: () => (
        formatString(supplierInfo.name)
      ),
    }, {
      label: '单位地址',
      render: () => (
        formatString(supplierInfo.address)
      ),
    }, {
      label: '电子邮件',
      render: () => (
        formatString(supplierInfo.email)
      ),
    }, {
      label: '联系电话',
      render: () => (
        formatString(supplierInfo.phoneNum)
      ),
    },
  ];

  return (
    <Fragment>
      <div className="panel-sub-title">供应商信息</div>
      <FormGrid
        {...FROM_ITEM_LAYOUT_8}
        formGridItem={formGridItem}
      />
    </Fragment>
  );
}
