import React, { Component } from 'react';
import { Select } from 'doraemon';

const { Option } = Select;

/**
 * label + select的组合
 */
export default class CombineSelects extends Component {
  constructor(props) {
    super(props);

    const { value = {} } = props;

    this.state = { ...value };
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


  onSelectChange=(value, field) => {
    this.setState({
      [field]: value,
    });


    this.trigger({
      [field]: value,
    });
  }


  render() {
    const { config } = this.props;


    return config.map((select) => {
      const { name, field, options = [] } = select;
      return (
        <div key={field} style={{ display: 'inline-block' }}>
          <div style={{ display: 'inline-block', paddingRight: '20px' }} >
            <span style={{ padding: '0 10px' }}>
              {name}
            </span>
          </div>
          <Select
            placeholder="请选择"
            data-name={field}
            style={{ width: '172px' }}
            value={this.state[field]}
            onChange={
              (value) => { this.onSelectChange(value, field); }
            }
          >
            {
              options.map(({ value, label }) => {
                return (
                  <Option value={value} key={value}>
                    {label}
                  </Option>
                );
              })
            }
          </Select>
        </div>
      );
    });
  }
}

CombineSelects.defaultProps = {
  config: [],
};
