import React, { Component, Fragment } from 'react';
import { Icon } from 'doraemon';

/**
 * 定位器
 */
export default class Locator extends Component {
  constructor(props) {
    super(props);

    const { location } = props;
    this.state = {
      activeTarget: location[0].target,
      visible: true,
    };

    this.currentTarget = location[0].target;
  }

  locationPosition = [];

  componentDidMount() {
    window.onscroll = this.handleScroll;
    this.calcLocationPosition();


    window.addEventListener('resize', this.calcLocationPosition);
  }

  calcLocationPosition = () => {
    const { location } = this.props;

    const locationPosition = location.map((item) => {
      const target = document.getElementById(item.target);

      return {
        target: item.target,
        top: target.offsetTop + (target.clientHeight / 2),
      };
    });


    this.locationPosition = locationPosition;
  }

  handleScroll = () => {
    /**
     * 手动点击锚点 不触发滚动计算
     */

    if (this.scrollByClick) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.scrollByClick = false;
      }, 300);
      return;
    }

    let find = false;
    /**
     * 当前锚点
     * 滚动高度大于上一个锚点的高度
     * 小于下一个锚点的高度
     */
    this.locationPosition.forEach((item) => {
      if (!find) {
        if (window.pageYOffset + 120 > item.top) {
          this.lastTarget = item.target;
        } else {
          this.currentTarget = this.lastTarget;
          find = true;
        }
      }
    });


    this.setState({
      activeTarget: this.currentTarget,
    });
  };

  handleClick = (target) => {
    this.setState({
      activeTarget: target,
    });

    this.scrollByClick = true;
    document.querySelector(`#${target}`)
      .scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
  };

  toggleLocator = () => {
    this.setState(({ visible }) => ({
      visible: !visible,
    }));
  };

  componentWillUnmount() {
    window.onscroll = null;

    window.removeEventListener('resize', this.calcLocationPosition);
  }

  render() {
    const { activeTarget, visible } = this.state;
    const { location = [] } = this.props;
    return (
      <div className="locator-wrap">
        {
          visible && (
            <Fragment>
              <div id="prod-config-locator">
                <h1 className="title">渠道产品配置</h1>
                <ul className="item-list">
                  {
                    location.map((item) => {
                      return (
                        <li
                          className={activeTarget === item.target ? 'item active' : 'item'}
                          key={item.target}
                          onClick={() => {
                            this.handleClick(item.target);
                          }}
                        >
                          <span
                            className={
                              activeTarget === item.target ?
                                'locator-mark active' :
                                'locator-mark'}
                          />
                          <a className="text">{item.name}</a>
                        </li>
                      );
                    })
                  }
                </ul>
              </div>
              <div className="triangle" />
            </Fragment>
          )}

        <Icon zcy type="mulu" onClick={this.toggleLocator} />
      </div>

    );
  }
}
