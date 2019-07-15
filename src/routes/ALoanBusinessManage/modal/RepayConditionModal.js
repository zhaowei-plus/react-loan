import React, { Component, Fragment } from 'react';
import {
  Spin,
  Modal,
  Button,
  Table,
  Row,
  Col,
} from 'doraemon';
import { connect } from 'dva';
import { formatNumber, getRelevantName, transformPercent, validationNumber } from 'commonUtils';
import { REPAY_STATUS } from 'common/constants';
import './index.less';

@connect(({ loading, loanBusinessManage }) => ({
  repayConditionList: loanBusinessManage.repayConditionList,
  repayConditionLoading: loading.effects['loanBusinessManage/getRepayConditionList'],
}))
export default class RepayConditionModal extends Component {
  componentDidMount() {
    this.getRepayConditionList();
  }

  // 获得还款情况列表
  getRepayConditionList=() => {
    const { borrowRecordInfo = {} } = this.props;
    const { loanCode } = borrowRecordInfo;
    this.props.dispatch({
      type: 'loanBusinessManage/getRepayConditionList',
      payload: {
        loanCode,
      },
    });
  }

  getColumns=() => {
    const columns = [
      {
        title: '期数',
        dataIndex: 'currentPeriod',
        key: 'currentPeriod',
        width: 50,
        render: (text, record) => (
          record.currentPeriod || '-'
        ),
      }, {
        title: '借款本金余额(元)',
        dataIndex: 'restAmount',
        key: 'restAmount',
        className: 'money nowrap',
        width: 120,
        align: 'right',
        render: (text, record) => {
          return formatNumber(record.restAmount);
        },
      }, {
        title: '起止时间',
        dataIndex: 'startEndTime',
        key: 'startEndTime',
        width: 150,
        render: (text, record) => (
          <span>{record.startTime || '-'} 至 {record.endTime || '-'}</span>
        ),
      }, {
        title: '应还款信息',
        dataIndex: 'shouldRepaymentInfo',
        key: 'shouldRepaymentInfo',
        width: 220,
        render: (text, record) => {
          const { shouldRepaymentInfo } = record;
          const {
            date,
            interest,
            overdueInterest,
            overdueAmount,
            penalty,
            principal,
            totalAmount,
          } = shouldRepaymentInfo;
          return (
            <Fragment>
              <p className="money-color"><span className="list-sub-title">应还本金(元): </span>
                {formatNumber(principal)}
              </p>
              <p className="money-color"><span className="list-sub-title">应还利息(元): </span>{formatNumber(interest)}</p>
              <p className="money-color"><span className="list-sub-title">应还总额(元): </span>{formatNumber(totalAmount)}</p>
              <p><span className="list-sub-title">应还日期: </span>{date || '-'}</p>
              <p className="money-color"><span className="list-sub-title">违约金(元): </span>{formatNumber(penalty)}</p>
              <p className="money-color"><span className="list-sub-title">逾期金额(元): </span>{formatNumber(overdueAmount)}</p>
              <p><span className="list-sub-title">逾期罚息(%): </span>{transformPercent(overdueInterest)}</p>
            </Fragment>
          );
        },
      }, {
        title: '实还款信息',
        dataIndex: 'realRepaymentInfo',
        key: 'realRepaymentInfo',
        width: 250,
        render: (text, record) => {
          const { realRepaymentInfo } = record;
          const {
            account,
            date,
            interest,
            principal,
            totalAmount,
          } = realRepaymentInfo;
          return (
            <Fragment>
              <p className="money-color"><span className="list-sub-title">实还本金(元): </span>
                {formatNumber(principal)}
              </p>
              <p className="money-color"><span className="list-sub-title">实还利息(元): </span>{formatNumber(interest)}</p>
              <p className="money-color"><span className="list-sub-title">实还总额(元): </span>{formatNumber(totalAmount)}</p>
              <p><span className="list-sub-title">实还日期: </span>{date || '-'}</p>
              <p><span className="list-sub-title">还款账号: </span>{account || '-'}</p>
            </Fragment>
          );
        },
      }, {
        title: '还款状态',
        dataIndex: 'repaymentStatus',
        key: 'repaymentStatus',
        width: 120,
        render: (text, record, index) => {
          const { repaymentStatus } = record;
          let className = '';
          /**
         * repaymentStatus
         * 1: 还款中
         * 2: 待还款
         * 3: 已还款 - 绿色
         * 4: 逾期中 - 红色
         * 5: 逾期已还款 - 绿色
         * 6: 提前还款 - 绿色
         * 7: 已终止 - 灰色
         * 所有未正常（在应还款日期）还款的还款状态都标红
         */
          switch (repaymentStatus) {
          case 1:
          case 2:
            className = 'blue';// 蓝色
            break;
          case 3:
          case 5:
          case 6:
            className = 'green';// 绿色
            break;
          case 4:
            className = 'red';// 红色
            break;
          case 7:
            className = 'gray';// 灰色
            break;
          default:
            break;
          }
          const repayStatus = getRelevantName(repaymentStatus, REPAY_STATUS);
          return <span ref={index} className={className}>{repayStatus}</span>;
        },
      },
    ];
    return columns;
  }

  // 设置行类名
  setRowClassName=(record = {}) => {
    const { repaymentStatus } = record;
    let className = '';
    // 已还款成功的背景做置灰处理
    if ([3, 5, 6, 7].includes(repaymentStatus)) {
      className = 'special-row';
    }
    return className;
  }

  render() {
    const { visible,
      onCancel,
      repayConditionLoading,
      repayConditionList,
      borrowRecordInfo,
    } = this.props;
    const { loanInfo, repaymentInfo } = borrowRecordInfo;
    const { loanAmount, restAmount } = loanInfo;
    const { totalPeriod, restPeriod, totalAmount } = repaymentInfo;
    const columns = this.getColumns();

    return (
      <Modal
        title="还款情况"
        visible={visible}
        onCancel={onCancel}
        width={988}
        footer={
          <Button onClick={onCancel}>关闭</Button>
        }
      >
        <Row className="mb20">
          <Col span={6} className="money-color"><span className="list-sub-title">借款金额(元): </span>{formatNumber(loanAmount)}</Col>
          <Col span={6} className="money-color"><span className="list-sub-title">已还本金(元): </span>{formatNumber(totalAmount)}</Col>
          <Col span={6} className="money-color"><span className="list-sub-title">借款本金余额(元): </span>{formatNumber(restAmount)}</Col>
          <Col span={6} ><span className="list-sub-title">剩余期数/总期数: </span>{validationNumber(restPeriod)}/{validationNumber(totalPeriod)}</Col>
        </Row>
        <Spin spinning={repayConditionLoading}>
          <Table
            columns={columns}
            dataSource={repayConditionList}
            pagination={false}
            rowKey={(record => record.id)}
            scroll={{ y: 400 }}
            rowClassName={record => this.setRowClassName(record)}
          />
        </Spin>
      </Modal>
    );
  }
}
