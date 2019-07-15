import React from 'react';
import { Icon } from 'doraemon';
import { formatNumber, formatThousandsSeparator } from 'commonUtils';

const dataFormat = (number, isMoney) => {
  if (isMoney) {
    return formatNumber(number);
  } else {
    return formatThousandsSeparator(number, 0);
  }
};

const ChartStatistic = (props = {}) => {
  /**
   * moneyNumber   数值类型是金额还是数量
   */
  const { current, percent, total, title, moneyNumber } = props;

  let fixedPercent = parseInt(percent, 10);

  const percentStatus = fixedPercent >= 0;

  fixedPercent = Math.abs(fixedPercent);

  return (
    <div style={{ textAlign: 'center', color: '#777', margin: '10px 0 20px 0 ' }}>
      本周{title}
      <h3 style={{ fontSize: '24px', fontWeight: 'BOLD', color: '#333' }}>

        {dataFormat(current, moneyNumber)}
      </h3>
      <div>
        累计{dataFormat(total, moneyNumber)}/相比上周
        <Icon type={percentStatus ? 'caret-up' : 'caret-down'} style={{ color: percentStatus ? '#ff780f' : '#2dc12d', fontSize: '12px' }} />{fixedPercent}%
      </div>
    </div>
  );
};
export default ChartStatistic;
