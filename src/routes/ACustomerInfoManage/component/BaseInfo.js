import React from 'react';
import {
  Row,
  Col,
  Form,
} from 'doraemon';
import { FROM_ITEM_LAYOUT_8 } from 'common/constants';

const { Item } = Form;

export const BaseInfo = (params) => {
  const { customerInfoDetail } = params;
  return (
    <div>
      <div className="panel-sub-title">基础资料</div>
      <Row gutter={24} className="info-padding">
        <Row>
          <Col span={12}>
            <Item {...FROM_ITEM_LAYOUT_8} label="公司全称" >
              {customerInfoDetail.fullName || '-'}
            </Item>
          </Col>
          <Col span={12}>
            <Item {...FROM_ITEM_LAYOUT_8} label="公司曾用名" >
              {customerInfoDetail.usedName || '-'}
            </Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Item {...FROM_ITEM_LAYOUT_8} label="公司地址" >
              {customerInfoDetail.address || '-'}
            </Item>
          </Col>
          <Col span={12}>
            <Item {...FROM_ITEM_LAYOUT_8} label="公司成立日期" >
              {customerInfoDetail.establishedDate || '-'}
            </Item>
          </Col>
        </Row>
        <Col span={12}>
          <Item {...FROM_ITEM_LAYOUT_8} label="对外联系电话" >
            {customerInfoDetail.externalPhoneNo || '-'}
          </Item>
        </Col>
        <Col span={12}>
          <Item {...FROM_ITEM_LAYOUT_8} label="企业电子邮箱" >
            {customerInfoDetail.email || '-'}
          </Item>
        </Col>
        <Row>
          <Col span={12}>
            <Item {...FROM_ITEM_LAYOUT_8} label="开户银行" >
              {customerInfoDetail.bank || '-'}
            </Item>
          </Col>
          <Col span={12}>
            <Item {...FROM_ITEM_LAYOUT_8} label="银行账号" >
              {customerInfoDetail.account || '-'}
            </Item>
          </Col>
        </Row>
        <Col span={12}>
          <Item {...FROM_ITEM_LAYOUT_8} label="联系人姓名" >
            {customerInfoDetail.contactName || '-'}
          </Item>
        </Col>
        <Col span={12}>
          <Item {...FROM_ITEM_LAYOUT_8} label="联系人电话" >
            {customerInfoDetail.contactPhoneNo || '-'}
          </Item>
        </Col>
        <Col span={12}>
          <Item {...FROM_ITEM_LAYOUT_8} label="企业规模" >
            {customerInfoDetail.enterpriseScale || '-'}
          </Item>
        </Col>
        <Col span={12}>
          <Item {...FROM_ITEM_LAYOUT_8} label="供应商类型" >
            {customerInfoDetail.supplierType || '-'}
          </Item>
        </Col>
        <Col span={12}>
          <Item {...FROM_ITEM_LAYOUT_8} label="企业传真号码" >
            {customerInfoDetail.faxNo || '-'}
          </Item>
        </Col>
        <Col span={12}>
          <Item {...FROM_ITEM_LAYOUT_8} label="是否上市" >
            {customerInfoDetail.isListed === null ? '-' : (customerInfoDetail.isListed ? '是' : '否')}
          </Item>
        </Col>
      </Row>
    </div>
  );
};
