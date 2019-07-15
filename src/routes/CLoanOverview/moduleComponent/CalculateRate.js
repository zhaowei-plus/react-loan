import React, { Component, Fragment } from 'react';
import {
  Panel,
  Row,
  Col,
  Form,
  InputNumber,
  Select,
  Icon,
  message,
} from 'doraemon';
import NP from 'number-precision';
import { formatThousandsSeparator, fixFloatMoney } from 'commonUtils';
import { baseFormItemLayout } from 'common/constants/';

import RateColumn from '../component/RateColumn';

import iconCalculator from '../image/icon-calculator.png';
import { OURS_RATE, BANK_RATE, ONLINE_RATE } from '../constant';


const { Item } = Form;
const { Option } = Select;

const calcTotalInterest = (amount, month, monthRate) => {
  // ((总贷款额÷还款月数+总贷款额×月利率)+总贷款额÷还款月数×(1+月利率))÷2×还款月数-总贷款额
  // 总贷款额÷还款月数
  const amountDivideDate = NP.divide(amount, month);
  // 总贷款额×月利率
  const loadAmountTimesRate = NP.times(amount, monthRate);
  // 总贷款额÷还款月数×(1+月利率)
  const amountDivideDateTimesRate = NP.times(amountDivideDate, 1 + monthRate);

  const totalAmount = NP.times(
    NP.divide((amountDivideDate + loadAmountTimesRate + amountDivideDateTimesRate), 2),
    month
  );

  return NP.minus(totalAmount, amount);
};


const getRateChartData = (amount, month) => {
  const oursProdCalcResult = calcTotalInterest(amount, month, OURS_RATE);
  const normalBankProdCalcResult = calcTotalInterest(amount, month, BANK_RATE);
  const onlineProdCalcResult = calcTotalInterest(amount, month, ONLINE_RATE);

  return [
    {
      product: '本产品',
      interest: oursProdCalcResult,
    },
    {
      product: '同类银行产品',
      interest: normalBankProdCalcResult,
    },
    {
      product: '网贷机构',
      interest: onlineProdCalcResult,
    },
  ];
};


@Form.create()
export default class CalculateRate extends Component {
  constructor(props) {
    super(props);

    const chartData = getRateChartData(100000, 1);
    const totalInterest = calcTotalInterest(100000, 1, OURS_RATE);

    this.state = {
      loanTotalMonth: 1,
      chartData,
      totalLoanCost: NP.plus(100000, totalInterest),
      totalInterest,
    };
  }


  calcLoanRate = () => {
    const { form } = this.props;

    form.validateFields((err, value) => {
      if (err) {
        message.destroy();
        message.warn('请输入正确的贷款金额和贷款期限');
        return;
      }


      const { loanAmount, loanTotalMonth } = value;

      if (!loanAmount || !loanTotalMonth) {
        message.destroy();
        message.warn('请输入贷款金额和贷款期限');
        return;
      }

      if (loanAmount > 10000) {
        message.destroy();
        message.warn('贷款金额超出上限');
        return;
      }
      const fixedLoanAmount = NP.times(loanAmount, 10000);
      const totalInterest = calcTotalInterest(fixedLoanAmount, loanTotalMonth, OURS_RATE);
      const totalLoanCost = NP.plus(fixedLoanAmount, totalInterest);
      const chartData = getRateChartData(fixedLoanAmount, loanTotalMonth);


      /**
       * 行为记录，使用信贷计算器
       */
      this.props.dispatch({
        type: 'productDetail/recordAction',
        payload: 3,
      });

      this.setState({
        loanTotalMonth,
        chartData,
        totalLoanCost,
        totalInterest,
      });
    });
  };


  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const {
      chartData,
      totalLoanCost,
      totalInterest,
      loanTotalMonth,
    } = this.state;

    return (
      <Panel>
        <Row className="calculate-rate" gutter={24}>
          <Col span={12} className="calculate-rate-panel">
            <Col offset={8}>
              <div className="calculate-title clearfix">
                <div className="calc-logo">
                  <img src={iconCalculator} alt="计算器" />
                </div>
                <div className="calc-slogan">
                  <h3>
                        费用测算
                  </h3>
                  <div>打造普惠金融服务，低息助力企业发展</div>
                </div>
              </div>
            </Col>
            <Form>
              <Item
                {...baseFormItemLayout}
                label="贷款金额"
              >
                <Fragment>
                  {
                    getFieldDecorator('loanAmount', {
                      rules: [{
                        pattern: /^(([0-9]\d*)(\.\d{1,2})?)$|(0\.0?([1-9]\d?))$/,
                        message: '请输入正确的金额(整数或保留两位小数)',
                      }],
                      initialValue: 10,
                    })(
                      <InputNumber placeholder="请输入" style={{ width: '220px' }} />
                    )
                  }
                  <span className="input-label">
                    万元
                  </span>
                </Fragment>

              </Item>
              <Item
                {...baseFormItemLayout}
                label="贷款期限"
              >
                <Fragment>

                  {
                    getFieldDecorator('loanTotalMonth', {
                      rules: [{
                        pattern: /^([0-9]\d*)$/,
                        message: '请输入1-60之间的整数',
                      }],
                      initialValue: 1,
                    })(
                      <InputNumber placeholder="请输入"
                        min={1}
                        max={60}
                        style={{ width: '220px' }}
                      />
                    )
                  }
                  <span
                    className="input-label"
                  >
                    月
                  </span>
                </Fragment>

              </Item>
            </Form>
            <Item
              {...baseFormItemLayout}
              label={
                <span>综合月费率</span>
              }
            >
              <Select defaultValue="最低（0.35%）" style={{ width: '220px' }} disabled>
                <Option value="最低（0.35%）">
                      最低（0.35%）
                </Option>
              </Select>

            </Item>
            <Item
              {...baseFormItemLayout}
              label="还款方式"
            >
                  等额本金

            </Item>
          </Col>
          <Col span={12} style={{ padding: '0 30px' }}>
            <div className="rate-column-title-wrap">
                  总费用（元）
              <h3 className="title">
                {formatThousandsSeparator(fixFloatMoney(totalInterest, 2))}
              </h3>
            </div>
            <div className="rate-column-title-wrap">
                  还款总额（元）
              <h3 className="title">
                {formatThousandsSeparator(fixFloatMoney(totalLoanCost, 2))}
              </h3>
            </div>
            <h4 className="chart-name">
                  息费对比图
            </h4>
            <RateColumn
              data={chartData}
            />

            <div className="notice">
              <span className="notice-info-icon">
                <Icon type="info" />
              </span>注意：以贷款{loanTotalMonth}个月，等额本金还款方式计算，具体以实际利率为准
            </div>
          </Col>
          <div className="calc-btn" onClick={this.calcLoanRate}>
            <div style={{ marginTop: '20px' }}>
                  开始
            </div>
            <div>
                  计算
            </div>
          </div>
        </Row>
      </Panel>
    );
  }
}
