import React, { Component } from 'react';
import { Modal, Form, Input, Alert } from 'doraemon';
import { connect } from 'dva';
import { baseFormItemLayout } from 'common/constants';

const { Item } = Form;

@connect(({ loading }) => ({
  loading: loading.effects['productDetail/supplierCompleteInfo'],
}))
@Form.create()
class CompleteInfoModal extends Component {
  submitCode=() => {
    const { form, onCancel, reqMeasureCredit } = this.props;

    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      const { code } = values;

      reqMeasureCredit({
        creditCode: code,
      });

      onCancel(true);
    });
  }

  render() {
    const { visible, loading, form, onCancel } = this.props;

    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="提示"
        confirmLoading={loading}
        cancelText="再看看"
        okText="继续申请"
        onCancel={onCancel}
        onOk={this.submitCode}
      >
        <Alert
          type="info"
          style={style.alert}
          showIcon
          message="填写营业执照中以下信息即可继续申请测算（建议完成申请后至“基础资料应用”继续完善“基本信息、资质信息、财务信息）"
        />
        <Form>
          <Item
            {...baseFormItemLayout}
            label="企业名称"
          >
            {
              getFieldDecorator('name', {
                rules: [],
                initialValue: '',
              })(
                <span>
                  {window.currentUserIdentity.orgName}
                </span>
              )
            }
          </Item>
          <Item
            {...baseFormItemLayout}
            label="统一社会信用代码"
          >
            {
              getFieldDecorator('code', {
                rules: [{
                  required: true,
                  message: '请输入统一社会信用代码',
                }, {
                  pattern: /^(?![A-Z]+$)[0-9A-Z]{18}$/,
                  message: '请输入正确的统一社会信用代码(18位数字和大写字母)',
                }],
              })(
                <Input placeholder="请输入" style={{ width: '220px' }} />
              )
            }
          </Item>

        </Form>

      </Modal>
    );
  }
}

const style = {
  alert: {
    margin: '-24px -24px 24px -24px',
    borderRadius: 0,
    background: '#F7F7F7',
    border: '1px solid #E5E5E5',
    borderTop: 'none',
    fontSize: '12px',
    color: '#777777',
    lineHeight: '18px',
  },
};
export default CompleteInfoModal;
