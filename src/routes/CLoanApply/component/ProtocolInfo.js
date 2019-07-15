import React, { Fragment } from 'react';
import { FormGrid } from 'doraemon';
import { FROM_ITEM_LAYOUT_8 } from 'common/constants';

export default function ProtocolInfo(props) {
  const { handleClick } = props;

  const formGridItem = [
    {
      label: '协议名称',
      render: () => (
        <a onClick={() => handleClick(true)}>政采云融资信息服务协议</a>
      ),
    },
  ];

  return (
    <Fragment>
      <div className="panel-sub-title">协议信息</div>
      <FormGrid
        {...FROM_ITEM_LAYOUT_8}
        formGridItem={formGridItem}
      />
    </Fragment>
  );
}
