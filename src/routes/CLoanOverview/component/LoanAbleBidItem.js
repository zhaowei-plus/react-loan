import React, { Component, Fragment } from 'react';
import { Button, Icon } from 'doraemon';

const LoanAbleBidItem = (props) => {
  const { dataItem, handleBidItemRecommend } = props;

  return (
    <div className="carousel_inner_bid_wrap">
      {
        dataItem ? (
          <Fragment>
            <div style={{ marginBottom: '14px' }}>
            项目名称：{dataItem.projectName}
            </div>
            <Button
              style={{ width: '100%' }}
              type="primary"
              onClick={() => {
                handleBidItemRecommend(dataItem.projectCode);
              }}
            >
            申请融资
            </Button>
          </Fragment>
        ) : (
          <div className="none-data-content">
            <Icon zcy type="wushuju" />
            <div className="text">
            暂无数据
            </div>
          </div>
        )}

    </div>
  );
};


const LoanAbleBidItemHoc = (handleBidItemRecommend) => {
  return class extends Component {
    render() {
      return (
        <LoanAbleBidItem
          handleBidItemRecommend={handleBidItemRecommend}
          {...this.props}
        />
      );
    }
  };
};


export default LoanAbleBidItemHoc;
