import React, { Fragment } from 'react';
import { Row, Col, Popover } from 'doraemon';
import { formatAmount, formatString, formatNumber } from 'commonUtils';

import repayBank from 'assets/icon-repay-bank.png';

import { stageStatus } from '../config';

import './index.less';

export default function StageItem(props) {
  const { item, totalPeriod } = props;
  const { realRepaymentInfo = {}, shouldRepaymentInfo = {}, repaymentStatus } = item;
  const accountInfo = realRepaymentInfo.account.split(' ');

  const status = stageStatus[repaymentStatus] || {};

  /**
   * 还款状态：
   *
   * 1 - 还款中
   * 2 - 待还款
   * 3 - 已还款
   * 4 - 逾期中
   * 5 - 逾期已还款
   * 6 - 提前还款
   * 7 - 已终止
   *
   * */
  // 需要显示还款银行图标的状态集合
  const showBankIcon = [3, 5, 6];

  // 无需还款/已终止状态集合 - 已取消
  const noNeedRepay = [-1];

  /**
   * 获取 Header 状态文案
   * */
  const getRepayStatue = (type, amount) => {
    if (showBankIcon.includes(type)) {
      return `还款账号：${formatAmount(amount)}`;
    }
    return status.text;
  };

  /**
   * 应还总额、以及明细
   * */
  const getShouldRepayContent = () => {
    if (shouldRepaymentInfo.totalAmount >= 0) {
      return (
        <Fragment>
          <span className="repay-title">应还总额：</span>
          <span className="repay-info">{formatNumber(shouldRepaymentInfo.totalAmount)}</span>
          <Popover
            placement="bottomLeft"
            title="应还总额"
            content={
              <div className="popover-repayment-content-wrap">
                <p>
                  <span className="popover-repay-title">应还本金</span>
                  <span className="popover-repay-info">{formatNumber(shouldRepaymentInfo.principal)}</span>
                </p>
                <p>
                  <span className="popover-repay-title">应还利息</span>
                  <span className="popover-repay-info">{formatNumber(shouldRepaymentInfo.interest)}</span>
                </p>
                <p>
                  <span className="popover-repay-title">违约金</span>
                  <span className="popover-repay-info">{formatNumber(shouldRepaymentInfo.penalty)}</span>
                </p>
                <p>
                  <span className="popover-repay-title">逾期金额</span>
                  <span className="popover-repay-info">{formatNumber(shouldRepaymentInfo.overdueAmount)}</span>
                </p>
              </div>
            }
          >
            <a className="repay-link">明细</a>
          </Popover>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <span className="repay-title">应还总额：</span>
          <span className="repay-info">-</span>
        </Fragment>
      );
    }
  };

  /**
   * 实还总额、以及明细
   * */
  const getRealRepayContent = () => {
    if (realRepaymentInfo.totalAmount >= 0) {
      return (
        <Fragment>
          <span className="repay-title">实还总额：</span>
          <span className="repay-info"> {formatNumber(realRepaymentInfo.totalAmount)} </span>
          <Popover
            placement="bottomLeft"
            title="实还总额"
            content={
              <div className="popover-repayment-content-wrap">
                <p>
                  <span className="popover-repay-title">实还本金</span>
                  <span className="popover-repay-info">{formatNumber(realRepaymentInfo.principal)}</span>
                </p>
                <p>
                  <span className="popover-repay-title">实还利息</span>
                  <span className="popover-repay-info">{formatNumber(realRepaymentInfo.interest)}</span>
                </p>
              </div>
            }
          >
            <a className="repay-link">明细</a>
          </Popover>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <span className="repay-title">实还总额：</span>
          <span className="repay-info">-</span>
        </Fragment>
      );
    }
  };

  return (
    <div className={`stage-repayment-item ${status.style}`}>
      <div className="item-header">
        <div className="header-icon">
          <img src={status.src} alt={`${status.text}`} className={status.bgIconStyle} />
        </div>
        <div className="header-content">
          <span className="stage">{item.currentPeriod}/{totalPeriod}</span>
          <div className="amount">
            <span className="unit">¥</span>
            {formatNumber(shouldRepaymentInfo.principal + shouldRepaymentInfo.interest)}
            {
              // 无需还款
              noNeedRepay.includes(repaymentStatus) && (
                <Fragment>
                  <span className="line" style={{ top: '8px' }} />
                  <span className="line" style={{ top: '16px' }} />
                </Fragment>
              )
            }
          </div>
          <div className="account">[{getRepayStatue(repaymentStatus, accountInfo[1])}]</div>
        </div>
      </div>

      <div className="item-content">
        <Row>
          <Col>{getShouldRepayContent()}</Col>
        </Row>
        <Row>
          <Col>
            <span className="repay-title">应还日期：</span>
            <span className="repay-info">{formatString(shouldRepaymentInfo.date)}</span>
          </Col>
        </Row>
        <Row>
          <Col>{getRealRepayContent()}</Col>
        </Row>
        <Row>
          <Col>
            <span className="repay-title">实还日期：</span>
            <span className="repay-info">{formatString(realRepaymentInfo.date)}</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <span className="repay-title">还款账号：</span>
            <span className="repay-info">{formatAmount(accountInfo[1])}</span>
          </Col>
        </Row>
      </div>

      <div className="item-footer">
        {
          showBankIcon.includes(repaymentStatus) && (
            <div className="footer-icon">
              <img src={repayBank} alt="还款银行" />
            </div>
          )
        }
        {status.text}
      </div>
    </div>
  );
}
