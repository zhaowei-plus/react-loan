const numFloat2Error = '请输入正确的数字(整数或最多两位小数)';
const numFloat4Error = '请输入正确的数字(整数或最多四位小数)';

const validateNumberFloat = (number, decimal = 2) => {
  const float2 = /^(([0-9]\d*)(\.\d{1,2})?)$|(0\.0?([1-9]\d?))$/;
  const float4 = /^(([0-9]\d*)(\.\d{1,4})?)$|(0\.0?([1-9]\d?))$/;

  const regexp = decimal === 4 ? float4 : float2;
  return regexp.test(number);
};

/**
 * 校验自定义还款周期
 * @param rule
 * @param value
 * @param callback
 */
export const validatorRepaymentCycle = (rule, value, callback) => {
  const { checked, input } = value;
  if (checked === 6) {
    if (!input) {
      callback('请输入还款周期');
      return;
    }

    if (!/^([0-9]\d*)$/.test(input)) {
      callback('请输入正确的还款周期天数');
      return;
    }

    if (parseInt(input, 10) === 0) {
      callback('请输入正确的还款周期天数');
      return;
    }
  }

  if (!checked) {
    callback('请选择还款周期');
    return;
  }

  callback();
};

/**
 * 校验逾期规则
 * @param rule
 * @param value
 * @param callback
 */
export const validatorOverDue = (rule, value, callback) => {
  const { checked, input } = value;
  if (checked === 2) {
    if (!input) {
      callback('请输入上浮比例');
      return;
    }

    if (!validateNumberFloat(input)) {
      callback(numFloat2Error);
      return;
    }
  }

  if (checked === 3) {
    if (!input) {
      callback('请输入固定利率');
    }
    if (!validateNumberFloat(input, 4)) {
      callback(numFloat4Error);
      return;
    }
  }

  if (!checked) {
    callback('请选择逾期规则');
    return;
  }
  callback();
};


/**
 * 校验违约规则
 * @param rule
 * @param value
 * @param callback
 */
export const validatorDefaultRepayment = (rule, value, callback) => {
  const { checked, input } = value;

  if (checked === 2) {
    if (!input) {
      callback('请输入收取比例');
      return;
    }

    if (!validateNumberFloat(input)) {
      callback(numFloat2Error);
      return;
    }
  }

  if (!checked) {
    callback('请选择提前还款违约金规则');
    return;
  }

  callback();
};

/**
 * 校验授信金额区间
 * @param rule
 * @param value
 * @param callback
 */
export const validatorCreditAmount = (rule, value, callback) => {
  const { min, max } = value;
  if (!min && parseInt(min, 2) !== 0) {
    callback('请输入区间下限');
    return;
  }
  if (!max) {
    callback('请输入区间上限');
    return;
  }

  if (!validateNumberFloat(min)) {
    callback(numFloat2Error);
    return;
  }

  if (!validateNumberFloat(max)) {
    callback(numFloat2Error);
    return;
  }

  if (parseFloat(min) >= parseFloat(max)) {
    callback('请输入正确的区间');
    return;
  }
  callback();
};

export const validatorChargeModel = (rule, value, callback) => {
  const { modelHead, modelYear } = value;
  if (!modelHead) {
    callback('请选择头尾模型');
    return;
  }

  if (!modelYear) {
    callback('请选择年模型');
    return;
  }
  callback();
};

