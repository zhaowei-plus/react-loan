import React, { Component, Fragment } from 'react';
import { Icon } from 'doraemon';
import './index.less';

export default class TextCarousel extends Component {
  constructor(props) {
    super(props);
    const { interval = 10, step = 1 } = props;

    this.state = {
      interval, // 间隔毫秒
      step, // 步进 1 像素
    };

    this.wrap = React.createRef();
  }

  move = (wrap, first) => {
    const { step } = this.state;
    wrap.scrollLeft += step;
    if (wrap.scrollLeft >= first.scrollWidth) {
      wrap.scrollLeft = 0;
    }
  }

  componentDidMount() {
    // 属否鼠标悬浮暂停
    const { hoverPause } = this.props;
    const { interval } = this.state;
    const { current: wrap } = this.wrap;

    const first = wrap.querySelector('.carousel-wrap-first');

    // 开始滚动
    this.carouselTimer = setInterval(() => {
      this.move(wrap, first);
    }, interval);

    // 鼠标进入停止滚动
    wrap.onmouseover = () => {
      hoverPause && clearInterval(this.carouselTimer);
    };

    // 鼠标离开继续滚动
    wrap.onmouseout = () => {
      if (hoverPause) {
        this.carouselTimer = setInterval(() => {
          this.move(wrap, first);
        }, interval);
      }
    };
  }

  componentWillUnmount() {
    clearInterval(this.carouselTimer);
  }

  render() {
    const { text, title } = this.props;

    return (
      <div className="text-carousel-wrap" >
        {
          title && (
            <div className="carousel-title">
              <Icon className="icon icon-people" zcy />
              <span className="title">{title}</span>
            </div>
          )
        }
        <div className="carousel-content" ref={this.wrap}>
          {
            text && (
              <Fragment>
                <div className="carousel-wrap-first">
                  <span>{text}</span>
                </div>
                <div className="carousel-wrap-last">
                  <span>{text}</span>
                </div>
              </Fragment>
            )
          }

        </div>
      </div>
    );
  }
}
