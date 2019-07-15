import React, { Component, Fragment } from 'react';
import { Row, Col, Spin, Icon, Modal, Checkbox, message } from 'doraemon';
import { Link } from 'react-router-dom';
import { connect } from 'dva';
import AgreementInfoModal from 'common/modal/AgreementInfoModal';
import CompleteInfoModal from '../modal/CompleteInfoModal';
import BidItemListModal from '../modal/BidItemListModal';
import HelpCenter from '../../CLoanOverview/moduleComponent/HelpCenter';
import './index.less';

import process from '../image/process.png';


import conditionImgOne from '../image/condition_one.png';
import conditionImgTwo from '../image/condition_two.png';
import conditionImgThree from '../image/condition_three.png';
import indexOneImg from '../image/one_ gradient.png';
import indexTwoImg from '../image/two_ gradient.png';
import indexThreeImg from '../image/three_ gradient.png';

const DEFAULT_BANNER = 'https://sitecdn.zcycdn.com/f2e-assets/86b33a2f-f3e2-499e-994c-83e3bb828ba3.png?x-oss-process=image/quality,Q_75/format,jpg';
const CONDITION_IMG = [{
  bgImg: conditionImgOne,
  indexImg: indexOneImg,
  key: '1',
}, {
  bgImg: conditionImgTwo,
  indexImg: indexTwoImg,
  key: '2',
}, {
  bgImg: conditionImgThree,
  indexImg: indexThreeImg,
  key: '3',
}];
@connect(({ loading, productDetail }) => ({
  prodDetail: productDetail.prodDetail,
  loading: loading.models.productDetail,
}))
export default class ProductDetail extends Component {
  constructor(props) {
    super(props);


    this.state = {
      agreementVisible: false,
      completeInfoVisible: false,
      chooseBidItemModalVisible: false,
      confirm: true,
      agreed: false,
    };

    const { params = {} } = this.props.match;

    const { source, id } = params;

    this.source = source;
    this.id = id;
  }

  componentDidMount() {
    this.fetchProdDetail();
  }


  fetchProdDetail = () => {
    this.props.dispatch({
      type: 'productDetail/getProdDetail',
      payload: {
        method: 'get',
        params: {
          productId: this.id,
        },
      },
    });
  };


  /**
   * 申请额度测算
   * @param agreed  是否已同意协议
   */
  doMeasureCredit = (agreed) => {
    if (!agreed) {
      message.destroy();
      message.warn('请先阅读并同意《政采云融资信息服务协议》');
      return;
    }


    const { prodDetail } = this.props;
    /**
     * types
     * 1 流水贷
     * 2 合同贷
     */
    if (prodDetail.types === 2) {
      this.toggleChooseBidItemModal();
      return;
    }
    this.reqMeasureCredit();
  };


  reqMeasureCredit=(params = {}) => {
    /**
     * 行为记录，申请额度评测
     */
    this.props.dispatch({
      type: 'productDetail/recordAction',
      payload: 4,
    });

    this.props.dispatch({
      type: 'productDetail/measureCredit',
      payload: {
        productId: Number(this.id),
        source: Number(this.source),
        projectCode: this.selectedBidItemProjectCode,
        ...params,
      },
    })
      .then((res) => {
        /**
         * 测算成功，跳转到银行申请页面
         */
        if (res.success) {
          const { supplierInfoFull, url } = res.result;

          if (supplierInfoFull === 1) {
            if (url) {
              Modal.success({
                title: '温馨提示',
                content: '即将离开政采云进入贷款银行申请页，请点击"立即前往"继续申请',
                okText: '立即前往',
                onOk: () => {
                  window.open(url, '_blank');
                  /**
                   * 当前页展示弹窗loading
                   */
                  this.showLoanLoading();
                },
              });
            }
          } else {
            this.toggleCompleteInfoModal();
          }
        }
      });
  }

  showLoanLoading = () => {
    Modal.confirm({
      className: 'loan-loading-modal',
      content: (
        <div>
          正在贷款申请中
          <span className="loading-dotting" />
        </div>
      ),
      maskClosable: false,
      iconType: '',
      closable: false,
      okText: '完成申请',
      onCancel: this.fetchProdDetail,
      onOk: this.fetchProdDetail,
    });
  };

  /**
   * 同意协议，去测算
   */
  agreeAgreement = () => {
    const { modalTriggerType } = this.state;
    this.setState({
      agreementVisible: true,
      agreed: true,
    });
    /**
     * banner 触发的协议弹窗，确定之后直接发起测算
     */
    if (modalTriggerType === 'BANNER') {
      this.doMeasureCredit(true);
    }
  };

  /**
   * 点击banner触发的协议弹窗
   * 可直接点击弹窗内按钮申请测算
   */
  handleAgreementModal = () => {
    const { agreementVisible } = this.state;
    const { prodDetail } = this.props;

    if (!agreementVisible && prodDetail.isApply) {
      message.destroy();
      message.info('您已申请过该产品');
      return;
    }
    this.setState({
      agreementVisible: !agreementVisible,
      modalTriggerType: 'BANNER',
    });
  };

  /**
   * 点击同意协议checkbox
   * @param e
   */
  agreementCheckboxChange = (e) => {
    const { checked } = e.target;

    if (checked) {
      /**
       * 选择同意，先弹窗协议，弹窗内确定，同意协议CheckBox选中
       */
      this.setState({
        agreementVisible: checked,
        modalTriggerType: 'CHECKBOX',
      });
    } else {
      this.setState({
        agreed: checked,
      });
    }
  };

  /**
   * 点击协议名称 查看协议
   */
  readAgreementModal = () => {
    this.setState({
      agreementVisible: true,
      modalTriggerType: 'CHECKBOX',
    });
  }

  toggleCompleteInfoModal = () => {
    this.setState(({ completeInfoVisible }) => ({
      completeInfoVisible: !completeInfoVisible,
    }));

    // if (confirm === true) {
    //   this.doMeasureCredit(true);
    // }
  }

  toggleChooseBidItemModal = () => {
    this.setState(({ chooseBidItemModalVisible }) => ({
      chooseBidItemModalVisible: !chooseBidItemModalVisible,
    }));
  }

  onChooseBidItemConfirm = (projectCode) => {
    this.selectedBidItemProjectCode = projectCode;

    this.reqMeasureCredit({ projectCode });
  }

  render() {
    const { prodDetail = {}, loading } = this.props;

    const { condition = [], problem = [] } = prodDetail;

    const {
      agreementVisible,
      confirm,
      agreed,
      modalTriggerType,
      completeInfoVisible,
      chooseBidItemModalVisible,
    } = this.state;

    const confirmText = modalTriggerType === 'BANNER' ? '我已阅读并同意，去测算' : '';
    return (
      <Fragment>
        <div id="prod-detail">

          <Spin spinning={loading}>
            <div className="banner">
              <img
                src={prodDetail.bigImage || DEFAULT_BANNER}
                alt="政采云平台商户专享"
                style={{ width: '100%', minHeight: '200px', cursor: 'pointer' }}
                onClick={this.handleAgreementModal}
              />
            </div>
          </Spin>
          <Spin spinning={loading}>

            <div className="loan-apply">
              <h1 className="title">
                <Icon type="tongqian" zcy />
                最快 <span className="color">4</span> 步完成申请，不耽误您用钱<Icon type="tongqian" zcy />
              </h1>
              {
                prodDetail.note && (
                  <div>
                    注：{prodDetail.note}
                  </div>
                )
              }
              <div className="process">
                <img src={process} alt="申请流程" className="process-img" />
              </div>
              {
                prodDetail.isApply ? (
                  <h3 className="already-apply">
                    您已申请过该产品，<Link to="/cloan-apply-record"> 点击查看</Link>
                  </h3>
                ) : (
                  <Fragment>
                    <div className="agreement">
                      <Checkbox onChange={this.agreementCheckboxChange}
                        checked={agreed}
                        style={{ paddingRight: '5px' }}
                      />
                      我已阅读并同意
                      <a className="agreement-name"
                        onClick={this.readAgreementModal}
                      >《政采云融资信息服务协议》
                      </a>
                    </div>
                    <a
                      className={
                        agreed ?
                          'apply-btn' :
                          'apply-btn disabled'
                      }
                      onClick={() => {
                        this.doMeasureCredit(agreed);
                      }}
                    >
                      立即测算
                    </a>
                  </Fragment>
                )
              }

            </div>
          </Spin>

          <div className="loan-condition-wrap">
            <div className="loan-condition">
              <h1><Icon type="tongqian" zcy />我能否申请{prodDetail.name}？<Icon type="tongqian" zcy /></h1>
              <div style={{ marginTop: '7px' }}>
                同时满足以下
                <span
                  className="loan-prod-color"
                >{condition.length > 3 ? 3 : condition.length}
                </span>个条件，即可申请
              </div>

              <Row gutter={24} className="condition-list">
                {
                  condition.map((item, index) => {
                    if (index >= 3) {
                      return null;
                    }
                    const { bgImg, indexImg, key } = CONDITION_IMG[index];
                    return (
                      <Col span={8} className="condition-item" key={key}>
                        <img src={bgImg} alt="" className="bg-img" />
                        <div className="condition-name">
                          <div className="img-wrap">
                            <img src={indexImg} alt={index + 1} className="index-img" />
                          </div>
                          <span className="name">
                            {item}
                          </span>
                        </div>
                      </Col>
                    );
                  })
                }
              </Row>
            </div>
          </div>
          <div className="question">
            <h1 style={{ marginBottom: '30px' }}>常见问题</h1>
            <div className="question-wrap">
              <HelpCenter
                helpCenterInfo={problem}
                col={2}
                onlyQuestion
                contentStyle={{
                  height: '40px',
                  overflow: 'hidden',
                }}
              />
            </div>
          </div>
        </div>
        {
          agreementVisible ? (
            <AgreementInfoModal
              visible={agreementVisible}
              confirm={confirm}
              confirmText={confirmText}
              callback={this.agreeAgreement}
              onCancel={this.handleAgreementModal}
            />
          ) : null
        }
        {
          completeInfoVisible && (
            <CompleteInfoModal
              visible={completeInfoVisible}
              onCancel={this.toggleCompleteInfoModal}
              reqMeasureCredit={this.reqMeasureCredit}
            />
          )
        }
        {
          chooseBidItemModalVisible && (
            <BidItemListModal
              visible={chooseBidItemModalVisible}
              onCancel={this.toggleChooseBidItemModal}
              onChooseBidItemConfirm={this.onChooseBidItemConfirm}
              source={this.source}
              productId={this.id}
            />
          )
        }

      </Fragment>
    );
  }
}
