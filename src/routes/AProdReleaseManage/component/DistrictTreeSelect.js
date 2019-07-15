import {
  MultiCascader,
} from 'doraemon';
import React from 'react';


const DistrictTreeSelect = (props) => {
  const { treeData = [], onChange, value, allowClear } = props;

  return (
    <MultiCascader
      placeholder="请选择"
      notFoundContent="无匹配结果"
      allowClear={!!allowClear}
      onChange={onChange}
      value={value}
      options={treeData}
      redundantValue
      style={{ width: '300px' }}
    />
  );
};


export default DistrictTreeSelect;
