import React, { Component } from 'react';
import { connect } from 'dva';
import LoanRecommendLoading from './LoanRecommendLoading';
import RecommendModal from './RecommendModal';


@connect(({ customerLoanOverview }) => ({
  recommendProds: customerLoanOverview.recommendProds,
}))
export default class RecommendProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingVisible: true,
      recommendVisible: false,
    };
  }

  componentDidMount() {
    const { recommendVisible } = this.state;

    const { projectCode } = this.props;
    if (!recommendVisible) {
      /**
           * 最多延迟三秒展示推荐结果
           * @returns {Promise<any>}
           */
      const waitRecommendLoadingDone = () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 3000);
        });
      };

      const getRecommend = () => {
        return this.props.dispatch({
          type: 'customerLoanOverview/getRecommend',
          payload: {
            projectCode,
          },
        });
      };

      /**
           * 行为记录，查看渠道产品详情
           */
      this.doRecord(1);
      Promise.all([getRecommend(), waitRecommendLoadingDone()]).then((values) => {
        const res = values[0] || {};

        this.setState({
          loadingVisible: false,
        });

        if (res.success) {
          this.setState({
            recommendVisible: true,
          });
        }
      });
    }
  }


doRecord = (type) => {
  this.props.dispatch({
    type: 'productDetail/recordAction',
    payload: type,
  });
}


render() {
  const { loadingVisible, recommendVisible } = this.state;

  const { source, recommendProds, onCancel } = this.props;
  return (
    <div>
      {
        recommendVisible && (
          <RecommendModal
            onCancel={onCancel}
            doRecord={this.doRecord}
            visible={recommendVisible}
            source={source}
            dispatch={this.props.dispatch}
            history={this.props.history}
            recommendProds={recommendProds}
          />
        )
      }
      {
        loadingVisible && (
          <LoanRecommendLoading
            visible={loadingVisible}
          />
        )
      }
    </div>
  );
}
}

