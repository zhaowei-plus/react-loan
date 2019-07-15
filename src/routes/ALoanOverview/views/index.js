import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Panel, ZcyOverviewCount, Icon, Tooltip, Row, Col, Table, message, Modal } from 'doraemon';
import { formatDateToLocal, formatThousandsSeparator } from 'commonUtils';

import LineChart from '../component/LineChart';
import ChartStatistic from '../component/ChartStatistic';
import NowTime from '../component/Time';


import './index.less';

const { ZcySwiper } = ZcyOverviewCount;


const CHARTS_NAME = [
  {
    value: 'loanApply',
    label: '贷款申请（笔）',
  },
  {
    value: 'loanApplyAmount',
    label: '贷款申请总额（元）',
    moneyNumber: true,
  },
  {
    value: 'planAmount',
    label: '预计收入（元）',
    moneyNumber: true,
  },
  {
    value: 'addUser',
    label: '新增客户（位）',
  },
  {
    value: 'loanNum',
    label: '贷款成功（笔）',
  },
  {
    value: 'lendAmount',
    label: '放款总额（元）',
    moneyNumber: true,
  },
  {
    value: 'paidAmount',
    label: '已收收入（元）',
    moneyNumber: true,
  },
  {
    value: 'activeUser',
    label: '活跃用户（位）',
  },
];

@connect(({ loading, adminLoanOverview, privileges }) => ({
  loading: loading.models.adminLoanOverview,
  statistics: adminLoanOverview.statistics,
  weekData: adminLoanOverview.weekData,
  applyList: adminLoanOverview.applyList,
  privileges: privileges['/admin-loan-overview'],
}))
export default class AdminLoanOverview extends Component {
  state = {
    dataVisible: true,
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'adminLoanOverview/getStatistics',
      payload: {},
    });

    this.props.dispatch({
      type: 'adminLoanOverview/getWeekData',
      payload: {},
    });

    this.props.dispatch({
      type: 'adminLoanOverview/getApplyList',
      payload: {},
    });
  }

  toggleDataVisible = () => {
    this.setState(({ dataVisible }) => ({
      dataVisible: !dataVisible,
    }));
  };


  clearTestData=() => {
    Modal.confirm({
      title: '确定清除测试数据吗',
      content: '',
      onOk: () => {
        return new Promise((resolve, reject) => {
          this.props.dispatch({
            type: 'adminLoanOverview/clearTest',
          })
            .then((res) => {
              message.destroy();
              if (res.success) {
                resolve();
                message.success('清除成功');
                return;
              }
              reject();
              message.error(res.error || '清除失败');
            }, (res) => {
              reject(res);
              message.destroy();
              message.error(res.error || '清除失败');
            });
        });
      },
    });
  }
  fixDataShow = (data) => {
    const { dataVisible } = this.state;

    const formatData = data ? formatThousandsSeparator(data, 0) : '-';

    if (!dataVisible) {
      return '***';
    }
    return formatData;
  };

  render() {
    const {
      statistics = {}, weekData = {}, applyList = {
        data: [],
      },
      privileges = {},
    } = this.props;

    const { dataVisible } = this.state;
    const extra = (
      <Fragment>
        <NowTime />
        {privileges.platformDelete && (
          <a onClick={this.clearTestData} style={{ padding: '0 5px' }}>
          清除测试数据
          </a>
        )}
      </Fragment>
    );


    const {
      potential = {},
      loaning = {},
      waitConfirm = {},
      repayment = {},
    } = statistics;
    const swiperProps = {
      data: [{
        title: (
          <span>
          潜在客户识别（位）
            <Tooltip title="成功发起贷款申请但无额度测算信息无贷款申请信息的客户">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        ),
        icon: 'kehufuwu',
        count: this.fixDataShow(potential.current),
        extends: (
          <div style={{ lineHeight: '42px' }}>
            累计{this.fixDataShow(potential.total)}
            <Link to="/marketing-manage/list" style={{ float: 'right' }}>详情&gt;</Link>
          </div>
        ),
      }, {
        title: (
          <span>
          贷款办理中（笔）
            <Tooltip title="贷款办理中的项目数">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        ),
        icon: 'weibiaoti5',
        count: this.fixDataShow(loaning.current),
        extends: (
          <div style={{ lineHeight: '42px' }}>
            累计{this.fixDataShow(loaning.total)}
            <Link to="/loan-business-manage/list?applyType=1&businessType=1"
              style={{ float: 'right' }}
            >详情&gt;
            </Link>
          </div>
        ),
      }, {
        title: (
          <span>
          待收服务费（笔）
            <Tooltip title="待收取服务费的笔数">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        ),
        icon: 'fuwufei',
        count: this.fixDataShow(waitConfirm.current),
        extends: (
          <div style={{ lineHeight: '42px' }}>
            累计{this.fixDataShow(waitConfirm.total)}
            <Link to="/service-charge/list" style={{ float: 'right' }}>详情&gt; </Link>
          </div>
        ),
      }, {
        title: (
          <span>
          还款中（笔）
            <Tooltip title="还款状态为还款中的借款记录">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        ),
        icon: 'daifangkuan',
        count: this.fixDataShow(repayment.current),
        extends: (
          <div style={{ lineHeight: '42px' }}>
            累计{this.fixDataShow(repayment.total)}
            <Link to="/loan-business-manage/list?&businessType=2&borrowType=1"
              style={{ float: 'right' }}
            >详情&gt;
            </Link>
          </div>
        ),
      },
      ],
    };


    const columns = [{
      title: '项目阶段',
      dataIndex: 'projectStage',
      key: 'projectStage',
    }, {
      title: '客户名称',
      dataIndex: 'supplierName',
      key: 'supplierName',
      render: (text) => {
        return text || '-';
      },
    }, {
      title: '流程名称',
      dataIndex: 'processName',
      key: 'processName',
      render: (text) => {
        return text || '-';
      },
    }, {
      title: '业务来源',
      dataIndex: 'source',
      key: 'source',
      render: (text) => {
        return text || '-';
      },
    }, {
      title: '接收时间',
      dataIndex: 'acceptTime',
      key: 'acceptTime',
      className: 'nowrap',
      render: (text) => {
        return formatDateToLocal(text);
      },
    }, {
      title: '执行人',
      dataIndex: 'dealName',
      key: 'dealName',
      render: (text) => {
        return text || '-';
      },
    }, {
      title: '项目起止时间',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (text, record) => {
        const { startTime, endTime } = record;

        return `${formatDateToLocal(startTime)}至${formatDateToLocal(endTime)}`;
      },
    }, {
      title: '流程状态',
      dataIndex: 'status',
      key: 'status',
    }];

    const dataSource = applyList.data || [];
    return (
      <Fragment>
        <Panel
          title={
            <span>
            数据统计
              <a onClick={this.toggleDataVisible}>
                <Icon
                  zcy
                  type={dataVisible ? 'yincang' : 'yincang1'}
                  style={{ padding: '0 5px', color: '#777' }}
                />
              </a>
            </span>
          }
          extra={extra}
        >
          <ZcySwiper {...swiperProps} />
          <div style={{ marginTop: '20px' }}>
            <span className="panel-sub-title">
               本周多维度数据
            </span>
            <Row gutter={24}>

              {
                CHARTS_NAME.map((chartName) => {
                  const { value, label, moneyNumber } = chartName;
                  const currentChartData = weekData[value] || {};

                  const { dataList = [], ...reset } = currentChartData;
                  return (
                    <Col span={8} key={value} style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                      <div className="chart-wrap">
                        <ChartStatistic
                          {...reset}
                          moneyNumber={moneyNumber}
                          title={label}
                          key={value}
                        />
                        <LineChart
                          line
                          moneyNumber={moneyNumber}
                          data={dataList || []}
                        />
                      </div>
                    </Col>
                  );
                })
              }

            </Row>
          </div>
        </Panel>
        <Panel
          title="最新贷款申请"
        >
          <Table
            dataSource={dataSource}
            columns={columns}
            rowKey={record => record.id}
            pagination={false}
          />
          <div style={{ textAlign: 'center', padding: '10px' }}>
            {
              applyList.total > 8 && <Link to="/loan-business-manage/list">查看全部（{applyList.total}）</Link>
            }
          </div>
        </Panel>
      </Fragment>
    );
  }
}
