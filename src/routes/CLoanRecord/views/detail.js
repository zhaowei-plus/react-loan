import React, { Component } from 'react';
import { ZcyBreadcrumb, Spin, Panel, List, Card } from 'doraemon';
import { connect } from 'dva';
import { formatNumber } from 'commonUtils';

import loan from 'assets/icon-loan.png';
import borrow from 'assets/icon-borrow.png';
import repaied from 'assets/icon-repaied.png';

import StageItem from '../common/StageItem';
import './index.less';

const { Item } = List;

const breadcrumb = [{
  label: '借款记录',
}, {
  label: '还款明细',
}];

const globalBtn = [{
  label: '返回',
  to: '/cloan-record',
}];

@connect(({ cLoanRecord, loading }) => ({
  repaymentDetails: cLoanRecord.repaymentDetails,
  loading: loading.effects['cLoanRecord/fetchLoanDetail'],
}))
export default class CRepaymentDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 1,
      pageSize: 8,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;

    this.fetchDetail({ loanCode: id });
  }

  fetchDetail = (params) => {
    this.props.dispatch({
      type: 'cLoanRecord/fetchLoanDetail',
      payload: {
        ...params,
      },
    });
  }

  getPagination = () => {
    const { repaymentDetails = {} } = this.props;
    const { pageSize, current } = this.state;
    const { totalPeriod = 0 } = repaymentDetails;
    const pagination = {
      total: totalPeriod,
      pageSize,
      current,
      onChange: (cur) => {
        this.setState({
          current: cur,
        });
      },
    };
    return pagination;
  }

  getDataSource = () => {
    const { repaymentDetails = {} } = this.props;
    const { pageSize, current } = this.state;
    const { repaymentRecordROList = [] } = repaymentDetails;

    const startIndex = (current - 1) * pageSize;
    const endIndex = current * pageSize;
    return repaymentRecordROList.filter((d, i) => (startIndex <= i && i < endIndex));
  }

  render() {
    const { loading, repaymentDetails = {} } = this.props;

    const pagination = this.getPagination();
    const dataSource = this.getDataSource();

    return (
      <div>
        <Spin spinning={loading}>
          <ZcyBreadcrumb
            routes={breadcrumb}
            globalBtn={globalBtn}
          />
          <Panel
            title={
              <div className="repayment-amount-wrap">
                <div className="repayment-item">
                  <img className="icon" src={loan} alt="贷款总额" />
                  <span className="amount-title">贷款总额：</span>
                  <span className="amount-info">￥{formatNumber(repaymentDetails.totalAmount)}</span>
                </div>

                <div className="repayment-item">
                  <img className="icon" src={borrow} alt="借款本金余额" />
                  <span className="amount-title">借款本金余额：</span>
                  <span className="amount-info">￥{formatNumber(repaymentDetails.restAmount)}</span>
                </div>

                <div className="repayment-item">
                  <img className="icon" src={repaied} alt="已还期数" />
                  <span className="amount-title">已还期数：</span>
                  <span>{repaymentDetails.repaymentPeriod}期</span>
                </div>
              </div>
            }
          >
            <List
              grid={{ gutter: 16, xs: 4, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 }}
              dataSource={dataSource}
              pagination={pagination}
              renderItem={item => (
                <Item>
                  <Card bordered={false}>
                    <StageItem item={item} totalPeriod={repaymentDetails.totalPeriod} />
                  </Card>
                </Item>
              )}
            />
          </Panel>
        </Spin>
      </div>
    );
  }
}
