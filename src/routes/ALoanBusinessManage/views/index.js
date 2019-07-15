import React, { Component, Fragment } from 'react';
import {
  ZcyBreadcrumb,
  Radio,
} from 'doraemon';
import { connect } from 'dva';

import { getUrlSearchParams } from 'commonUtils';

import LoanApplyList from '../component/LoanApplyList';
import BorrowRecordList from '../component/BorrowRecordList';

@connect()
export default class BusinessManage extends Component {
  constructor(props) {
    super(props);
    const { search } = props.location;
    const urlSearchParams = getUrlSearchParams(search);
    const { businessType } = urlSearchParams;
    this.search = search;
    this.state = {
      businessType: businessType || '1',
    };
  }

  componentDidMount() {
    this.getChannelList();
  }

  onTypeChange=(e) => {
    this.setState({
      businessType: e.target.value,
    });
  }

  // 获得选择业务查询类型
  getExtraContent=businessType => (
    <Radio.Group onChange={this.onTypeChange} defaultValue={businessType}>
      <Radio.Tab value="1">贷款申请</Radio.Tab>
      <Radio.Tab value="2">借款记录</Radio.Tab>
    </Radio.Group>
  );

  // 得到渠道名称列表
  getChannelList=() => {
    this.props.dispatch({
      type: 'loanBusinessManage/getChannelList',
    });
  }

  // 获得配置信息
  getConfigInfo=() => ({
    routes: [
      {
        label: '贷款业务管理',
      },
    ],
  })

  render() {
    const { businessType } = this.state;

    const configInfo = this.getConfigInfo();

    const routes = configInfo.routes || [];

    // 选择业务查询类型
    const extraContent = this.getExtraContent(businessType);
    return (
      <Fragment>
        <ZcyBreadcrumb
          routes={routes}
          extraContent={extraContent}
        />
        {
          businessType === '1' ? (
            <LoanApplyList
              search={this.search}
            />
          ) : (
            <BorrowRecordList
              search={this.search}
            />
          )
        }
      </Fragment>
    );
  }
}
