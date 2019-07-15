import React, { Fragment } from 'react';
import { Row } from 'doraemon';
import { filterFieldName } from 'commonUtils';
import ShowCaseConfig from '../component/ShowCaseConfig';
import RegionQuerySupplier from '../component/RegionQuerySupplier';
import OpenDistrict from '../component/OpenDistrict';
import { SHOW_CASE_DISTRICT, SHOW_MODULE } from '../constant';

const getShowcaseItemConfig = (banner = {}, resetProdDetail = {}, isContractLoanProcess) => {
  /**
   * @param bannerDetail
   */
  const fixOpenDistrictCode = (bannerDetail = []) => {
    const selectedSupplier = {};
    bannerDetail.forEach((item) => {
      const { districtCode, code, isAll } = item;
      selectedSupplier[districtCode] = {
        code,
        isAll,
      };
    });

    return {
      selectedSupplier,
    };
  };


  const projectDistrictDetailConfig = isContractLoanProcess ? [{
    label: '项目区划限制',
    field: 'resetProdDetail.projectDistrictDetail',
    rules: [],
    fullRow: true,
    initialValue: resetProdDetail.projectDistrictDetail || { isAll: true },
    children: (
      <OpenDistrict
        radioConfig={SHOW_CASE_DISTRICT}
      />
    ),
    renderView: () => {
      return (
        <OpenDistrict
          radioConfig={SHOW_CASE_DISTRICT}
          value={resetProdDetail.projectDistrictDetail}
          showOnly
        />
      );
    },
  }] : [];
  return [
    {
      label: '展示模块',
      field: 'showModule',
      rules: [],
      fullRow: true,
      initialValue: banner.bannerShow || [],
      children: (
        <ShowCaseConfig />
      ),
      renderView: () => {
        let { bannerShow } = banner;

        bannerShow = bannerShow || [];

        if (!bannerShow.length) {
          return '-';
        }

        return (
          <Fragment>
            {
              bannerShow.map((item) => {
                const bannerName = filterFieldName(item.show, SHOW_MODULE);
                return (
                  <span style={{ padding: '0 5px' }}>
                    {bannerName}&nbsp;
                    {item.sort ? `第${item.sort}位` : ''}
                  </span>
                );
              })
            }
          </Fragment>
        );
      },
    }, ...projectDistrictDetailConfig, {
      label: '',
      field: 'openDistrictCode',
      rules: [],
      fullRow: true,
      initialValue: fixOpenDistrictCode(banner.bannerDetail || []),
      children: (
        <RegionQuerySupplier />
      ),
      renderView: () => {
        return <RegionQuerySupplier value={fixOpenDistrictCode(banner.bannerDetail || [])} view />;
      },
    }];
};

/**
 * 橱窗位
 * @param props
 * @returns {*}
 * @constructor
 */
const ProdShowCase = (props = {}) => {
  const { banner, renderFormItem, resetProdDetail, isContractLoanProcess } = props;

  const formConfig = getShowcaseItemConfig(banner, resetProdDetail, isContractLoanProcess);
  return (
    <div id="show-case">
      <span className="panel-sub-title" >
               橱窗位
      </span>
      <Row>
        {
          renderFormItem(formConfig)
        }
      </Row>
    </div>
  );
};


export default ProdShowCase;
