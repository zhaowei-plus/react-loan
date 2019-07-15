import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { routerRedux } from 'dva/router';

import {
  Spin,
  Panel,
  Row,
  Col,
  ZcyBreadcrumb,
  Form,
} from 'doraemon';
import { connect } from 'dva';
import { formatNumber, getRelevantName, transformPercent } from 'commonUtils';
import { FROM_ITEM_LAYOUT_8, PROJECT_PHASE, APPLY_STATUS, PROJECT_SOURCE } from 'common/constants';
import AgreementInfoModal from 'common/modal/AgreementInfoModal';
import { CARD_TYPE } from '../component/typeConstants';

import './index.less';

const { Item } = Form;

@connect(({ loading, contractManage, loanProcess, loanBusinessManage }) => ({
  contractManageDetail: contractManage.contractManageDetail,
  synthesisDetail: loanProcess.synthesisDetail,
  workbenchDetail: loanProcess.workbenchDetail,
  businessDetail: loanBusinessManage.businessDetail,
  detailLoading: loading.effects['contractManage/getContractDetail'] || loading.effects['loanProcess/getSynthesisDetail'] || loading.effects['loanProcess/getWorkbenchDetail'] || loading.effects['loanBusinessManage/getBusinessDetail'],
}))
export default class CommonLoanView extends Component {
  constructor(props) {
    super(props);
    const { params, path } = props.match;
    const { id } = params;
    this.id = id;
    this.detailType = this.getDetailType(path);
    this.state = {
      showAgreementModal: false, // 协议内容模块
      configInfo: this.getConfigInfo(this.detailType),
    };
  }

  componentDidMount() {
    this.getDetailData(this.id);
  }

  componentWillReceiveProps(nextProps) {
    const { configInfo = {} } = this.state;
    const detailDataType = configInfo.detailDataType;
    if (nextProps[detailDataType] !== this.props[detailDataType]) {
      const newConfigInfo = { ...configInfo, detailData: nextProps[detailDataType] };
      this.setState({
        configInfo: newConfigInfo,
      });
    }
  }

  componentWillUnmount() {
    const { configInfo } = this.state;
    this.props.dispatch({
      type: configInfo.clearType,
      payload: {},
    });
  }

  // 获取当前详情页类型
  getDetailType=(path) => {
    let detailType = '';
    const isContract = path.indexOf('contract') > -1;// 合同管理详情页
    const isSynthesis = path.indexOf('synthesis') > -1;// 流程任务综合监控详情页
    const isWorkbench = path.indexOf('workbench') > -1;// 流程任务工作台监控详情页
    const isBusiness = path.indexOf('business') > -1;// 交易中心/贷款业务管理详情页
    if (isContract) { // 合同管理详情页
      detailType = 'CONTRACT';
    } else if (isSynthesis) { // 流程任务综合监控详情页
      detailType = 'SYNTHESIS';
    } else if (isWorkbench) { // 流程任务工作台监控详情页
      detailType = 'WORKBENCH';
    } else if (isBusiness) {
      detailType = 'BUSINESS'; // 交易中心/贷款业务管理详情页;
    }
    return detailType;
  }

  // 获得不同详情页下的信息
  getConfigInfo= (detailType) => {
    const configInfo = {};

    configInfo.globalBtn = [{
      label: '返回',
      onClick: this.goBack,
    }];
    const { contractManageDetail,
      synthesisDetail,
      workbenchDetail,
      businessDetail,
    } = this.props;

    /**
     * detailType
     * 'CONTRACT': 合同详情
     * 'SYNTHESIS': 流程任务综合监控详情
     * 'WORKBENCH': 流程任务工作台监控详情
     * 'BUSINESS': 贷款申请详情
     */
    switch (detailType) {
    case 'CONTRACT':
      configInfo.type = 'contractManage/getContractDetail';
      configInfo.clearType = 'contractManage/contractManageDetail';
      configInfo.detailData = contractManageDetail;
      configInfo.detailDataType = 'contractManageDetail';
      configInfo.routes = [{
        label: '合同管理',
      }, {
        label: '详情',
      }];
      configInfo.title = '合同管理详情';
      break;
    case 'SYNTHESIS':
      configInfo.type = 'loanProcess/getSynthesisDetail';
      configInfo.clearType = 'loanProcess/synthesisDetail';
      configInfo.detailData = synthesisDetail;
      configInfo.detailDataType = 'synthesisDetail';
      configInfo.routes = [{
        label: '流程任务综合监控',
      }, {
        label: '详情',
      }];
      configInfo.title = '流程任务综合监控详情';
      break;
    case 'WORKBENCH':
      configInfo.type = 'loanProcess/getWorkbenchDetail';
      configInfo.clearType = 'loanProcess/workbenchDetail';
      configInfo.detailData = workbenchDetail;
      configInfo.detailDataType = 'workbenchDetail';
      configInfo.routes = [{
        label: '流程任务工作台监控',
      }, {
        label: '详情',
      }];
      configInfo.title = '流程任务工作台监控详情';
      break;
    case 'BUSINESS':
      configInfo.type = 'loanBusinessManage/getBusinessDetail';
      configInfo.clearType = 'loanBusinessManage/businessDetail';
      configInfo.detailData = businessDetail;
      configInfo.detailDataType = 'businessDetail';
      configInfo.routes = [{
        label: '贷款业务查询',
      }, {
        label: '贷款申请',
      }, {
        label: '详情',
      }];
      configInfo.title = '贷款申请记录详情';
      break;
    default:
      break;
    }
    return configInfo;
  }

  // 调用接口获得详情页数据
  getDetailData=(id) => {
    const { configInfo = {} } = this.state;
    this.props.dispatch({
      type: configInfo.type,
      payload: { id },
    });
  }

  goBack=() => {
    const { params } = this.props.match;
    const { type } = params;
    if (type) {
      this.props.dispatch(routerRedux.push('/loan-business-manage/list'));
    } else {
      this.props.history.goBack();
    }
  }

  // 打开协议内容
  handleClickAgreement=() => {
    const { showAgreementModal } = this.state;
    this.setState({
      showAgreementModal: !showAgreementModal,
    });
  }

  render() {
    const { detailLoading = false } = this.props;
    const { showAgreementModal, configInfo = {} } = this.state;
    const detailData = configInfo.detailData || {};
    const {
      customerInfo = {},
      projectInfo = {},
      applyInfo = {},
      estimateInfo = {},
      approveInfo = {},
      type,
    } = detailData;

    const routes = configInfo.routes;
    const globalBtn = configInfo.globalBtn;
    const title = configInfo.title;

    return (
      <Spin spinning={detailLoading}>
        <ZcyBreadcrumb
          routes={routes}
          globalBtn={globalBtn}
        />
        <Panel className="contract-manage-detail" title={title}>
          <div className="panel-sub-title">客户基本信息</div>
          <Row gutter={24} className="info-padding">
            <Row >
              <Col span={12}>
                <Item {...FROM_ITEM_LAYOUT_8} label="客户名称" >
                  {customerInfo.customerName || '-'} <br />
                  <Link to={`/customer/view/${customerInfo.customerId}`}>查看客户资料</Link>
                </Item>
              </Col>
              <Col span={12}>
                <Item {...FROM_ITEM_LAYOUT_8} label="客户类型" >
                  {customerInfo.customerType || '-'}
                </Item>
              </Col>
            </Row>
            <Col span={12}>
              <Item {...FROM_ITEM_LAYOUT_8} label="证件类型" >
                {getRelevantName(customerInfo.cardType, CARD_TYPE)}
              </Item>
            </Col>
            <Col span={12}>
              <Item {...FROM_ITEM_LAYOUT_8} label="证件号码" >
                {customerInfo.cardNo || '-'}
              </Item>
            </Col>
          </Row>
          <div className="panel-sub-title">项目基本信息</div>
          <Row gutter={24} className="info-padding">
            <Row>
              <Col span={12}>
                <Item {...FROM_ITEM_LAYOUT_8} label="贷款申请编号" >
                  {projectInfo.applyCode || '-'}
                </Item>
              </Col>
              <Col span={12}>
                <Item {...FROM_ITEM_LAYOUT_8} label="执行人" >
                  {projectInfo.executor || '-'}
                </Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Item {...FROM_ITEM_LAYOUT_8} label="项目名称" >
                  {projectInfo.projectName || '-'}
                </Item>
              </Col>
              <Col span={12}>
                <Item {...FROM_ITEM_LAYOUT_8} label="渠道名称" >
                  {projectInfo.channelName || '-'}
                </Item>
              </Col>
            </Row>
            <Col span={12}>
              <Item {...FROM_ITEM_LAYOUT_8} label="项目阶段" >
                {getRelevantName(projectInfo.projectStatus, PROJECT_PHASE)}
              </Item>
            </Col>
            <Col span={12}>
              <Item {...FROM_ITEM_LAYOUT_8} label="渠道产品名称" >
                {projectInfo.channelProductName || '-'}<br />
                <Link to={`/product-release/view/${projectInfo.productId}`}>查看产品详情</Link>
              </Item>
            </Col>
            <Col span={12}>
              <Item {...FROM_ITEM_LAYOUT_8} label="项目申请来源" >
                {getRelevantName(projectInfo.projectSource, PROJECT_SOURCE)}
              </Item>
            </Col>
            <Col span={12}>
              <Item {...FROM_ITEM_LAYOUT_8} label="渠道产品代码" >
                {projectInfo.channelProductCode || '-'}
              </Item>
            </Col>
            <Col span={12}>
              <Item {...FROM_ITEM_LAYOUT_8} label="项目开始时间" >
                {projectInfo.startTime || '-'}
              </Item>
            </Col>
            <Col span={12}>
              <Item {...FROM_ITEM_LAYOUT_8} label="渠道产品编号" >
                {projectInfo.channelProductNo || '-'}
              </Item>
            </Col>
            <Col span={12}>
              <Item {...FROM_ITEM_LAYOUT_8} label="项目结束时间" >
                {projectInfo.endTime || '-'}
              </Item>
            </Col>
          </Row>
          <div className="panel-sub-title">贷款申请信息</div>
          <Row gutter={24} className="info-padding">
            <Row>
              <Col span={12}>
                <Item {...FROM_ITEM_LAYOUT_8} label="申请时间" >
                  {applyInfo.time || '-'}
                </Item>
              </Col>
              <Col span={12}>
                <Item {...FROM_ITEM_LAYOUT_8} label="贷款申请人电话" >
                  {applyInfo.phoneNo || '-'}
                </Item>
              </Col>
              <Col span={12}>
                <Item {...FROM_ITEM_LAYOUT_8} label="申请贷款金额(元)" >
                  <span className="money-color">{formatNumber(applyInfo.amount)}</span>
                </Item>
              </Col>
              <Col span={12}>
                <Item {...FROM_ITEM_LAYOUT_8} label="在线发起人" >
                  {applyInfo.onlineInitiator || '-'}
                </Item>
              </Col>
              <Col span={12}>
                <Item {...FROM_ITEM_LAYOUT_8} label="贷款申请人证件号" >
                  {applyInfo.cardNo || '-'}
                </Item>
              </Col>
              <Col span={12}>
                <Item {...FROM_ITEM_LAYOUT_8} label="在线发起人电话" >
                  {applyInfo.onlinePhoneNo || '-'}
                </Item>
              </Col>
              <Col span={12}>
                <Item {...FROM_ITEM_LAYOUT_8} label="贷款申请人" >
                  {applyInfo.applicant || '-'}
                </Item>
              </Col>
            </Row>
            {/*
              type
              1: 流水贷
              2: 合同贷
            */}
            {
              type === 2 ? (
                <Fragment>
                  <Row>
                    <Col span={12}>
                      <Item {...FROM_ITEM_LAYOUT_8} label="中标项目编号" >
                        {applyInfo.bidProjectCode || '-'}
                      </Item>
                    </Col>
                    <Col span={12}>
                      <Item {...FROM_ITEM_LAYOUT_8} label="中标项目名称" >
                        {applyInfo.bidProjectName || '-'}
                      </Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Item {...FROM_ITEM_LAYOUT_8} label="中标总金额(元)" >
                        <span className="money-color">{formatNumber(applyInfo.bidTotalAmount)}</span>
                      </Item>
                    </Col>
                  </Row>
                </Fragment>
              ) : null
            }
          </Row>

          <div className="panel-sub-title">额度测算信息</div>
          <Row gutter={24} className="info-padding">
            <Col span={12}>
              <Item {...FROM_ITEM_LAYOUT_8} label="测算时间" >
                {estimateInfo.time || '-'}
              </Item>
            </Col>
            <Col span={12}>
              <Item {...FROM_ITEM_LAYOUT_8} label="测算结果" >
                {estimateInfo.result === 1 ? '通过' : (estimateInfo.result === 0 ? '不通过' : '-')}
              </Item>
            </Col>
            <Col span={12}>
              <Item {...FROM_ITEM_LAYOUT_8} label="测算结果金额(元)" >
                <span className="money-color">{formatNumber(estimateInfo.resultAmount)}</span>
              </Item>
            </Col>
            <Col span={12}>
              <Item {...FROM_ITEM_LAYOUT_8} label="测算贷款利率(%)" >
                {transformPercent(estimateInfo.annualizedRate)}
              </Item>
            </Col>
            <Col span={12}>
              <Item {...FROM_ITEM_LAYOUT_8} label="备注" >
                {estimateInfo.remark || '-'}
              </Item>
            </Col>
            <Col span={12}>
              <Item {...FROM_ITEM_LAYOUT_8} label="测算总额度(元)" >
                <span className="money-color">{formatNumber(estimateInfo.totalAmount)}</span>
              </Item>
            </Col>
          </Row>
          <div className="panel-sub-title">合同信息</div>
          <Row gutter={24} className="info-padding">
            <Col span={12}>
              <Item {...FROM_ITEM_LAYOUT_8} label="协议名称" >
                <a onClick={this.handleClickAgreement}>政采云融资信息服务协议</a>
              </Item>
            </Col>
          </Row>
          <div className="panel-sub-title">贷款审批信息</div>
          <Row gutter={24} className="info-padding">
            <Col span={12}>
              <Item {...FROM_ITEM_LAYOUT_8} label="申请状态" >
                {getRelevantName(approveInfo.applyStatus, APPLY_STATUS)}
              </Item>
            </Col>
            <Col span={12}>
              <Item {...FROM_ITEM_LAYOUT_8} label="贷款合同编号" >
                {approveInfo.contractCode || '-'}
              </Item>
            </Col>
            <Col span={12}>
              <Item {...FROM_ITEM_LAYOUT_8} label="审批产品名称" >
                {approveInfo.productName || '-'}
              </Item>
            </Col>
            <Col span={12}>
              <Item {...FROM_ITEM_LAYOUT_8} label="审批完成时间" >
                {approveInfo.time || '-'}
              </Item>
            </Col>
            <Col span={12}>
              <Item {...FROM_ITEM_LAYOUT_8} label="审批额度(元)" >
                <span className="money-color">{formatNumber(approveInfo.amount)}</span>
              </Item>
            </Col>
            <Col span={12}>
              <Item {...FROM_ITEM_LAYOUT_8} label="审批结果" >
                {approveInfo.result === 1 ? '通过' : (approveInfo.result === 0 ? '不通过' : '-')}
              </Item>
            </Col>
            <Col span={12}>
              <Item {...FROM_ITEM_LAYOUT_8} label="贷款年化利率(%)" >
                {transformPercent(approveInfo.annualizedRate)}
              </Item>
            </Col>
            <Col span={12}>
              <Item {...FROM_ITEM_LAYOUT_8} label="审批意见" >
                {approveInfo.remark || '-'}
              </Item>
            </Col>
          </Row>
        </Panel>
        {
          showAgreementModal ? (
            <AgreementInfoModal
              visible={showAgreementModal}
              onCancel={this.handleClickAgreement}
            />
          ) : null
        }
      </Spin>
    );
  }
}
