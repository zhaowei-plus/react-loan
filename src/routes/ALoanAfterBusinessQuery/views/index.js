import React, { Component, Fragment } from 'react';
// import qs from 'qs';
import {
  ZcyBreadcrumb,
  Select,
} from 'doraemon';
import { connect } from 'dva';
import { getUrlSearchParams } from 'commonUtils';

import { BUSINESS_TYPES } from '../component/typeConstants';

import RepayPlanList from '../component/RepayPlanList';
import RepayHistoryList from '../component/RepayHistoryList';
import CapitalRecordList from '../component/CapitalRecordList';
import LimitRecordList from '../component/LimitRecordList';


import './index.less';

const { Option } = Select;

@connect()
export default class BusinessQuery extends Component {
  constructor(props) {
    super(props);
    const { search } = props.location;
    const UrlSearchParams = getUrlSearchParams(search);
    const { businessType, channelCode, repayType } = UrlSearchParams;
    this.channelCode = channelCode;
    this.repayType = repayType;
    this.state = {
      businessType: businessType || '1',
    };
  }


  componentDidMount() {
    this.getChannelNameList();
  }

  onTypeChange=(value) => {
    this.setState({
      businessType: value,
    });
  }

  // 获得选择业务查询类型
  getExtraContent=() => {
    const { businessType } = this.state;
    return (
      <Select
        className="select-border"
        onChange={this.onTypeChange}
        defaultValue={businessType}
      >
        {
          BUSINESS_TYPES.map(types => (
            <Option key={types.key} value={types.key}>{types.name}</Option>
          ))
        }
      </Select>
    );
  }

  // 得到渠道名称列表
  getChannelNameList=() => {
    this.props.dispatch({
      type: 'loanAfterBusinessQuery/getChannelNameList',
    });
  }

  // 获得业务查询内容
  getBusinessContent=() => {
    /**
     * businessType
     * 1:还款计划
     * 2:还款历史
     * 3:资金流水
     * 4:额度记录
     */
    const { businessType } = this.state;
    let businessContent = '';
    switch (businessType) {
    case '1':
      businessContent = <RepayPlanList channelCode={this.channelCode} initType={this.repayType} />;
      break;
    case '2':
      businessContent = <RepayHistoryList channelCode={this.channelCode} />;
      break;
    case '3':
      businessContent = <CapitalRecordList />;
      break;
    case '4':
      businessContent = <LimitRecordList />;
      break;
    default:
      break;
    }
    return businessContent;
  }

  getConfigInfo=() => ({
    routes: [
      {
        label: '贷后业务查询',
      },
    ],
  })

  render() {
    const configInfo = this.getConfigInfo();
    const routes = configInfo.routes || [];

    // 选择业务查询类型
    const extraContent = this.getExtraContent();

    // 业务查询内容
    const businessContent = this.getBusinessContent();


    return (
      <Fragment>
        <ZcyBreadcrumb
          routes={routes}
          extraContent={extraContent}
        />
        {businessContent}
      </Fragment>
    );
  }
}
