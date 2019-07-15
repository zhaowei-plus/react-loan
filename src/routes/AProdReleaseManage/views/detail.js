import React, { Component } from 'react';
import { Form, Spin, ZcyBreadcrumb, Col, Panel } from 'doraemon';
import { connect } from 'dva';
import { baseFormItemLayout, halfFormItemLayout } from 'common/constants/';

import Locator from '../component/Locator';
import ProductBrief from '../moduleComponent/ProductBrief';
import ProdDataSummary from '../moduleComponent/ProdDataSummary';
import ProdBaseInfo from '../moduleComponent/ProdBaseInfo';
import ProdShowCase from '../moduleComponent/ProdShowCase';
import ProdLoanCondition from '../moduleComponent/ProdLoanCondition';
import ProdRateSchemeTable from '../moduleComponent/ProdRateSchemeTable';
import ProdChargeListTable from '../moduleComponent/ProdChargeListTable';
import ProdProtocolTable from '../moduleComponent/ProdProtocolTable';
import withCheckPageType from './withCheckPageType';

import './index.less';
import { PROD_FIELD } from '../constant';


const FormItem = Form.Item;

@withCheckPageType()
@Form.create()
@connect(({ loading, prodReleaseConfig }) => ({
  prodDetail: prodReleaseConfig.prodDetail,
  loading: loading.models.prodReleaseConfig,
}))
export default class ProdReleaseDetail extends Component {
  constructor(props) {
    super(props);
    const { match = {}, initPage } = props;
    initPage(match, this);
  }

  componentDidMount() {
    const { pageType } = this;
    /**
     * 查看基础配置详情
     */
    pageType === 'BASIC_CONFIG_VIEW' && this.fetchBasicProdConfigDetail();

    /**
     * 查看产品详情
     */
    pageType === 'PRODUCT_VIEW' && this.fetchProdDetail();
  }


  fetchBasicProdConfigDetail = () => {
    this.props.dispatch({
      type: 'prodReleaseConfig/getBasicProdConfigDetail',
      payload: {
        id: this.queryId,
      },
    });
  };

  fetchProdDetail = () => {
    this.props.dispatch({
      type: 'prodReleaseConfig/getProdDetail',
      payload: {
        id: this.queryId,
      },
    });
  };

  renderFormItem = (config) => {
    return config.map((item) => {
      if (this.isBasicConfig) {
        if (PROD_FIELD.includes(item.field)) {
          return null;
        }
      }
      const { label, fullRow, renderView } = item;
      const layout = fullRow ? halfFormItemLayout : baseFormItemLayout;
      return (
        <Col span={fullRow ? 24 : 12}>
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

  goBack = () => {
    this.props.history.goBack();
  };

  componentWillUnmount() {
    this.props.dispatch({
      type: 'prodReleaseConfig/clearProdDetail',
    });
  }

  get isContractLoanProcess() {
    if (this.pageType === 'PRODUCT_VIEW') {
      const { prodDetail } = this.props;

      if (prodDetail.process !== 2) {
        return false;
      }

      return true;
    }
    return false;
  }

  render() {
    const globalBtn = [{
      label: '返回',
      onClick: this.goBack,
    }];

    const { form, prodDetail = {}, loading } = this.props;


    const {
      productTollList,
      productRateList,
      productProtocol,
      productCondition,
      banner,
      ...resetProdDetail
    } = prodDetail;

    return (
      <Spin spinning={loading}>
        <div id="prod-config">
          <ZcyBreadcrumb
            routes={this.router}
            globalBtn={globalBtn}
          />
          <Panel
            title={this.panelTitle}
          >
            <Form>
              {/* 产品简介 */}
              <ProductBrief
                resetProdDetail={resetProdDetail}
                handleChannelChange={this.handleChannelChange}
                isBasicConfig={this.isBasicConfig}
                renderFormItem={this.renderFormItem}
              />
              {
                /* 基础数据 */
                (this.isBasicConfig || (this.pageType === 'PRODUCT_CREATE')) ? null : (
                  <ProdDataSummary
                    statistics={resetProdDetail.statistics}
                    renderFormItem={this.renderFormItem}
                  />
                )
              }
              {/* 基础信息 */}
              <ProdBaseInfo
                resetProdDetail={resetProdDetail}
                renderFormItem={this.renderFormItem}
              />
              {
                /* 橱窗 */
                this.isBasicConfig ? null : (
                  <ProdShowCase
                    renderFormItem={this.renderFormItem}
                    resetProdDetail={resetProdDetail}
                    isContractLoanProcess={this.isContractLoanProcess}
                    banner={banner}
                  />
                )
              }
              {/* 利率方案 */}
              <ProdRateSchemeTable
                form={form}
                view
                dataSource={productRateList}
              />
              {/* 费用收取清单 */}
              <ProdChargeListTable
                form={form}
                view
                chargeTypes={[]}
                dataSource={productTollList}
              />
              {/* 贷款必备条件 */}
              <ProdLoanCondition
                loanCondition={[]}
                productCondition={productCondition}
                renderFormItem={this.renderFormItem}
              />
              {/* 贷款协议/产品合同 */}
              <ProdProtocolTable
                form={form}
                view
                dataSource={productProtocol}
              />
            </Form>
          </Panel>
          <Locator
            location={this.location}
          />
        </div>

      </Spin>
    );
  }
}
