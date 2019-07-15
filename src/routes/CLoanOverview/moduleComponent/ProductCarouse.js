import React, { Component } from 'react';
import { Panel, Row, Col, Carousel, Icon } from 'doraemon';


export default class ProductCarouse extends Component {
  constructor(props) {
    super(props);
    this.carouselRef = React.createRef();

    const { dataSource, innerItemLength } = props;
    const carouseDataSource = this.getCarouselInner(dataSource, innerItemLength);
    const carouselInnerDom = this.getCarouselInnerDom(carouseDataSource);
    this.state = {
      activeProdIndex: 1,
      carouseDataSource,
      carouselInnerDom,
    };
  }


  sliderOver = true;
  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource !== this.props.dataSource) {
      const { dataSource, innerItemLength } = nextProps;
      const carouseDataSource = this.getCarouselInner(dataSource, innerItemLength);
      const carouselInnerDom = this.getCarouselInnerDom(carouseDataSource);
      this.setState({
        carouseDataSource,
        carouselInnerDom,
      });
    }
  }
  getCarouselInner = (dataSource, innerLength = 4) => {
    const inner = [];

    const loopTarget = [...dataSource];
    const loop = (array) => {
      if (!array.length) {
        return;
      }
      let innerItem = [];
      /**
       * 目标长度小于4 构造一个长度为4的数组
       */
      if (array.length < innerLength) {
        innerItem = [...array];
        innerItem.length = innerLength;

        innerItem = [...innerItem];
        inner.push(innerItem);
        return;
      }


      innerItem = array.splice(0, innerLength);

      inner.push(innerItem);

      loop(array);
    };

    loop(loopTarget);


    return inner;
  };

  getCarouselInnerDom = (carouseDataSource = []) => {
    const { CarouseItem, innerItemLength } = this.props;
    return carouseDataSource.map((carouseItem, i) => {
      const key = i + 1;
      return (
        <div key={key}>
          {
            carouseItem.map((item, index) => {
              const innerKey = index + 1;
              return (
                <Col span={24 / innerItemLength} key={innerKey}>
                  <CarouseItem
                    dataItem={item}
                  />
                </Col>
              );
            })
          }

        </div>
      );
    });
  }

  handleProdListSwitch=(action, activeProdIndex) => {
    const { innerSlider } = this.carouselRef.current;
    const { carouseDataSource } = this.state;
    if (!this.sliderOver) {
      return;
    }

    if (action === 'NEXT') {
      if (activeProdIndex === carouseDataSource.length) {
        return;
      }
      innerSlider.slickNext();
    } else {
      if (activeProdIndex === 1) {
        return;
      }
      innerSlider.slickPrev();
    }
  }

  afterChange=() => {
    this.sliderOver = true;
  }


  beforeChange=(oldIndex, newIndex) => {
    this.sliderOver = false;
    this.setState({
      activeProdIndex: newIndex + 1,
    });
  }
  render() {
    const { activeProdIndex, carouseDataSource, carouselInnerDom } = this.state;

    const { title, style = {} } = this.props;

    if (!carouseDataSource.length) {
      return null;
    }

    const extra = (
      <div className="prod-list-switch">
        {activeProdIndex}/{carouseDataSource.length}
        <Icon type="left-circle"
          className={activeProdIndex > 1 ? 'active' : ''}
          onClick={() => {
            this.handleProdListSwitch('PREV', activeProdIndex);
          }}
        />
        <Icon type="right-circle"
          className={activeProdIndex < carouseDataSource.length ? 'active' : ''}
          onClick={() => {
            this.handleProdListSwitch('NEXT', activeProdIndex);
          }}
        />
      </div>
    );

    return (
      <Panel >
        <div>
          <span className="panel-sub-title">
            {title}
          </span>
          <div style={{ float: 'right' }}>
            {extra}
          </div>
        </div>
        <Row gutter={24} style={style} className="carousel_wrap">
          <Carousel
            ref={this.carouselRef}
            dots={false}
            afterChange={this.afterChange}
            beforeChange={this.beforeChange}

          >
            {carouselInnerDom}
          </Carousel>
        </Row>
      </Panel>
    );
  }
}

ProductCarouse.defaultProps = {
  dataSource: [],
};
