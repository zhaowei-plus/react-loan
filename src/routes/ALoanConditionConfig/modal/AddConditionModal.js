import React, { Component } from 'react';
import { Modal, Form, Input, message } from 'doraemon';
import { connect } from 'dva';
import { FROM_ITEM_LAYOUT_6 } from 'common/constants/';


const { TextArea } = Input;

const { Item } = Form;


@connect(({ loading }) => ({
  loading: loading.effects['loanConditionConfig/updateCondition'],
}))
@Form.create()
export default class AddConditionModal extends Component {
  handleOk = () => {
    const { form, modalType, onCancel, modalData } = this.props;

    form.validateFields((err, value) => {
      if (err) {
        return;
      }

      if (modalType === 'EDIT') {
        value.id = modalData.id;
      } else {
        value.isSystem = false;
      }


      /**
       * request method
       * POST 新增
       * PUT 修改
       */
      this.props.dispatch({
        type: 'loanConditionConfig/updateCondition',
        payload: {
          data: value,
          method: modalType === 'ADD' ? 'POST' : 'PUT',
        },
      })
        .then((res) => {
          if (res.success) {
            if (modalType === 'ADD') {
              message.success('新增成功');
            } else {
              message.success('修改成功');
            }
            onCancel(true);
          } else {
            message.error(res.error);
          }
        });
    });
  };


  render() {
    const { visible, onCancel, form, loading, modalData, modalType } = this.props;

    const { getFieldDecorator } = form;
    return (
      <Modal
        title={`${modalType === 'ADD' ? '新增' : '编辑'}准入条件`}
        visible={visible}
        onCancel={onCancel}
        onOk={this.handleOk}
        confirmLoading={loading}
      >
        <Form>
          <Item
            {...FROM_ITEM_LAYOUT_6}
            label="准入条件名称"
          >
            {getFieldDecorator('name', {
              rules: [{
                required: true,
                message: '请输入准入条件名称',
              }, {
                max: 30,
                message: '最多输入30字',
              }],
              validateFirst: true,
              initialValue: modalData.name,
            })(
              modalData.isSystem === true ?
                <span>{modalData.name}</span> :
                <TextArea placeholder="请输入" maxLength={30} />
            )}
          </Item>
          <Item
            {...FROM_ITEM_LAYOUT_6}
            label="备注"
          >
            {getFieldDecorator('remark', {
              rules: [{
                required: true,
                message: '请输入备注',
              }, {
                max: 50,
                message: '最多输入50字',
              }],
              initialValue: modalData.remark,
            })(
              <TextArea placeholder="请输入" maxLength={50} />
            )}
          </Item>
        </Form>
      </Modal>
    );
  }
}

