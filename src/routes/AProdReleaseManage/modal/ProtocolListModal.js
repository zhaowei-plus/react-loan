import React, { Component } from 'react';
import { Modal, Checkbox } from 'doraemon';

const CheckboxGroup = Checkbox.Group;


const protocolList = [{
  value: 1,
  label: '协议1',
}, {
  value: 2,
  label: '协议2',
}, {
  value: 3,
  label: '协议3',
}];

export default class ProtocolListModal extends Component {
  checked=[]

  componentDidMount() {

  }

  handleOk=() => {
    const { onOk } = this.props;
    const checkedProtocol = protocolList.filter((protocol) => {
      return this.checked.includes(protocol.value);
    });
    onOk(checkedProtocol);
  }

  handleCheckboxChange=(value) => {
    this.checked = value;
  }

  render() {
    const { visible, onCancel } = this.props;


    return (
      <Modal
        title="添加协议"
        visible={visible}
        onCancel={onCancel}
        onOk={this.handleOk}
      >
        <CheckboxGroup options={protocolList} onChange={this.handleCheckboxChange} />
      </Modal>
    );
  }
}

