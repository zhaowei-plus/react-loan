import React, { Component, Fragment } from 'react';
import { Input } from 'doraemon';
import CombineSelects from './CombineSelects';

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

  shouldComponentUpdate(nextProps, nextState) {
    const { max, min } = this.state;

    if (max === nextState.max && min === nextState.min) {
      return false;
    }

    return true;
  }


  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value || {};
      if (value.max !== this.state.max || value.min !== this.state.min) {
        this.setState({ ...value });
      }
    }
  }
  handleMinChange = (e) => {
    const min = e.target.value;

    if (!('value' in this.props)) {
      this.setState({ min });
    }
    this.triggerChange({ min });
  }
  handleMaxChange = (e) => {
    const max = e.target.value;

    if (!('value' in this.props)) {
      this.setState({ max });
    }
    this.triggerChange({ max });
  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }
  render() {
    const { size, style } = this.props;
    const state = this.state;
    return (
      <Fragment>
        <div style={style}>
          <Input
            type="text"
            size={size}
            value={state.min}
            onChange={this.handleMinChange}
            style={{ width: '35%', marginRight: '3%', display: 'inline-block' }}
            placeholder="请输入"

          />
         至
          <Input
            type="text"
            size={size}
            value={state.max}
            onChange={this.handleMaxChange}
            style={{ width: '35%', marginLeft: '3%', display: 'inline-block' }}
            placeholder="请输入"
          />
        </div>
      </Fragment>
    );
  }
}

CombineSelects.InputRange = {
  value: {},
};
