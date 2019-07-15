import React from 'react';
import { Checkbox } from 'doraemon';

const CheckboxGroup = Checkbox.Group;
const getLoanConditionItemConfig = ({ productCondition = [], loanCondition = [] }) => {
  const options = loanCondition.map(condition => ({
    label: condition.name,
    value: condition.id,
  }));

  const fixProductCondition = (conditions = []) => {
    return conditions.map(condition => condition.id);
  };
  return [{
    label: '',
    field: 'productCondition',
    fullRow: true,
    rules: [{
      required: true, message: '请选择贷款必备条件',
    }],
    initialValue: fixProductCondition(productCondition),
    children: (
      <CheckboxGroup options={options} />
    ),
    renderView: () => {
      return (
        <div>
          {productCondition.map((condition, index) => {
            return (
              <div key={condition.id}>
                {index + 1}.{condition.name}
              </div>
            );
          })}
        </div>
      );
    },
  }];
};

/**
 * 贷款必备条件
 * @param props
 * @returns {*}
 * @constructor
 */
const ProdLoanCondition = (props = {}) => {
  const { renderFormItem } = props;
  const config = getLoanConditionItemConfig(props);
  return (
    <div id="loan-condition">
      <span className="panel-sub-title" >
               贷款必备条件
      </span>
      <div className="loan-condition">
        {
          renderFormItem(config)
        }
      </div>
    </div>
  );
};

export default ProdLoanCondition;
