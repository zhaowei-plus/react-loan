import React, { Component, Fragment } from 'react';
import { Icon, Carousel } from 'doraemon';
import ProductList from '../component/ProductList';

const RecommendProduct = (props) => {
  const { recommendProduct, doRecord, history } = props;

  const jump = () => {
    /**
     * 查看推荐渠道产品详情
     */
    doRecord(2);

    /**
     * 热门推荐 source 2
     */
    history.push(`/customer-product-detail/2/${recommendProduct.id}`);
  };

  return (
    <div className="recommend-info" style={{ width: '260px', height: '300px' }}>
      <img
        src={recommendProduct.smallImage}
        alt="贷款产品"
        onClick={jump}
        style={{ width: '260px', height: '300px', cursor: 'pointer' }}
      />
    </div>
  );
};

export default class UserLoanInfoSwitch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeProdIndex: 1,
    };

    this.carouselRef = React.createRef();
  }

  sliderOver=true;
  handleProdListSwitch = (type, activeProdIndex, prodCount) => {
    const { innerSlider } = this.carouselRef.current;

    if (!this.sliderOver) {
      return;
    }

    if (type === 'PREV') {
      if (activeProdIndex > 1) {
        innerSlider.slickPrev();
      }
    }

    if (type === 'NEXT') {
      if (activeProdIndex < prodCount) {
        innerSlider.slickNext();
      }
    }
  };

  beforeChange=(oldIndex, newIndex) => {
    this.sliderOver = false;
    this.setState({
      activeProdIndex: newIndex + 1,
    });
  }
  afterChange=() => {
    this.sliderOver = true;
  }

  renderMyLoanInfo =() => {
    const { userLoanInfo, handleRecommend, recommendInfo, doRecord } = this.props;
    const { activeProdIndex } = this.state;


    if (!userLoanInfo.length && !recommendInfo.length) {
      /**
       * 无贷款信息并且无推荐信息 展示默认无贷款信息
       */
      return (
        <Fragment>
          <span className="prod-list-title title-tag">
              精品推荐
          </span>
          <div className="none-prod">
            <Icon zcy type="wushuju" />
            <div className="text">
              暂无贷款信息
            </div>
            <a className="recommend-btn"
              onClick={() => {
                handleRecommend('2');
              }}
            >立即推荐
            </a>
          </div>
        </Fragment>
      );
    }


    const productSwitchList = [...userLoanInfo, ...recommendInfo].slice(0, 3);


    const currentProduct = productSwitchList[activeProdIndex - 1] || {};


    return (
      <Fragment>
        <span className="prod-list-title title-tag">
          {currentProduct.smallImage ? '精品推荐' : '我的贷款'}
        </span>
        <div className="prod-list-switch">
          {activeProdIndex}/{productSwitchList.length}
          <Icon type="left-circle"
            className={activeProdIndex > 1 ? 'active' : ''}
            onClick={() => {
              this.handleProdListSwitch('PREV', activeProdIndex, productSwitchList.length);
            }}
          />
          <Icon type="right-circle"
            className={activeProdIndex < productSwitchList.length ? 'active' : ''}
            onClick={() => {
              this.handleProdListSwitch('NEXT', activeProdIndex, productSwitchList.length);
            }}
          />
        </div>
        <Carousel
          ref={this.carouselRef}
          dots={false}
          afterChange={this.afterChange}
          beforeChange={this.beforeChange}
        >
          {
            productSwitchList.map((current, index) => {
              return (
                <div key={current.id || index}>
                  {
                    current.smallImage ? (
                      <RecommendProduct
                        recommendProduct={current}
                        doRecord={doRecord}
                        history={this.props.history}
                      />
                    ) : (
                      <ProductList
                        myCurrentLoanProd={current}
                      />
                    )
                  }
                </div>
              );
            })
          }
        </Carousel>
      </Fragment>
    );
  }

  render() {
    return (
      <div className="my-prod-panel">

        {
          this.renderMyLoanInfo()
        }
      </div>
    );
  }
}

