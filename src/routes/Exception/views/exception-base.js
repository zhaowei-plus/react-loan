import React, { PureComponent } from 'react';
import debounce from 'lodash/debounce';
import './index.less';

export default class NotFound extends PureComponent {
  constructor(props) {
    super(props);
    const wrapHeight = this.getWrapHeigth();
    this.state = {
      wrapHeight,
      wrapPadding: (wrapHeight - 350) / 2,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', debounce(this.handleResize, 100, {
      maxWait: 300,
    }));
  }

  handleResize = () => {
    const wrapHeight = this.getWrapHeigth();
    this.setState({
      wrapHeight,
      wrapPadding: (wrapHeight - 350) / 2,
    });
  }

  getWrapHeigth = () => {
    const clientH = document.body.clientHeight;
    const wrapH = clientH - 52 - (15 * 2);
    return wrapH > 350 ? wrapH : 350;
  }

  render() {
    const { wrapHeight, wrapPadding } = this.state;
    const { children } = this.props;

    const wrapStyle = {
      height: wrapHeight,
      padding: `${wrapPadding}px 0`,
    };
    return (
      <div
        className="zcy-exception-wrap"
        style={wrapStyle}
      >
        {children}
      </div>
    );
  }
}
