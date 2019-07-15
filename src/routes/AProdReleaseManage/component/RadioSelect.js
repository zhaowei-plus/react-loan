import React, { Component, Fragment } from 'react';
import { Radio, Select } from 'doraemon';

const RadioGroup = Radio.Group;
const { Option } = Select;

/**
 *  Radio和Select的组合
 */
export default class RadioSelect extends Component {
  constructor(props) {
    super(props);

    const { value = {} } = props;

    this.state = {
      checked: value.checked,
      selected: value.selected,
    };
  }


  shouldComponentUpdate(nextProps, nextState) {
    const { checked, selected } = this.state;

    if (checked === nextState.checked && selected === nextState.selected) {
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


  onSelectChange=(selected) => {
    this.setState({
      selected,
    });

    this.trigger({
      selected,
    });
  }

  onRadioChange=(e) => {
    const checked = e.target.value;
    this.setState({
      checked,
    });


    this.trigger({
      checked,
    });
  }

  renderSelect=(currentRadio) => {
    const { checked, selected } = this.state;

    if (!currentRadio.withSelect) {
      return null;
    }

    const { value } = currentRadio;
    if (checked && checked === value) {
      return (
        <Fragment>
          <span style={{ paddingRight: '10px' }}>
            <Select value={selected} onChange={this.onSelectChange}>
              <Option value={1}>
                    1
              </Option>
            </Select>
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
                    this.renderSelect(radio)
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

RadioSelect.defaultProps = {
  radioConfig: [],
};
