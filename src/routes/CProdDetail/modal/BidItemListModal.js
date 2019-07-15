import React, { Component } from 'react';
import { Modal, Spin, Table, message, Alert } from 'doraemon';
import { connect } from 'dva';
import { formatDateToLocal } from 'commonUtils';


@connect(({ loading, productDetail }) => ({
  loading: loading.effects['productDetail/getBidItemList'],
  bidItemList: productDetail.bidItemList,
}))
export default class BidItemListModal extends Component {
  state={
    pageSize: 10,
    pageNo: 1,
  }
  projectCode
  componentDidMount() {
    this.fetchBidItemList();
  }


  fetchBidItemList = (params = {}) => {
    const {
      pageSize,
      pageNo,
    } = this.state;
    const { source, productId } = this.props;
    this.props.dispatch({
      type: 'productDetail/getBidItemList',
      payload: {
        pageSize,
        pageNo,
        source,
        productId,
        ...params,
      },
    });
  }
  handleOk=() => {
    if (!this.projectCode) {
      message.destroy();
      message.warn('请选择中标项目');
      return;
    }

    const { onChooseBidItemConfirm, onCancel } = this.props;
    onCancel();
    onChooseBidItemConfirm(this.projectCode);
  }

  onPaginationChange=(pageNo, pageSize) => {
    this.setState({
      pageNo,
      pageSize,
    });

    this.fetchBidItemList({
      pageSize,
      pageNo,
    });
  }


  onSelectChange=([projectCode]) => {
    this.projectCode = projectCode;
  }

  render() {
    const { visible, onCancel, loading, bidItemList } = this.props;

    const { pageSize, pageNo } = this.state;

    const pagination = {
      pageSize,
      current: pageNo,
      showSizeChanger: true,
      total: bidItemList.total,
      onChange: this.onPaginationChange,
    };


    const rowSelection = {
      type: 'radio',
      onChange: this.onSelectChange,
    };


    const columns = [{
      title: '序号',
      dataIndex: 'index',
      width: 50,
      render: (text, record, index) => {
        return index + 1;
      },
    }, {
      title: '中标项目名称',
      width: 150,
      dataIndex: 'projectName',
    }, {
      title: '中标时间',
      className: 'nowrap',
      dataIndex: 'bidTime',
      width: 180,
      render: (text) => {
        return formatDateToLocal(text, true);
      },
    }];


    return (

      <Modal
        title="可融资订单/项目"
        visible={visible}
        onCancel={onCancel}
        onOk={this.handleOk}
        width={540}
      >
        <Spin
          spinning={loading}
        >
          <Alert
            className="fix-alert-icon"
            style={{
              margin: '-4px 0 20px 0',
            }}
            message="请选择您要申请融资的中标项目"
            type="info"
            showIcon
          />
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={bidItemList.data}
            pagination={pagination}
            rowKey="projectCode"
            scroll={{ y: 240 }}
            locale={{
              emptyText: '暂无符合贷款条件或开放区域的中标项目',
            }}
          />
        </Spin>
      </Modal>
    );
  }
}

