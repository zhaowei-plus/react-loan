import React, { Component } from 'react';
import { Icon } from 'doraemon';
import { isLowerThanIe10 } from 'commonUtils';

let left = 0;
class Marquee extends Component {
  componentDidMount() {
    this.setIeMove();
  }

  setIeMove = () => {
    const lowerThanIe10 = isLowerThanIe10();

    if (!lowerThanIe10) {
      return;
    }

    const firstMarqueeText = document.getElementById('marquee-text-first');
    const nextMarqueeText = document.getElementById('marquee-text-next');


    this.moveTimer = window.setInterval(move, 5);

    function move() {
      left -= 1;
      if (left <= -1580) {
        left = 0;
      }

      firstMarqueeText.style.left = `${left}px`;
      nextMarqueeText.style.left = `${1580 + left}px`;
    }
  }

  componentWillUnmount() {
    if (this.moveTimer) {
      clearInterval(this.moveTimer);
    }
  }
  render() {
    return (
      <div className="marquee">
        <span className="title"> <Icon zcy type="tz-2" />
        重要通知
        </span>
        <span className="content">
          <span className="inner" id="marquee-inner">
            <span className="marquee-text" id="marquee-text-first">
            当前页面仅展示您通过政采云平台向各金融机构申请的借款信息，数据可能存在延迟，请以各金融机构数据为准，若您需还款请至您申请的贷款机构指定的还款方式进行还款。
            </span>
            <span className="marquee-text" id="marquee-text-next" style={{ left: 1580 }}>
            当前页面仅展示您通过政采云平台向各金融机构申请的借款信息，数据可能存在延迟，请以各金融机构数据为准，若您需还款请至您申请的贷款机构指定的还款方式进行还款。
            </span>
          </span>
        </span>
      </div>
    );
  }
}

export default Marquee;
