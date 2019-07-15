import moment from 'moment';
import NP from 'number-precision';
import { Modal } from '@zcy/doraemon';
import qs from 'qs';

/** 精确到年月日/时分秒
 *  date: 时间戳
 * flag: true-精确到时分秒
 *        false- 精确到年月日
 *  */
export function formatDateToLocal(date, flag) {
  if (!date) {
    return '-';
  }
  if (flag) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  } else {
    return moment(date).format('YYYY-MM-DD');
  }
}

// 搜索时间范围,精确到时分秒
export function fixDateRequestParams(date, isEnd) {
  if (!date) {
    return '';
  }
  if (!isEnd) {
    return `${moment(date).format('YYYY-MM-DD')} 00:00:00`;
  } else {
    return `${moment(date).format('YYYY-MM-DD')} 23:59:59`;
  }
}


export function formatThousandsSeparator(s, n) {
  if (!s && s !== 0) {
    return '';
  }

  if (s === 0) {
    return 0;
  }

  let minus = false;
  /**
   * 兼容负数
   */
  if (s < 0) {
    minus = true;
    s = Math.abs(s);
  }
  n = n >= 0 && n <= 20 ? n : 2;
  /* eslint-disable no-useless-escape */
  s = `${parseFloat((`${s}`).replace(/[^\d\.-]/g, '')).toFixed(n)}`;

  s = `${parseFloat(s).toFixed(n)}`;
  const l = s.split('.')[0].split('').reverse();
  const r = s.split('.')[1];
  let t = '';
  /* eslint-disable no-plusplus */
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '');
  }
  /**
   * 兼容负数和整数
   */
  return `${minus ? '-' : ''}${t.split('').reverse().join('')}${r ? `.${r}` : ''}`;
}

// 格式化金额 1000000 ->  1000,000.00
export function formatNumber(num) {
  if (!num && num !== 0) {
    return '-';
  }
  if (isNaN(num)) {
    return '-';
  }
  // return num.toFixed(2).toLocaleString('en-us');
  return formatThousandsSeparator(num / 100, 2);
}

// 输入金额保留两位小数变成整数传给后台  100.25 -> 10025
export function becomeInteger(num) {
  // 需要保留两位小数,并乘以100

  num = NP.times(num, 100);
  num = NP.round(num, 0);
  return num;
}


export function twoDecimal(num) {
  if (!num && num !== 0 && num !== '0') {
    return '';
  }
  const result = NP.divide(num, 100);

  return NP.round(result, 2);
}

export function responseErrorHandle(res) {
  if (!res.success) {
    Modal.error({
      content: res.error,
    });
  }
}


export function normFile(e) {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
}


export const filterFieldName = (value, fieldStore = []) => {
  const [filtered = {}] = fieldStore.filter((field) => {
    return field.value === value;
  });

  return filtered.label;
};

// 获取type值对应的字符串
export function getRelevantName(type, totalInfo = []) {
  let name = '-';
  totalInfo.forEach((info) => {
    if (info.type === type) {
      name = info.name;
    }
  });
  return name;
}

// 若值为数字,则展示(包括0),若不是数字,则展示'-'
export function validationNumber(num) {
  if (!num && num !== 0) {
    return '-';
  }
  if (isNaN(num)) {
    return '-';
  }
  return num;
}

// 转化利率
export function transformPercent(num) {
  if (!num && num !== 0) {
    return '-';
  }
  if (isNaN(num)) {
    return '-';
  }
  return parseFloat(NP.divide(num, 10000)).toFixed(4);
}

// 格式化字符串类型
export function formatString(str) {
  if (!str) {
    return '-';
  }
  return str;
}

// 格式化银行账号，使用 '' 分隔
export function formatAmount(amount) {
  if (!amount) {
    return '-';
  }

  let rtn = '';
  const spaceCount = amount.length / 4;
  for (let i = 0; i < spaceCount; i += 1) {
    rtn += `${amount.substring(i * 4, (i * 4) + 4)} `;
  }
  return rtn.substring(0, rtn.length - 1);
}

/**
 * 金额保留两位小数，进一位
 * 12.00001 => 12.01
 * 12.351 => 12.36
 * @param money  金额
 * @param fractionDigits  保留小数位
 * @returns string
 */
export function fixFloatMoney(money = 0, fractionDigits = 0) {
  if (typeof money !== 'number') {
    money = Number(money);
  }

  if (Number.isNaN(money)) {
    money = 0;
  }
  /**
   * 取整的时候，有小数，整数进一
   */
  if (fractionDigits === 0) {
    const moneyInt = parseInt(money, 10);

    if (money > moneyInt) {
      return moneyInt + 1;
    }
  }

  /**
   * 保留小数位进一
   * @type {string}
   */
  const moneyString = money.toString();
  const [moneyIntPart, moneyFloatPart] = money.toString().split('.');
  /**
   * 是否是小数，不是小数，直接计算结果
   */
  if (!moneyString.includes('.')) {
    return money.toFixed(fractionDigits);
  }

  /**
   * 小数位比需要保留的位数小，直接计算结果
   */
  if (moneyFloatPart.length <= fractionDigits) {
    return money.toFixed(fractionDigits);
  }

  const resetMoneyFloatPart = moneyFloatPart.slice(fractionDigits, moneyFloatPart.length);
  const neededMoneyFloatPart = moneyFloatPart.slice(0, fractionDigits);


  let fixedMoney = `${moneyIntPart}.${neededMoneyFloatPart}`;
  /**
   * eg:保留两位小数
   * 12.00001 => 12.01
   * 12.351 => 12.36
   */
  if (Number(resetMoneyFloatPart) > 0) {
    // 如果有舍去的小数位，根据保留的小数位，最后一位小数，手动进一
    const fixFloat = NP.divide(1, 10 ** fractionDigits);

    fixedMoney = NP.plus(Number(fixedMoney), fixFloat);
  }

  return fixedMoney;
}
// 获得还款状态对应状态点
export function getRepayStatusPointColor(status) {
  let colorClass = '';
  switch (status) {
  case 1:// 还款中
  case 2:// 待还款
    colorClass = 'ant-badge-status-blue';
    break;
  case 3:// 已还款
  case 5:// 逾期已还款
  case 6:// 提前结清
    colorClass = 'ant-badge-status-green';
    break;
  case 4:// 逾期中
    colorClass = 'ant-badge-status-red';
    break;
  case 7:// 已终止
    colorClass = 'ant-badge-status-gray';
    break;
  default:
    break;
  }
  return colorClass;
}


export const getBrowserVersion = () => {
  const version = navigator.appVersion.split(';');
  const trimVersion = version[1] ? version[1].replace(/[ ]/g, '') : '';

  return trimVersion;
};
export const isLowerThanIe10 = () => {
  const version = getBrowserVersion();
  if (['MSIE9.0', 'MSIE8.0', 'MSIE7.0', 'MSIE6.0'].includes(version)) {
    return true;
  }

  return false;
};

// 拆分url中参数
export const getUrlSearchParams = (search = '') => {
  const searchParamsURL = search.substring(1);
  const urlSearchParams = qs.parse(searchParamsURL);
  return urlSearchParams || {};
};

// 重置合并表格单元格数据
export const mergeTableCellData = (data = [], field) => {
  if (!data || !data.length) {
    return [];
  }
  const repeatCounter = {};
  const marked = {};
  data.forEach((item) => {
    const itemField = item[field];
    repeatCounter[itemField] = repeatCounter[itemField] ? repeatCounter[itemField] += 1 : 1;
  });
  data.forEach((item) => {
    const itemField = item[field];
    if (repeatCounter[itemField] > 1) {
      item.numkit = marked[itemField] ? 0 : repeatCounter[itemField];
      marked[itemField] = true;
      return;
    }
    item.numkit = 1;
  });
  return data;
};


// 合并单元格
export const renderCell = (text, record) => {
  let fixedText;
  if (!text && text !== 0) {
    fixedText = '-';
  } else {
    fixedText = text;
  }
  return {
    children: fixedText,
    props: {
      rowSpan: record.numkit,
    },
  };
};

// 格式修复
export const FormatFix = {
  // 格式化金额
  formatMoney: (num) => {
    if (num === 0) {
      return '-';
    }
    return formatNumber(num);
  },
  // 格式化利率
  formatPercent: (num) => {
    if (num === 0) {
      return '-';
    }
    return transformPercent(num);
  },
};

