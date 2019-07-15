import React from 'react';
import { Row, Select, Checkbox, InputNumber, Tooltip, Icon } from 'doraemon';
import { formatNumber, filterFieldName, twoDecimal } from 'commonUtils';
import {
  BREACH_RULE,
  CHARGE_MODEL,
  OVERDUE_RATE,
  REPAYMENT_CYCLE,
  REPAYMENT_TYPE,
} from '../constant';


import {
  validatorChargeModel,
  validatorCreditAmount,
  validatorDefaultRepayment,
  validatorOverDue,
  validatorRepaymentCycle,
} from './validator';

import RadioInput from '../component/RadioInput';
import CombineSelects from '../component/CombineSelects';
import InputRange from '../component/InputRange';


const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

const MONTH_DAYS = [...Array(31)
  .keys()];

const getBaseInfoItemConfig = (resetProdDetail = {}) => {
  const fixRepaymentCycle = (repaymentCycle = {}) => {
    const { type, val } = repaymentCycle;

    return {
      checked: type,
      input: val,
    };
  };

  const fixChargeModel = () => {
    const { modelHead, modelYear } = resetProdDetail;
    return {
      modelHead,
      modelYear,
    };
  };

  const fixOverdue = (overdue = {}) => {
    const { type, rateNum } = overdue;

    return {
      checked: type,
      input: rateNum,
    };
  };

  const fixDefaultRepayment = (defaultRepayment = {}) => {
    const { type, rateNum } = defaultRepayment;

    return {
      checked: type,
      input: rateNum,
    };
  };

  const fixCreditAmount = () => {
    const { creditLeft, creditRight } = resetProdDetail;
    return {
      max: twoDecimal(creditRight),
      min: twoDecimal(creditLeft),
    };
  };


  return [{
    label: '还款方式',
    field: 'resetProdDetail.repayment',
    fullRow: true,
    rules: [{
      required: true, message: '请选择还款方式',
    }],
    initialValue: resetProdDetail.repayment,
    children: (
      <CheckboxGroup options={REPAYMENT_TYPE} />
    ),
    renderView: () => {
      const { repayment = [] } = resetProdDetail;

      const filteredRepayment = REPAYMENT_TYPE.filter((repaymentItem) => {
        return repayment.includes(repaymentItem.value);
      });

      const filteredName = filteredRepayment.map(item => item.label);
      return (
        <span>
          {filteredName.join('/')}
        </span>
      );
    },
  }, {
    label: '还款周期',
    field: 'resetProdDetail.repaymentCycle',
    fullRow: true,
    rules: [{
      required: true, message: '请选择还款周期',
    }, {
      validator: validatorRepaymentCycle,
    }],
    initialValue: fixRepaymentCycle(resetProdDetail.repaymentCycle),
    children: (
      <RadioInput radioConfig={REPAYMENT_CYCLE} />
    ),
    renderView: () => {
      const { repaymentCycle = {} } = resetProdDetail;

      const { type, val } = repaymentCycle;

      let cycleName = '';

      if (type === 6) {
        cycleName = `${val}天`;
      } else {
        [{
          label: cycleName,
        } = {}] = REPAYMENT_CYCLE.filter((item) => {
          return item.value === type;
        });
      }
      return (
        <span>
          {cycleName || '-'}
        </span>
      );
    },

  }, {
    label: '还款日',
    field: 'resetProdDetail.repaymentDay',
    fullRow: true,
    rules: [{
      required: true, message: '请选择还款日',
    }],
    initialValue: resetProdDetail.repaymentDay,
    children: (
      <Select placeholder="请选择">
        {MONTH_DAYS.map((item, index) => {
          const day = index;
          return (
            <Option value={day + 1} key={day + 1}>
              {day + 1}
            </Option>
          );
        })}
      </Select>
    ),
    renderView: () => {
      return (
        <span>
          {resetProdDetail.repaymentDay}
        </span>
      );
    },
  },
  {
    label: '模型设定',
    field: 'chargeModel',
    fullRow: true,
    rules: [{
      required: true, message: '请选择模型设定',
    }, {
      validator: validatorChargeModel,
    }],
    initialValue: fixChargeModel(resetProdDetail.chargeModel),
    children: (
      <CombineSelects config={CHARGE_MODEL} />
    ),
    renderView: () => {
      const { modelHead, modelYear } = resetProdDetail;

      const getFieldName = (filed, filedValue, filedStore) => {
        let name = '';
        filedStore.forEach((filedInfo) => {
          if (filedInfo.field === filed) {
            [{ label: name } = {}] = filedInfo.options.filter((item) => {
              return item.value === filedValue;
            });
          }
        });

        return name;
      };
      return (
        <span>
          <span style={{ padding: '0 10px' }} key="modelHead">
            头尾
          </span>
          {getFieldName('modelHead', modelHead, CHARGE_MODEL)}
          <span style={{ padding: '0 10px' }} key="modelYear">
            年模型
          </span>{getFieldName('modelYear', modelYear, CHARGE_MODEL)}
        </span>
      );
    },
  },
  {
    label: '逾期',
    field: 'resetProdDetail.overdue',
    fullRow: true,
    rules: [{
      required: true, message: '请选择逾期规则',
    }, {
      validator: validatorOverDue,
    }],
    initialValue: fixOverdue(resetProdDetail.overdue),
    children: (
      <RadioInput radioConfig={OVERDUE_RATE} />
    ),
    renderView: () => {
      const { overdue = {} } = resetProdDetail;

      const overdueName = filterFieldName(overdue.type, OVERDUE_RATE);

      // TODO 利率
      return (
        <span>
          {overdueName}{
            overdue.rateNum ? (
              <span>
                （{overdue.rateNum}%）
              </span>
            ) : null
          }
        </span>
      );
    },
  }, {
    label: '提前还款违约金',
    field: 'resetProdDetail.defaultRepayment',
    fullRow: true,
    rules: [{
      required: true, message: '请选择提前还款违约金规则',
    }, {
      validator: validatorDefaultRepayment,
    }],
    initialValue: fixDefaultRepayment(resetProdDetail.defaultRepayment),
    children: (
      <RadioInput radioConfig={BREACH_RULE} />
    ),
    renderView: () => {
      const { defaultRepayment = {} } = resetProdDetail;

      const { rateNum, type } = defaultRepayment;
      const defaultRepaymentName = filterFieldName(type, BREACH_RULE);

      // TODO 利率
      return (
        <span>
          {defaultRepaymentName}{
            rateNum ? (
              <span>
                （{rateNum}%）
              </span>
            ) : null
          }
        </span>
      );
    },
  }, {
    label: '授信金额区间（元）',
    field: 'creditAmount',
    fullRow: true,
    rules: [{
      required: true, message: '请输入授信金额区间',
    }, {
      validator: validatorCreditAmount,
    }],
    initialValue: fixCreditAmount(resetProdDetail.creditAmount),
    children: (
      <InputRange style={{ width: '300px' }} />
    ),
    renderView: () => {
      const { creditLeft, creditRight } = resetProdDetail;
      return (
        <span>
          {formatNumber(creditLeft)}-{formatNumber(creditRight)}
        </span>
      );
    },
  }, {
    label: (
      <span>
          申请限制（次）
        <Tooltip title="限制同供应商同一中标项目申请该渠道产品的次数">
          <Icon type="question-circle-o" />
        </Tooltip>
      </span>
    ),
    field: 'resetProdDetail.applyLimit',
    initialValue: resetProdDetail.applyLimit,
    fullRow: true,
    rules: [{
      required: true, message: '请输入申请限制',
    }],
    children: (
      <InputNumber
        placeholder="请输入"
        min={0}
        precision={0}
      />
    ),
    renderView: () => {
      return (
        <span>
          {resetProdDetail.applyLimit}
        </span>
      );
    },
  }];
};


/**
 * 基础信息
 * @param props
 * @returns {*}
 * @constructor
 */
const ProdBaseInfo = (props = {}) => {
  const { resetProdDetail, renderFormItem } = props;

  const formConfig = getBaseInfoItemConfig(resetProdDetail);
  return (
    <div id="base-info">
      <span className="panel-sub-title">
               基础信息
      </span>
      <Row>
        {
          renderFormItem(formConfig)
        }
      </Row>
    </div>
  );
};


export default ProdBaseInfo;
