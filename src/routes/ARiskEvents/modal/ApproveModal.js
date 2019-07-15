import React, { Component, Fragment } from 'react';
import {
  Modal,
  Radio,
  Input,
  Form,
  message,
  FormGrid,
} from 'doraemon';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { FROM_ITEM_LAYOUT_6 } from 'common/constants';
import './index.less';

const { TextArea } = Input;
const { Group } = Radio;

@Form.create()
@connect(({ loading }) => ({
  loading: loading.effects['riskEvents/approve'],
}))
export default class ApproveModal extends Component {
    state={
      result: null,
    }
    onOk=() => {
      const { form, id, riskRecord } = this.props;
      form.validateFields({ force: true }, (err, value) => {
        if (!err) {
          const { result, remark } = value;
          const { status, executor } = riskRecord;
          this.props.dispatch({
            type: 'riskEvents/approve',
            payload: {
              id,
              result,
              remark,
              status,
              executor,
            },
          }).then((res) => {
            if (res.success) {
              message.success('审批成功');
              this.props.dispatch(routerRedux.push('/risk-events/list'));
            }
          });
        }
      });
    }

    changeResult=(e) => {
      const value = e.target.value;
      const { form } = this.props;
      this.setState({
        result: value,
      });
      // 切换审核结果时,消除审核意见的报错提示
      const error = form.getFieldsError(['remark']);
      if (error.remark) {
        form.setFields({
          remark: {
            errors: '',
            validateStatus: '',
          },
        });
      }
    }

    getFormGridItem=() => {
      const { getFieldDecorator } = this.props.form;
      const { result } = this.state;
      return (
        [{
          label: '审核结果',
          colSpan: 2,
          render: () => (
            <Fragment>
              {getFieldDecorator('result', {
                rules: [{
                  required: true,
                  message: '请选择审核结果',
                }],
                onChange: this.changeResult,
              })(
                <Group >
                  <Radio value={1}>同意</Radio>
                  <Radio value={0}>不同意</Radio>
                </Group>
              )}
            </Fragment>
          ),
        },
        {
          label: '审核备注',
          colSpan: 2,
          render: () => (
            <Fragment>
              {getFieldDecorator('remark', {
                rules: [{
                  required: result === 0,
                  message: '请输入审核备注',
                }, {
                  max: 100, message: '最多100字',
                }],
              })(
                <TextArea maxLength={100} placeholder="请输入" />
              )}
            </Fragment>
          ),
        }]
      );
    }

    render() {
      const { visible, onCancel, loading } = this.props;
      const formGridItem = this.getFormGridItem();
      return (
        <Modal
          title="审批"
          visible={visible}
          onCancel={onCancel}
          onOk={this.onOk}
          confirmLoading={loading}
        >
          <Form>
            <FormGrid
              {...FROM_ITEM_LAYOUT_6}
              formGridItem={formGridItem}
            />
          </Form>
        </Modal>
      );
    }
}
