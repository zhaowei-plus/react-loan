import React from 'react';
import { Row, Col, Form } from 'doraemon';
import { baseFormItemLayout, halfFormItemLayout } from 'common/constants';

import { formatNumber } from 'commonUtils';

const FormItem = Form.Item;

const renderFormItem = (config) => {
  return config.map((item) => {
    const { label, fullRow, renderView } = item;
    const layout = fullRow ? halfFormItemLayout : baseFormItemLayout;
    return (
      <Col span={fullRow ? 24 : 12} key={label}>
        <FormItem
          {...layout}
          label={label}
        >
          {renderView ? renderView() : '-'}
        </FormItem>
      </Col>
    );
  });
};

const getProdSummaryDataConfig = (statistics = {}) => {
  return [{
    label: '累计申请',
    rules: [],
    initialValue: '',
    renderView: () => {
      return (
        <span>{statistics.sumGrand}笔
          <span className="money">
          （¥{formatNumber(statistics.totalGrand)}）
          </span>
        </span>
      );
    },
  }, {
    label: '申请中',
    rules: [],
    initialValue: '',
    renderView: () => {
      return (
        <span>{statistics.sumApply}笔
          <span className="money">
           （¥{formatNumber(statistics.totalApply)}）
          </span>
        </span>
      );
    },
  }, {
    label: '待还',
    field: 'openDistrictCode',
    rules: [],
    initialValue: '',
    renderView: () => {
      return (
        <span>{statistics.sumRepayMent}笔
          <span className="money">
           （¥{formatNumber(statistics.totalRepayMent)}）
          </span>
        </span>
      );
    },
  }, {
    label: '累计收费',
    field: 'openDistrictCode',
    rules: [],
    initialValue: '',
    renderView: () => {
      return (
        <span>{statistics.sumToll}笔
          <span className="money">
           （¥{formatNumber(statistics.totalToll)}）
          </span>
        </span>
      );
    },
  }, {
    label: '已结清',
    field: 'openDistrictCode',
    rules: [],
    initialValue: '',
    renderView: () => {
      return (
        <span>{statistics.sumSettle}笔
          <span className="money">
          （¥{formatNumber(statistics.totalSettle)}）
          </span>
        </span>
      );
    },
  }];
};

/**
 * 产品基础数据
 * @param props
 * @returns {*}
 * @constructor
 */
const ProdDataSummary = (props) => {
  const { statistics = {} } = props;


  return (
    <div id="base-statistics">
      <span className="panel-sub-title" >
               基础数据
      </span>
      <Row>
        <div className="loan-condition">
          {
            renderFormItem(getProdSummaryDataConfig(statistics))
          }
        </div>
      </Row>
    </div>
  );
};

export default ProdDataSummary;
