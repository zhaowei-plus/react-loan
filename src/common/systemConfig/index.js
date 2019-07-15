import React from 'react';
import {
  Input,
  InputNumber,
  Radio,
  DatePicker,
  request,
  Select,
  SelectItem,
  SystemConfig,
  ZcyValidate,
} from 'doraemon';

const { Option } = Select;
const { mobile } = ZcyValidate;
const { TextArea } = Input;
const {
  setItemConfig,
  setSelectConfig,
} = SystemConfig;

const ItemConfig = {
  email: {
    label: '邮箱',
    type: 'email',
    rules: [{
      type: 'email', message: '请输入正确邮箱!',
    }],
  },
  text: {
    rules: [
      { max: 30, message: '最大长度为30' },
    ],
  },
  age: {
    label: '年龄',
    children: <InputNumber min={1} max={100} placeholder="年龄" />,
  },
  radio: {
    label: '单选框',
    children: (
      <Radio.Group>
        <Radio value="a">1</Radio>
        <Radio value="b">2</Radio>
        <Radio value="c">3</Radio>
      </Radio.Group>
    ),
  },
  name: {
    label: '下拉选择',
    children: <SelectItem type="name" />,
  },
  name1: {
    label: '下拉选择',
    children: <SelectItem type="name1" />,
  },
  name2: {
    label: '下拉选择',
    children: <SelectItem type="name2" />,
  },
  date: {
    label: '日期',
    children: <DatePicker />,
  },
  mobile: {
    label: '联系方式',
    rules: [
      mobile,
    ],
  },
  textArea: {
    label: '备注',
    span: 24,
    formItemLayout: {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 21 },
      },
    },
    children: (<TextArea maxLength={500} />),
  },
  bookMark: {
    label: '书签',
    rules: [
      { max: 25, message: '请输入少于25字' },
      {
        validator: (rule, value, callback) => {
          if (value) {
            request(`/api/check?checkContext=${value}`).then((res: any) => {
              if (res.success) {
                callback();
                return;
              }
              callback(new Error(res.error));
            });
          } else {
            callback();
          }
        },
      },
    ],
  },
};
const selectConfig = {
  name: {
    url: '/api/select',
  },
  name1: {
    url: '/api/select1',
    transform: (options) => {
      return options.map(d => <Option value={d.age} key={d.age}>{d.name}</Option>);
    },
    getOptions: (data) => {
      return data.a.data;
    },
  },
  name2: {
    options: [{
      value: '1',
      text: '文字1',
    }, {
      value: '2',
      text: '文字2',
    }],
  },
};
setItemConfig(ItemConfig);
setSelectConfig(selectConfig);
