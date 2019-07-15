import React, { Fragment } from 'react';
import { formatNumber } from 'commonUtils';
import { Link } from 'react-router-dom';
import myLoanBg from '../image/loan-bg.png';


const ProductList = (props) => {
  const { myCurrentLoanProd = {} } = props;

  const style = myCurrentLoanProd.applicationStatus === 0 ? { backgroundImage: `url(${myLoanBg})` } : {};

  const getLoanApplying = () => {
    return (
      <Fragment>
        <div className="loan-title">
          <span className="loan-name">
            {myCurrentLoanProd.productName}
          </span>
          <span className="loan-channel nowrap">
            {myCurrentLoanProd.capitalChannel}
          </span>
        </div>
        <div className="loan-process">
        您有一笔额度正在申请中…
        </div>
        <div className="loan-limit">
        ¥{formatNumber(myCurrentLoanProd.loanAmount)}
        </div>

        <Link className="loan-button" to="/cloan-apply-record?tab=all" target="_blank">查看进度</Link>
      </Fragment>
    );
  };

  const getLoanDetail = () => {
    return (
      <Fragment>
        <div className="loan-title">
          <span className="loan-name">
            {myCurrentLoanProd.productName}
          </span>
          <span className="loan-channel">
            {myCurrentLoanProd.capitalChannel}
          </span>
        </div>
        <div className="loan-amount-wrap">
          <div className="loan-label">
          可用额度
          </div>
          <div className="loan-limit">
            {formatNumber(myCurrentLoanProd.availableQuota)}
          </div>
          <div className="loan-label">
          已借额度
          </div>
          <div className="loan-amount">
            {formatNumber(myCurrentLoanProd.loanAmount)}
          </div>
        </div>
        <span className="loan-notice">
           请到中国农业银行官方网银进行借款
        </span>
      </Fragment>
    );
  };

  return (
    <div
      className={
        myCurrentLoanProd.applicationStatus === 0 ?
          'applying prod-list-item' : 'detail prod-list-item'}
      style={style}
    >
      {myCurrentLoanProd.applicationStatus === 0 && getLoanApplying()}
      {myCurrentLoanProd.applicationStatus === 1 && getLoanDetail()}
    </div>
  );
};

export default ProductList;
