import React, { Fragment } from 'react';
import { FormGrid } from 'doraemon';
import { Link } from 'dva/router';
import { formatString } from 'commonUtils';
import { FROM_ITEM_LAYOUT_8 } from 'common/constants';

export default function BaseInfo(props) {
  const { projectInfo = {} } = props;

  const formGridItem = [
    {
      label: '贷款申请编号',
      render: () => (
        formatString(projectInfo.applyCode)
      ),
    }, {
      label: '审批机构',
      render: () => (
        formatString(projectInfo.channelName)
      ),
    }, {
      label: '产品名称',
      render: () => (
        <Fragment>
          {formatString(projectInfo.channelProductName)}
          <br />
          <Link to={`/customer-product-detail/${projectInfo.projectSource}/${projectInfo.productId}`}>查看产品详情</Link>
        </Fragment>
      ),
    },
  ];

  return (
    <Fragment>
      <div className="panel-sub-title">项目基本信息</div>
      <FormGrid
        {...FROM_ITEM_LAYOUT_8}
        formGridItem={formGridItem}
      />
    </Fragment>
  );
}
