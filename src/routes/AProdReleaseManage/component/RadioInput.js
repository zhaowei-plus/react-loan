import React, { Component, Fragment } from 'react';
import { Radio, Input } from 'doraemon';

const RadioGroup = Radio.Group;

/**
 * RadioGroup和Input的组合
 */
export default class RadioInput extends Component {
  constructor(props) {
    super(props);

    const { value = {} } = props;

    this.state = {
      checked: value.checked,
      input: value.checked,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { checked, input } = this.state;

    if (checked === nextState.checked && input === nextState.input) {
      return false;
    }

    return true;
  }


  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const { value = {} } = nextProps;
      this.setState({
        ...value,
      });
    }
  }

  trigger = (changedValue) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange({
        ...this.state,
        ...changedValue,
      });
    }
  }


  onInputChange=(e) => {
    const input = e.target.value;

    this.setState({
      input,
    });

    this.trigger({
      input,
    });
  }

  onRadioChange=(e) => {
    const checked = e.target.value;
    this.setState({
      checked,
      input: undefined,
    });


    this.trigger({
      checked,
      input: undefined,
    });
  }

  renderInput=(currentRadio) => {
    const { checked, input } = this.state;

    if (!currentRadio.withInput) {
      return null;
    }

    const { suffix, value } = currentRadio;
    if (checked && checked === value) {
      return (
        <Fragment>
          <span style={{ paddingRight: '10px' }}>
            <Input value={input} onChange={this.onInputChange} /> {suffix}
          </span>
        </Fragment>
      );
    } else {
      return null;
    }
  }

  render() {
    const { radioConfig } = this.props;
    const { checked } = this.state;

    return (
      <Fragment>
        <RadioGroup onChange={this.onRadioChange} value={checked}>
          {
            radioConfig.map((radio) => {
              return (
                <Fragment key={radio.value}>
                  <Radio value={radio.value}>{radio.label}</Radio>
                  {
                    this.renderInput(radio)
                  }
                </Fragment>
              );
            })
          }
        </RadioGroup>

      </Fragment>
    );
  }
}

RadioInput.defaultProps = {
  radioConfig: [],
};
