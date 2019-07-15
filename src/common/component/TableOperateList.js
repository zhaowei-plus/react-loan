import React, { Fragment } from 'react';
import { DropList } from 'doraemon';
import { Link } from 'react-router-dom';

/**
 * 通过配置获取列表的操纵项
 * @param operationConfig
 * @returns {*}
 */
export default function TableOperateList(props) {
  const { operationConfig } = props;

  const getOperateDom = (itemConfig = {}) => {
    const { to, label, handleClick, target } = itemConfig;
    if (to) {
      return <Link to={to} style={{ paddingRight: '10px' }} target={target}>{label}</Link>;
    }
    if (handleClick) {
      return <a onClick={handleClick} style={{ paddingRight: '10px' }}>{label}</a>;
    }
  };

  if (operationConfig.length <= 2) {
    return (
      <Fragment>{
        operationConfig.map((itemConfig) => {
          return getOperateDom(itemConfig);
        })
      }
      </Fragment>
    );
  }

  if (operationConfig.length > 2) {
    const [firstConfig, ...resetConfig] = operationConfig;
    return (
      <Fragment>
        {getOperateDom(firstConfig)}
        <DropList
          itemList={resetConfig}
        >
          <a>更多</a>
        </DropList>
      </Fragment>
    );
  }
}
