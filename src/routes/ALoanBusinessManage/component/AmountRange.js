import React, { Component, Fragment } from 'react';
import { InputNumber } from 'doraemon';

/**
 * 金额区间组件
 */
export default class InputRange extends Component {
  constructor(props) {
    super(props);

    const value = this.props.value || {};
    this.state = {
      min: value.min,
      max: value.max,
    };
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value;
      if (!value) {
        this.setState({
          min: undefined,
          max: undefined,
        });
      } else {
        this.setState(value);
      }
    }
  }
  handleMinChange = (value) => {
    this.setState({ min: value });
  }
  handleMaxChange = (value) => {
    this.setState({ max: value });
  }
  // 失去焦点时将值传给父组件
  handleCompare = () => {
    this.props.onChange(this.state);
  };

  render() {
    const { min, max } = this.state;
    return (
      <Fragment>
        <InputNumber
          style={{ width: '105px', marginRight: '2px', display: 'inline-block' }}
          value={min}
          onChange={this.handleMinChange}
          placeholder="最小值"
          onBlur={this.handleCompare}
          min={0}
        />
            -
        <InputNumber
          style={{ width: '105px', marginLeft: '2px', display: 'inline-block' }}
          value={max}
          onChange={this.handleMaxChange}
          placeholder="最大值"
          onBlur={this.handleCompare}
          min={0}
        />
      </Fragment>
    );
  }
}
