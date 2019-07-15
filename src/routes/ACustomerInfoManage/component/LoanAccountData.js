import React, { Component, Fragment } from 'react';
import {
  Tabs,
  Row,
  Col,
} from 'doraemon';
import { connect } from 'dva';
import { formatNumber, validationNumber } from 'commonUtils';

import ApplyRecord from './ApplyRecord';
import BorrowRecord from './BorrowRecord';
import CapitalRecord from './CapitalRecord';
import LimitRecord from './LimitRecord';
import RepayHistory from './RepayHistory';
import RepayPlan from './RepayPlan';

import './index.less';

const TabPane = Tabs.TabPane;

@connect()
export default class BaseInfo extends Component {
  componentDidMount() {
    this.getOrgList();
  }
  // 查询审批机构列表
  getOrgList=() => {
    this.props.dispatch({
      type: 'customerInfo/getOrgList',
    });
  }

  render() {
    const { customerInfoDetail = {}, id } = this.props;
    const { accountData = {} } = customerInfoDetail;
    return (
      <Fragment>
        <div className="panel-sub-title">融资账户数据</div>
        <div className="info-padding border">
          <Row>
            <Col span={3} className="financeData-col">贷款申请中
              <p>{validationNumber(accountData.applyingNum)}笔/<span className="money-color">{ formatNumber(accountData.applyingMoney) }</span>元</p>
            </Col>
            <Col span={3} className="financeData-col border-right">累计申请
              <p>{validationNumber(accountData.totalApplyNum)}笔/<span className="money-color">{formatNumber(accountData.totalApplyMoney)}</span>元</p>
            </Col>
            <Col span={3} className="financeData-col">服务费待收
              <p>{validationNumber(accountData.serviceFeeNum)}笔/<span className="money-color">{formatNumber(accountData.serviceFeeMoney)}</span>元</p>
            </Col>
            <Col span={3} className="financeData-col border-right">累计收款
              <p>{validationNumber(accountData.totalServiceFeeNum)}笔/<span className="money-color">{formatNumber(accountData.totalServiceFeeMoney)}</span>元</p>
            </Col>
            <Col span={4} className="financeData-col border-right">待还款
              <p>{validationNumber(accountData.repaymentNum)}笔/<span className="money-color">{formatNumber(accountData.repaymentMoney) }</span>元</p>
            </Col>
            <Col span={4} className="financeData-col border-right">已结清
              <p>{validationNumber(accountData.settledNum)}笔/<span className="money-color">{formatNumber(accountData.settledMoney)}</span>元</p>
            </Col>
            <Col span={4} className="financeData-col">逾期中
              <p>{validationNumber(accountData.overdueNum)}笔/<span className="money-color">{formatNumber(accountData.overdueMoney)}</span>元</p>
            </Col>
          </Row>
        </div>
        <Tabs defaultActiveKey="1" >
          <TabPane tab="申请记录" key="1">
            <ApplyRecord customerId={id} />
          </TabPane>
          <TabPane tab="额度记录" key="2">
            <LimitRecord customerId={id} />
          </TabPane>
          <TabPane tab="借款记录" key="3">
            <BorrowRecord customerId={id} />
          </TabPane>
          <TabPane tab="还款计划" key="4">
            <RepayPlan customerId={id} />
          </TabPane>
          <TabPane tab="还款历史" key="5">
            <RepayHistory customerId={id} />
          </TabPane>
          <TabPane tab="资金流水" key="6">
            <CapitalRecord customerId={id} />
          </TabPane>
        </Tabs>
      </Fragment>
    );
  }
}
