import React from 'react';
import {
  Row,
  Select, Input, Radio, Upload,
} from 'doraemon';
import { normFile, filterFieldName } from 'commonUtils';
import {
  BIZ_TYPE,
  PROD_CATEGORY,
} from '../constant';


const uploadProps = {
  listType: 'picture-card',
  bizCode: 1089,
  maxFileSize: 5 * 1024 * 1024,
  fileNum: 1,
  accept: 'PNG,JPG,JPEG,BMP,GIF',
};

const { Option } = Select;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

/**
 * 产品简介表单配置
 * @param resetProdDetail  产品详情
 * @param channelList   资方渠道列表
 * @param handleChannelChange
 * @param isBasicConfig 是否是基础配置页面
 * @param productTypeList
 * @param processList
 * @param onProductTypesChange
 * @returns {*[]}
 */
const getProdInfoItemConfig = ({
  resetProdDetail = {},
  channelList = [],
  handleChannelChange,
  isBasicConfig,
  productTypeList = [],
  processList = [],
  onProductTypesChange,
}) => {
  return [{
    label: '业务类别',
    field: 'resetProdDetail.businessCategory',
    rules: [{
      required: true, message: '请选择业务类别',
    }],
    initialValue: resetProdDetail.businessCategory,
    children: (
      <Select placeholder="请选择">
        {
          BIZ_TYPE.map((biz) => {
            return <Option value={biz.value} key={biz.value}>{biz.label}</Option>;
          })
        }
      </Select>
    ),
    renderView: () => {
      return (
        <span>
          {filterFieldName(resetProdDetail.businessCategory, BIZ_TYPE)}
        </span>
      );
    },
  }, {
    label: '产品类别',
    field: 'resetProdDetail.category',
    rules: [{
      required: true, message: '请选择产品类别',
    }],
    initialValue: resetProdDetail.category,
    children: (
      <Select placeholder="请选择">
        {
          PROD_CATEGORY.map((biz) => {
            return <Option value={biz.value} key={biz.value}>{biz.label}</Option>;
          })
        }
      </Select>
    ),
    renderView: () => {
      return (
        <span>
          {filterFieldName(resetProdDetail.category, PROD_CATEGORY)}
        </span>
      );
    },
  }, {
    label: '产品类型',
    field: 'resetProdDetail.types',
    onChange: onProductTypesChange,
    rules: [{
      required: true, message: '请选择产品类型',
    }],
    initialValue: resetProdDetail.types,
    children: (
      <Select placeholder="请选择">
        {
          productTypeList.map((biz) => {
            return <Option value={biz.id} key={biz.id}>{biz.types}</Option>;
          })
        }
      </Select>
    ),
    renderView: () => {
      return (
        <span>
          {resetProdDetail.typesName}
        </span>
      );
    },
  }, {
    label: '资方渠道',
    field: 'resetProdDetail.channel',
    rules: [{
      required: true, message: '请选择资方渠道',
    }],
    initialValue: resetProdDetail.channelId,
    children: (
      <Select placeholder="请选择"
        onChange={handleChannelChange}
      >
        {
          channelList.map((channel) => {
            return (
              <Option value={channel.id} key={channel.id}>
                {channel.channelName}
              </Option>
            );
          })
        }
      </Select>
    ),
    renderView: () => {
      return (
        <span>
          {resetProdDetail.channelName || '-'}
        </span>
      );
    },
  }, {
    label: '流程名称',
    field: 'resetProdDetail.process',
    rules: [{
      required: true, message: '请选择流程名称',
    }],
    initialValue: resetProdDetail.process,
    children: (
      <Select placeholder="请选择">
        {
          processList.map((item) => {
            return (
              <Option value={item.id} key={item.id}>
                {item.process}
              </Option>
            );
          })
        }
      </Select>
    ),
    renderView: () => {
      return (
        <span>
          {resetProdDetail.processName}
        </span>
      );
    },
  }, {
    label: '渠道产品编号',
    field: 'resetProdDetail.code',
    rules: [{
      required: true, message: '请输入渠道产品编号',
    },
    {
      pattern: /^[\u4e00-\u9fa5a-zA-Z0-9-]+$/,
      message: '请输入中英文、数字或符号',
    },
    {
      max: 20, message: '最多20字',
    }],
    initialValue: resetProdDetail.code,
    children: (
      <Input placeholder="请选择" />
    ),
    renderView: () => {
      return (
        <span>
          {resetProdDetail.code}
        </span>
      );
    },
  }, {
    label: '渠道产品代码',
    field: 'resetProdDetail.num',
    rules: [{
      required: true, message: '请输入渠道产品代码',
    },
    {
      pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]+$/,
      message: '请输入中英文或数字',
    },
    {
      max: 20, message: '最多20字',
    }],
    initialValue: resetProdDetail.num,
    children: (
      <Input placeholder="请选择" />
    ),
    renderView: () => {
      return (
        <span>
          {resetProdDetail.num}
        </span>
      );
    },
  }, {
    label: isBasicConfig ? '基础产品名称' : '渠道产品名称',
    field: 'resetProdDetail.name',
    rules: [{
      required: true, message: `请输入${isBasicConfig ? '基础产品名称' : '渠道产品名称'}`,
    },
    {
      pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]+$/,
      message: '请输入中英文或数字',
    },
    {
      max: 20, message: '最多20字',
    }],
    initialValue: resetProdDetail.name,
    children: (
      <Input placeholder="请选择" />
    ),
    renderView: () => {
      return (
        <span>
          {resetProdDetail.name}
        </span>
      );
    },
  }, {
    label: '副标题',
    field: 'resetProdDetail.subtitle',
    rules: [
      {
        max: 50, message: '最多50字',
      }],
    initialValue: resetProdDetail.subtitle,
    children: (
      <TextArea placeholder="请输入" autoChange="true" style={{ width: '220px' }} maxLength={50} />
    ),
    renderView: () => {
      return (
        <span>
          {resetProdDetail.subtitle || '-'}
        </span>
      );
    },
  },
  {
    label: '产品描述',
    field: 'resetProdDetail.description',
    rules: [
      {
        max: 100, message: '最多100字',
      }],
    initialValue: resetProdDetail.description,
    children: (
      <TextArea placeholder="请输入" autoChange="true" style={{ width: '220px' }} maxLength={100} />
    ),
    renderView: () => {
      return (
        <span>
          {resetProdDetail.description || '-'}
        </span>
      );
    },
  }, {
    label: '是否循环额度',
    field: 'resetProdDetail.loop',
    rules: [{
      required: true, message: '请选择是否循环额度',
    }],
    fullRow: !isBasicConfig,
    initialValue: resetProdDetail.loop,
    children: (
      <RadioGroup>
        <Radio value>是</Radio>
        <Radio value={false}>否</Radio>
      </RadioGroup>
    ),
    renderView: () => {
      return (
        <span>
          {resetProdDetail.loop === true ? '是' : '否'}
        </span>
      );
    },
  }, {
    label: '产品小图',
    field: 'resetProdDetail.smallImage',
    rules: [{
      required: true, message: '请上传产品小图',
    }],
    valuePropName: 'fileList',
    getValueFromEvent: normFile,
    initialValue: resetProdDetail.smallImage ? [resetProdDetail.smallImage] : [],
    children: (
      <Upload {...uploadProps} />
    ),
    renderView: () => {
      return (
        <span>
          <Upload
            {...uploadProps}
            showOnly
            fileList={resetProdDetail.smallImage ? [resetProdDetail.smallImage] : []}
          />
        </span>
      );
    },
  }, {
    label: '产品大图',
    field: 'resetProdDetail.bigImage',
    rules: [{
      required: true, message: '请上传产品大图',
    }],
    valuePropName: 'fileList',
    getValueFromEvent: normFile,
    initialValue: resetProdDetail.bigImage ? [resetProdDetail.bigImage] : [],
    children: (
      <Upload
        {...uploadProps}
      />
    ),
    renderView: () => {
      return (
        <span>
          <Upload
            {...uploadProps}
            showOnly
            fileList={resetProdDetail.bigImage ? [resetProdDetail.bigImage] : []}
          />
        </span>
      );
    },
  }, {
    label: '注意事项',
    field: 'resetProdDetail.note',
    rules: [{
      required: true, message: '请输入注意事项',
    },
    {
      max: 200, message: '最多200字',
    }],
    initialValue: resetProdDetail.note,
    children: (
      <TextArea placeholder="请输入" autoChange="true" style={{ width: '220px' }} maxLength={200} />
    ),
    renderView: () => {
      return (
        <span>
          {resetProdDetail.note || '-'}
        </span>
      );
    },
  }, {
    label: '常见问题',
    field: 'resetProdDetail.problem',
    rules: [{
      required: true, message: '请输入常见问题',
    },
    {
      max: 400, message: '最多400字',
    }],
    initialValue: resetProdDetail.problem,
    children: (
      <TextArea placeholder="请输入" autoChange="true" style={{ width: '220px' }} maxLength={400} />
    ),
    renderView: () => {
      return (
        <span>
          {resetProdDetail.problem || '-'}
        </span>
      );
    },
  }];
};

const ProductBrief = (props) => {
  const {
    renderFormItem,
  } = props;

  const config = getProdInfoItemConfig(props);
  return (
    <div id="product-info">
      <span className="panel-sub-title">
               产品简介
      </span>
      <Row>
        {
          renderFormItem(config)
        }
      </Row>
    </div>
  );
};

export default ProductBrief;
