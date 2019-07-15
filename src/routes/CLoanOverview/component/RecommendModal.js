import React, { Component } from 'react';
import { Modal, Button, Icon } from 'doraemon';
import './recommend.less';

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


/**
 * 云智贷 产品推荐
 */
export default class RecommendModal extends Component {
  handleOk=() => {
    const { onOk } = this.props;
    const checkedProtocol = protocolList.filter((protocol) => {
      return this.checked.includes(protocol.value);
    });
    onOk(checkedProtocol);
  }


  getNoneContent=() => {
    const { onCancel } = this.props;

    return (
      <div className="recommend-none-content">
        <Icon zcy type="wushuju" />
        <div className="text">
          很遗憾！暂无适合您的贷款产品。
        </div>
        <Button type="primary" onClick={onCancel}>关闭</Button>
      </div>
    );
  }


  getRecommendList=() => {
    const { recommendProds = [] } = this.props;
    return (
      <div className="recommend-list">
        {
          recommendProds.map((prod) => {
            return (
              <div className="prod-item" key={prod.id}>
                <div className="title">
                  <span className="name">
                    {prod.name}
                  </span>
                  <span className="channel">
                    {prod.channelName}
                  </span>
                </div>
                <div className="content">
                  <div className="item">
                    <span className="left">
                      额度最高500万
                    </span>

                    <span className="right">
                      随借随还按日计费
                    </span>
                  </div>
                  <div className="item">
                    <span className="left">
                      纯信用融资
                    </span>

                    <span className="right">
                      点击申请秒出额度
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        }

      </div>
    );
  }

  handleApply = () => {
    const { recommendProds = [], doRecord, source } = this.props;
    const { id } = recommendProds[0];
    /**
     * 行为记录，查看云智贷评测匹配成功渠道产品名称
     */

    doRecord(2);
    this.props.history.push(`/customer-product-detail/${source}/${id}`);
  }
  render() {
    const { visible, onCancel, recommendProds = [] } = this.props;

    const footer = recommendProds.length ? [
      <Button key="back" onClick={onCancel}>关闭弹窗</Button>,
      <Button key="ok" type="primary" onClick={this.handleApply}>立即申请</Button>,
    ] : null;
    const title = recommendProds.length ? '为您推荐' : '';
    return (
      <Modal
        title={title}
        visible={visible}
        onCancel={onCancel}
        onOk={this.handleOk}
        footer={footer}
      >

        {
          recommendProds.length ? this.getRecommendList() : this.getNoneContent()
        }

      </Modal>
    );
  }
}

