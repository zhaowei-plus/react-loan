import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { formatDateToLocal, formatNumber } from 'commonUtils';
import {
  Panel,
  ZcyOverviewCount,
  Icon,
} from 'doraemon';
import Marquee from '../component/Marquee';
import UserLoanInfoSwitch from './UserLoanInfoSwitch';


const { ZcySwiper } = ZcyOverviewCount;


class AccountInfo extends Component {
  state={
    dataVisible: true,
  }

  toggleDataVisible = () => {
    this.setState(({ dataVisible }) => ({
      dataVisible: !dataVisible,
    }));
  };
   fixDataShow = (data) => {
     const { dataVisible } = this.state;
     if (!dataVisible) {
       return '***';
     }
     return data;
   };
   render() {
     const { accountStatistics, handleRecommend, doRecord } = this.props;

     const { dataVisible } = this.state;
     const {
       accountInfo = {},
       recommendInfo = [],
       userLoanInfo = [],
     } = accountStatistics;


     const nowTime = new Date().getHours();

     const panelTitle = (
       <span>
         <span className="overview-user-avatar">
           <Icon zcy type="touxiang1" />
         </span>
         {
           nowTime < 12 ? '上午好, ' : '下午好, '
         }
         {accountInfo.userName}
         {
           (!accountInfo.integrityScore && accountInfo.integrityScore !== 0) ? null : (
             <span className="credit-score">
          政采诚信分&nbsp;{accountInfo.integrityScore}
             </span>
           )
         }

       </span>
     );


     const swiperProps = {
       data: [{
         title: '累计借款本金(元)',
         icon: 'jiekuan',
         count: this.fixDataShow(formatNumber(accountInfo.totalBorrow)),
       }, {
         title: '已还本金(元)',
         icon: 'huishoubenjin',
         count: this.fixDataShow(formatNumber(accountInfo.totalRepayment)),
       }, {
         title: '待还本金(元)',
         icon: 'huankuan',
         count: this.fixDataShow(formatNumber(accountInfo.totalToPay)),
       },
       ],
     };


     const monthShouldReturn = accountInfo.monthShouldReturn ? formatNumber(accountInfo.monthShouldReturn) : '0.00';

     return (
       <Panel>
         <Marquee />
         <div className="account-info-panel">
           <Panel
             title={panelTitle}
           >
             <div className="summary">
               <h3
                 style={{ color: '#333', fontSize: '18px', fontWeight: 'normal' }}
               >
                本月剩余应还总额
                 <a onClick={this.toggleDataVisible}>
                   <Icon
                     zcy
                     type={dataVisible ? 'yincang' : 'yincang1'}
                     style={{ paddingLeft: '8px', color: '#777' }}
                   />
                 </a>
               </h3>
               <div>
                 <h1 style={{ display: 'inline-block', fontSize: '50px', lineHeight: '66px' }}>
                   <Link to="/crepayment-manage/plan" className="repayment-plan"> {this.fixDataShow(monthShouldReturn)}</Link>
                 </h1>
                 <Link style={{ paddingLeft: '10px' }} to="/crepayment-manage/plan">查看明细</Link>
               </div>
               <span style={{ color: '#999' }}>
                 {
                   accountInfo.lastDueDate ? `您最近一笔还款日期在${formatDateToLocal(accountInfo.lastDueDate, false)}` : '您本月无还款计划'
                 }
               </span>
             </div>
             <span className="summary-list-title title-tag">
                我的借款
             </span>
             <ZcySwiper {...swiperProps} />
           </Panel>
         </div>
         <UserLoanInfoSwitch
           doRecord={doRecord}
           userLoanInfo={userLoanInfo}
           recommendInfo={recommendInfo}
           handleRecommend={handleRecommend}
           history={this.props.history}
         />
       </Panel>
     );
   }
}


export default AccountInfo;
