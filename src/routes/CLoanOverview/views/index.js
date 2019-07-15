import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Spin,
} from 'doraemon';
import AccountInfo from '../moduleComponent/AccountInfo';
import CalculateRate from '../moduleComponent/CalculateRate';
import HelpCenter from '../moduleComponent/HelpCenter';
import ProductCarouse from '../moduleComponent/ProductCarouse';
import SmartCloudLoan from '../moduleComponent/SmartCloudLoan';
import HotRecommendItem from '../component/HotRecommendItem';
import loanAbleBidItemHoc from '../component/LoanAbleBidItem';
import RecommendProduct from '../component/RecommendProduct';


import './index.less';


@connect(({ loading, customerLoanOverview }) => ({
  loading: loading.effects['customerLoanOverview/getAccountStatistics'],
  accountStatistics: customerLoanOverview.accountStatistics,
  helpCenterInfo: customerLoanOverview.helpCenterInfo,
  recommendProds: customerLoanOverview.recommendProds,
  hotRecommend: customerLoanOverview.hotRecommend,
  loanAbleBidItems: customerLoanOverview.loanAbleBidItems,
}))
export default class CustomerLoanOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendProductVisible: false,
      projectCode: '',
      source: '',
    };
  }

  componentDidMount() {
    this.fetchOverviewData();
    this.fetchHelpCenter();
    this.fetchHotRecommend();
    this.fetchLoanAbleBidItems();
    this.recordAction();
    this.setLayoutWidth();
  }


  setLayoutWidth = () => {
    /**
     * 满足总览统计数据展示最多1亿，调整layout 最小宽度，离开时恢复
     * @type {string}
     */
    this.layoutOriginMinWidth = document.querySelector('.zcy-layout-content').style.minWidth;
    document.querySelector('.zcy-layout-content').style.minWidth = '1210px';
  }

  /**
   * 获取总览数据
   */
  fetchOverviewData = () => {
    this.props.dispatch({
      type: 'customerLoanOverview/getAccountStatistics',
      payload: {},
    });
  }


  /**
   * 帮助中心
   */
  fetchHelpCenter=() => {
    this.props.dispatch({
      type: 'customerLoanOverview/getHelpCenterInfo',
      payload: {
        categoryCode: 'rongzidaikuan',
      },
    });
  }


  /**
   * 获取热门申请
   */
  fetchHotRecommend = () => {
    this.props.dispatch({
      type: 'customerLoanOverview/getHotRecommend',
      payload: {
      },
    });
  }

  /**
   * 获取可申请标项
   */
  fetchLoanAbleBidItems=() => {
    this.props.dispatch({
      type: 'customerLoanOverview/getLoanAbleBidItems',
      payload: {
      },
    });
  }

  recordAction=() => {
    /**
     * loan_c_f_l
     * loan customer first login
     * @type {string}
     */
    const customerFirstLogin = sessionStorage.getItem('loan_c_f_l');
    if (!customerFirstLogin) {
      sessionStorage.setItem('loan_c_f_l', '1');

      /**
       * 记录用户行为
       * 用户登录应用
       */

      this.doRecord(6);
    }
  }


  doRecord = (type) => {
    this.props.dispatch({
      type: 'productDetail/recordAction',
      payload: type,
    });
  }


  handleBidItemRecommend=(projectCode) => {
    this.toggleRecommend('1', projectCode);
  }


  toggleRecommend=(source, projectCode) => {
    this.setState({
      recommendProductVisible: !this.state.recommendProductVisible,
      source,
      projectCode,
    });
  }

  componentWillUnmount() {
    document.querySelector('.zcy-layout-content').style.minWidth = this.layoutOriginMinWidth;
  }
  render() {
    const {
      accountStatistics = {},
      helpCenterInfo = [],
      hotRecommend,
      loanAbleBidItems,
      loading,
    } = this.props;

    const {
      source,
      recommendProductVisible,
      projectCode,
    } = this.state;


    return (
      <Spin
        spinning={loading}
        wrapperClassName="customer-loan-overview-spin"
      >
        <div className="customer-loan-overview">
          <AccountInfo
            accountStatistics={accountStatistics}
            handleRecommend={this.toggleRecommend}
            history={this.props.history}
            doRecord={this.doRecord}
          />
          <ProductCarouse
            dataSource={loanAbleBidItems}
            CarouseItem={loanAbleBidItemHoc(this.handleBidItemRecommend)}
            innerItemLength={3}
            style={{ margin: '0 -10px' }}
            title="可融资中标项目"
          />
          <SmartCloudLoan
            toggleRecommend={this.toggleRecommend}
          />
          <ProductCarouse
            dataSource={hotRecommend}
            CarouseItem={HotRecommendItem}
            style={{ margin: '0 -5px' }}
            innerItemLength={4}
            title="热门申请"
          />
          <CalculateRate
            dispatch={this.props.dispatch}
          />
          <HelpCenter
            helpCenterInfo={helpCenterInfo}
          />
          {
            recommendProductVisible && (
              <RecommendProduct
                history={this.props.history}
                onCancel={this.toggleRecommend}
                source={source}
                projectCode={projectCode}
              />
            )
          }
        </div>
      </Spin>

    );
  }
}
