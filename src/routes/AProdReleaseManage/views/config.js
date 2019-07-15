import React, { Component } from 'react';
import {
  Form,
  Spin,
  ZcyBreadcrumb,
  Col,
  Panel,
  message,
} from 'doraemon';
import { connect } from 'dva';
import { baseFormItemLayout, halfFormItemLayout } from 'common/constants';
import { becomeInteger } from 'src/utils/commonUtil';
import Locator from '../component/Locator';
import ProductBrief from '../moduleComponent/ProductBrief';
import ProdDataSummary from '../moduleComponent/ProdDataSummary';
import ProdBaseInfo from '../moduleComponent/ProdBaseInfo';
import ProdShowCase from '../moduleComponent/ProdShowCase';
import ProdLoanCondition from '../moduleComponent/ProdLoanCondition';
import ProdRateSchemeTable from '../moduleComponent/ProdRateSchemeTable';
import ProdChargeListTable from '../moduleComponent/ProdChargeListTable';
import ProdProtocolTable from '../moduleComponent/ProdProtocolTable';
import withCheckPageTypeHoc from './withCheckPageType';
import { CHARGE_TYPES, PROD_FIELD } from '../constant';
import './index.less';

const FormItem = Form.Item;

@withCheckPageTypeHoc()
@Form.create()
@connect(({ loading, prodReleaseConfig }) => ({
  prodDetail: prodReleaseConfig.prodDetail,
  loanCondition: prodReleaseConfig.loanCondition,
  channelList: prodReleaseConfig.channelList,
  processList: prodReleaseConfig.processList,
  productTypeList: prodReleaseConfig.productTypeList,
  btnLoading: loading.effects['prodReleaseConfig/updateProd'] || loading.effects['prodReleaseConfig/updateBasicProdConfig'],
  loading: loading.models.prodReleaseConfig,
}))
export default class ProdReleaseConfig extends Component {
  constructor(props) {
    super(props);

    const { match = {}, initPage } = props;

    initPage(match, this);
    this.state = {
      selectedChannelName: '',
    };
  }


  componentWillMount() {
    const { pageType } = this;
    /**
     * 创建渠道产品时 先获取基础产品的配置
     */
    pageType === 'PRODUCT_CREATE' && this.fetchBasicProdConfigDetail();

    /**
     * 修改基础产品时 先获取基础产品的配置
     */
    pageType === 'BASIC_CONFIG_EDIT' && this.fetchBasicProdConfigDetail();
    /**
     * 编辑渠道产品时 获取渠道产品详情
     */
    pageType === 'PRODUCT_EDIT' && this.fetchProdDetail();
    /**
     * 资方渠道列表
     */
    this.fetchChannelList();
    /**
     * 贷款条件
     */
    this.fetchLoanCondition();

    /**
     * 获取流程名称列表
     */
    this.fetchProcessList();
    /**
     * 获取产品类型列表
     */
    this.fetchProductTypeList();
  }

  /**
   * 基础配置详情
   */
  fetchBasicProdConfigDetail = () => {
    this.props.dispatch({
      type: 'prodReleaseConfig/getBasicProdConfigDetail',
      payload: {
        id: this.queryId,
      },
    });
  };

  /**
   * 渠道产品详情
   */
  fetchProdDetail = () => {
    this.props.dispatch({
      type: 'prodReleaseConfig/getProdDetail',
      payload: {
        id: this.queryId,
      },
    });
  };

  /**
   * 贷款必备条件
   */
  fetchLoanCondition = () => {
    this.props.dispatch({
      type: 'prodReleaseConfig/getLoanCondition',
    });
  };

  /**
   * 渠道列表
   */
  fetchChannelList = () => {
    this.props.dispatch({
      type: 'prodReleaseConfig/getChannelList',
    });
  };

  /**
   * 流程列表
   */
  fetchProcessList = () => {
    this.props.dispatch({
      type: 'prodReleaseConfig/getProcessList',
    });
  };


  /**
   * 产品类型列表
   */
  fetchProductTypeList = () => {
    this.props.dispatch({
      type: 'prodReleaseConfig/getProductTypeList',
    });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  submit = () => {
    const { form, loanCondition } = this.props;

    form.validateFields((err, value) => {
      if (err) {
        message.warn('请完善信息');
        return;
      }

      const checkCustomValidate = () => {
        const { resetProdDetail = {}, productTollList, productRateList } = value;

        if (!productTollList) {
          message.warn('请添加费用收取清单');
          return false;
        }

        if (!productRateList) {
          message.warn('请添加利率方案');
          return false;
        }
        const { bigImage = [], smallImage = [] } = resetProdDetail;

        const [bigImageFile] = bigImage;
        const [smallImageFile] = smallImage;


        const noticeFileStatus = ({ status }) => {
          if (status === 'uploading') {
            message.warn('文件正在上传中，请稍候');
            return;
          }

          if (status === 'error') {
            message.warn('文件上传失败，请重试');
          }
        };
        if (bigImageFile && bigImageFile.status !== 'done') {
          noticeFileStatus(bigImageFile);
          return false;
        }

        if (smallImageFile && smallImageFile.status !== 'done') {
          noticeFileStatus(smallImageFile);
          return false;
        }
        return true;
      };

      const customValidate = checkCustomValidate();

      if (!customValidate) {
        return;
      }

      /**
       * 组合payload数据
       * @param target
       */
      const payloadBuilder = (target) => {
        const {
          resetProdDetail,
          productCondition,
          productProtocol,
          productRateList,
          productTollList,
          creditAmount,
          chargeModel,
          openDistrictCode,
          showModule,
        } = target;


        /**
         * 逾期数据
         * @param overdue
         * @returns {{rateNum: (*|string), type: (Array|*|boolean)}}
         */
        const fixOverdue = (overdue = {}) => {
          return {
            rateNum: overdue.input,
            type: overdue.checked,
          };
        };
        // TODO 比例传整数
        const fixRepaymentCycle = (repaymentCycle = {}) => {
          return {
            type: repaymentCycle.checked,
            val: repaymentCycle.input,
          };
        };

        /**
         * 提前还款违约金
         * @param defaultRepayment
         * @returns {{rateNum: (*|string), type: (Array|*|boolean)}}
         */
        const fixDefaultRepayment = (defaultRepayment) => {
          return {
            rateNum: defaultRepayment.input,
            type: defaultRepayment.checked,
          };
        };


        /**
         * 产品大图和产品小图 上传文件数据修正
         * @param fileList
         * @returns {{name: *, fileType: *, fileId: (string)}}
         */
        const fixFileList = (fileList = []) => {
          const [file = {}] = fileList;

          return {
            fileId: file.fileId,
            fileType: file.type,
            name: file.name,
          };
        };

        /**
         * 橱窗位开放区划
         * @param selectedSupplier
         * @returns {{districtCode: string, code, isAll}[]}
         */
        const fixBannerDetail = (selectedSupplier = {}) => {
          const districtCodes = Object.keys(selectedSupplier);
          return districtCodes.map((districtCode) => {
            const { code, isAll } = selectedSupplier[districtCode] || {};
            return {
              districtCode,
              code,
              isAll,

            };
          });
        };


        /**
         * 资方渠道数据修正
         * @param channelId
         */
        const fixChannel = (channelId) => {
          const { channelList } = this.props;

          const [result = {}] = channelList.filter(channel => channel.id === channelId);

          result.channelId = result.id;
          return result;
        };
        /**
         * 基础产品配置 无橱窗信息
         */
        const banner = this.isBasicConfig ? undefined : {
          bannerDetail: fixBannerDetail(openDistrictCode.selectedSupplier),
          bannerShow: showModule,
        };

        const fixedResetProdDetail = {
          ...resetProdDetail,
          modelHead: chargeModel.modelHead,
          modelYear: chargeModel.modelYear,
          creditLeft: becomeInteger(creditAmount.min),
          creditRight: becomeInteger(creditAmount.max),
          defaultRepayment: fixDefaultRepayment(resetProdDetail.defaultRepayment),
          repaymentCycle: fixRepaymentCycle(resetProdDetail.repaymentCycle),
          overdue: fixOverdue(resetProdDetail.overdue),
          channel: fixChannel(resetProdDetail.channel),
          bigImage: fixFileList(resetProdDetail.bigImage),
          smallImage: fixFileList(resetProdDetail.smallImage),
        };


        /**
         * table 列表获取到的值
         * 每一个formItem 对应的值类型为数组，但是每一行的值不存在数组中，而是根据对应的key挂载在数组对象上
         * 需要用Object.values()获取所有的 value
         * @param tableValue
         * @param extraFieldFix
         */
        const fixTableFormValue = (tableValue = {}, extraFieldFix) => {
          /**
           * Object.values()
           * @param targetObj
           * @returns {*[]}
           */
          const getObjValues = (targetObj = {}) => {
            return Object.keys(targetObj)
              .map(key => targetObj[key]);
          };


          /**
           * 获取所有的字段
           * @type {string[]}
           */
          const fields = Object.keys(tableValue);

          const firstField = fields[0];
          if (!tableValue[firstField]) {
            return;
          }


          const firstFieldValues = tableValue[firstField];

          /**
           * 根据第一个字段的 value([])的长度  判断table的行数
           * @type {string}
           */
          const firstFieldValueFixed = getObjValues(firstFieldValues);

          return firstFieldValueFixed.map((tdValue, index) => {
            const store = {};

            fields.forEach((key) => {
              const currentRowValue = getObjValues(tableValue[key]);
              store[key] = currentRowValue[index];
            });

            extraFieldFix && extraFieldFix(store);
            return store;
          });
        };

        const fixedProductCondition = loanCondition.filter(
          condition => (
            productCondition.includes(condition.id)
          )
        );
        const fixedProductProtocol = fixTableFormValue(productProtocol);
        const fixedProductRateList = fixTableFormValue(productRateList);
        const fixedProductTollList = fixTableFormValue(productTollList, (item) => {
          const [chargeType = {}] = CHARGE_TYPES.filter(typeItem => typeItem.value === item.types);
          item.types = {
            id: chargeType.value,
            name: chargeType.label,
          };
        });


        return {
          banner,
          ...fixedResetProdDetail,
          productCondition: fixedProductCondition,
          productProtocol: fixedProductProtocol,
          productRateList: fixedProductRateList,
          productTollList: fixedProductTollList,
        };
      };

      const payload = payloadBuilder(value);

      this.submitPayload(payload);
    });
  };


  submitPayload = (payload) => {
    const { pageType } = this;
    /**
     * 创建渠道产品
     */
    if (pageType === 'PRODUCT_CREATE') {
      const { prodDetail } = this.props;
      payload.basisId = prodDetail.id;
      payload.status = 3;
      this.props.dispatch({
        type: 'prodReleaseConfig/updateProd',
        payload: {
          method: 'POST',
          data: payload,
        },
      })
        .then((res) => {
          if (res.success) {
            message.success('创建渠道产品成功');
            this.props.history.push('/product-release/list?tab=3');
          }
        });
    }

    /**
     * 配置渠道产品详情
     */
    if (pageType === 'PRODUCT_EDIT') {
      const { prodDetail } = this.props;
      payload.id = prodDetail.id;
      payload.status = 3;
      this.props.dispatch({
        type: 'prodReleaseConfig/updateProd',
        payload: {
          method: 'PUT',
          data: payload,
        },
      })
        .then((res) => {
          if (res.success) {
            message.success('配置渠道产品成功');
            this.goBack();
          }
        });
    }


    /**
     * 创建基础产品配置
     */
    if (pageType === 'BASIC_CONFIG_CREATE') {
      payload.stauts = 3;
      this.props.dispatch({
        type: 'prodReleaseConfig/updateBasicProdConfig',
        payload: {
          method: 'POST',
          data: payload,
        },
      })
        .then((res) => {
          if (res.success) {
            message.success('创建基础产品成功');
            this.goBack();
          }
        });
    }


    /**
     * 更新基础产品配置
     */
    if (pageType === 'BASIC_CONFIG_EDIT') {
      payload.id = this.props.prodDetail.id;
      this.props.dispatch({
        type: 'prodReleaseConfig/updateBasicProdConfig',
        payload: {
          method: 'PUT',
          data: payload,
        },
      })
        .then((res) => {
          if (res.success) {
            message.success('配置基础产品成功');
            this.goBack();
          }
        });
    }
  };

  renderFormItem = (config) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return config.map((item) => {
      if (this.isBasicConfig) {
        if (PROD_FIELD.includes(item.field)) {
          return null;
        }
      }
      const {
        label,
        field,
        rules,
        initialValue,
        children,
        fullRow,
        valuePropName = 'value',
        getValueFromEvent,
        onChange,
      } = item;
      const layout = fullRow ? halfFormItemLayout : baseFormItemLayout;
      const getValueFromEventConfig = getValueFromEvent ? { getValueFromEvent } : {};
      const onChangeConfig = onChange ? { onChange } : {};

      return (
        <Col span={fullRow ? 24 : 12} key={field}>
          <FormItem
            {...layout}
            label={label}
          >
            {getFieldDecorator(field, {
              rules,
              initialValue,
              valuePropName,
              onChange,
              ...getValueFromEventConfig,
              ...onChangeConfig,
            })(
              children
            )}
          </FormItem>
        </Col>
      );
    });
  };

  /**
   * 资方渠道切换修改利率方案列表的展示
   * @param value
   * @param option
   */
  handleChannelChange = (value, option) => {
    this.setState({
      selectedChannelName: option.props.children,
    });
  };


  onProductTypesChange=(value) => {
    const { form } = this.props;


    form.setFieldsValue({ 'resetProdDetail.process': value });
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'prodReleaseConfig/clearProdDetail',
    });
  }


  get isContractLoanProcess() {
    const { form } = this.props;
    const productType = form.getFieldValue('resetProdDetail.types');
    return productType === 2;
  }

  render() {
    const {
      form,
      prodDetail = {},
      loanCondition,
      btnLoading,
      chargeTypes,
      channelList,
      processList,
      productTypeList,
      loading,
    } = this.props;

    const { selectedChannelName } = this.state;

    const checkSubmitDisabled = () => {
      if (this.pageType !== 'BASIC_CONFIG_CREATE') {
        if (!prodDetail.id) {
          return true;
        }
      }

      return false;
    };
    const globalBtn = [{
      label: '返回',
      onClick: this.goBack,
    }, {
      label: '提交',
      type: 'primary',
      onClick: this.submit,
      disabled: checkSubmitDisabled(),
      loading: btnLoading,
    }];

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
            <Form >
              {/* 产品简介 */}
              <ProductBrief
                resetProdDetail={resetProdDetail}
                channelList={channelList}
                processList={processList}
                productTypeList={productTypeList}
                handleChannelChange={this.handleChannelChange}
                isBasicConfig={this.isBasicConfig}
                renderFormItem={this.renderFormItem}
                onProductTypesChange={this.onProductTypesChange}
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
                selectedChannelName={selectedChannelName || resetProdDetail.channelName}
                form={form}
                dataSource={productRateList}
              />
              {/* 费用收取清单 */}
              <ProdChargeListTable
                form={form}
                chargeTypes={chargeTypes}
                dataSource={productTollList}
              />
              {/* 贷款必备条件 */}
              <ProdLoanCondition
                loanCondition={loanCondition}
                productCondition={productCondition}
                renderFormItem={this.renderFormItem}
              />
              {/* 贷款协议/产品合同 */}
              <ProdProtocolTable
                form={form}
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
