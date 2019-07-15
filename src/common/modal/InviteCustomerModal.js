import React, { Component } from 'react';
import {
  Radio,
  Modal,
  message,
  Form,
} from 'doraemon';
import { connect } from 'dva';

@Form.create()
@connect(({ loading }) => ({
  inviteCustomerLoading: loading.effects['loanBusinessManage/inviteCustomer'],
}))
export default class InviteCustomerModal extends Component {
    onOk=() => {
      const { onCancel, refreshList, selectedRecord, form, pageType } = this.props;
      const {
        channelProductName,
        channelName,
        estimateAmount,
        id,
        customerId,
      } = selectedRecord;
      const { inviteType } = form.getFieldsValue();
      let payload = {};
      if (pageType === 1) { // 申请记录页面操作邀请客户
        payload = {
          capitalChannel: channelName,
          estimateAmount,
          productName: channelProductName,
          inviteType,
          id,
          customerId,
          pageType,
        };
      } else { // 营销中心页面操作邀请客户
        payload = {
          inviteType,
          id,
          pageType,
          customerId,
        };
      }
      this.props.dispatch({
        type: 'loanBusinessManage/inviteCustomer',
        payload,
      }).then((res) => {
        if (res.success) {
          message.success('邀请成功');
          refreshList();
        }
        onCancel();
      });
    }

    render() {
      const { visible, onCancel, inviteCustomerLoading, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          title="邀请客户"
          visible={visible}
          onCancel={onCancel}
          onOk={this.onOk}
          confirmLoading={inviteCustomerLoading}
          width={400}
        >
          <Form>
            {
              getFieldDecorator('inviteType', {
                initialValue: 1,
              })(
                <Radio.Group >
                  <Radio value={1}>系统通知</Radio>
                  <Radio value={2}>短信</Radio>
                </Radio.Group>
              )
            }
          </Form>

        </Modal>
      );
    }
}
