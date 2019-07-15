import React, { Component } from 'react';
import {
  Spin,
  Panel,
  ZcyBreadcrumb,
} from 'doraemon';
import { connect } from 'dva';

import { BaseInfo } from '../component/BaseInfo';
import LoanAccountData from '../component/LoanAccountData';


@connect(({ loading, customerInfo }) => ({
  customerInfoDetail: customerInfo.customerInfoDetail,
  detailLoading: loading.effects['customerInfo/getCustomerInfoDetail'],
}))
export default class CustomerInfoManageView extends Component {
  constructor(props) {
    super(props);
    const { id } = props.match.params;
    this.id = id;
  }

  componentDidMount() {
    this.getCustomerInfoDetail();
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'customerInfo/resetDetail',
      payload: {},
    });
  }

  // 获得客户档案管理列表
  getCustomerInfoDetail=() => {
    this.props.dispatch({
      type: 'customerInfo/getCustomerInfoDetail',
      payload: {
        id: this.id,
      },
    });
  }

  goBack=() => {
    this.props.history.goBack();
  }

  getConfigInfo=() => ({
    routes: [{
      label: '企业客户贷款管理',
    }, {
      label: '详情',
    }],
    globalBtn: [{
      label: '返回',
      onClick: this.goBack,
    }],
  })

  render() {
    const { detailLoading, customerInfoDetail } = this.props;
    const configInfo = this.getConfigInfo();

    const routes = configInfo.routes || [];
    const globalBtn = configInfo.globalBtn || [];

    return (
      <Spin spinning={detailLoading}>
        <ZcyBreadcrumb
          routes={routes}
          globalBtn={globalBtn}
        />
        <Panel title="企业客户贷款管理详情">
          <BaseInfo customerInfoDetail={customerInfoDetail} />
          <LoanAccountData customerInfoDetail={customerInfoDetail} id={this.id} />
        </Panel>
      </Spin>
    );
  }
}
