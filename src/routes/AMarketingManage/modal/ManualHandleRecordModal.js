import React, { Component } from 'react';
import {
  Spin,
  Modal,
  Table,
  Input,
  Tooltip,
  message,
  Form,
  Button,
  Badge,
} from 'doraemon';
import { connect } from 'dva';
import { formatDateToLocal, getRelevantName } from 'commonUtils';
import { PROCESS_STATUS, BADGE_STATUS_CONFIG } from '../component/typeConstants';
import './index.less';

const { TextArea } = Input;

@Form.create()

@connect(({ loading, marketingManage }) => ({
  manualHandleRecordList: marketingManage.manualHandleRecordList,
  listLoading: loading.effects['marketingManage/getManualHandleRecordList'],
  confirmLoading: loading.effects['marketingManage/changeResult'],
}))
export default class ManualHandleRecordModal extends Component {
    state={
      Ids: [], // 改变过处理结果的id集合
      pageNo: 1,
      pageSize: 10,
    }
    componentDidMount() {
      const { pageNo, pageSize } = this.state;
      this.getManualHandleRecordList({ pageNo, pageSize });
    }

  // 获得营销中心列表
  getManualHandleRecordList=(params) => {
    const { supplierId, operatorId } = this.props;
    this.props.dispatch({
      type: 'marketingManage/getManualHandleRecordList',
      payload: {
        ...params,
        supplierId,
        operatorId,
      },
    });
  }

  // 改变处理结果
  changeResult=(e, id) => {
    const value = e.target.value;
    const Ids = this.state.Ids;
    Ids.push(id);
    // 避免改变同一个结果多次时存储多个相同id
    let newIds = Array.from(new Set(Ids));
    // 清空处理结果,将存储索引值删除
    if (value === '') {
      newIds = newIds.filter(newId => newId !== id);
    }
    this.setState({
      Ids: newIds,
    });
  }

  // 获得columns
  getColumns=() => {
    const { getFieldDecorator } = this.props.form;
    const columns = [
      {
        title: '识别时间',
        width: 200,
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text, record) => (
          formatDateToLocal(record.createTime, true)
        ),
      }, {
        title: '识别事件',
        dataIndex: 'actionName',
        key: 'actionName',
        width: 200,
      }, {
        title: '处理状态',
        dataIndex: 'status',
        key: 'status',
        width: 150,
        render: (text, record) => {
          const { status } = record;
          const name = getRelevantName(status, PROCESS_STATUS);
          return (
            <Badge className="list-badge" status={BADGE_STATUS_CONFIG[record.status]} text={name} />
          );
        },
      }, {
        title: '处理时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        width: 200,
        render: (text, record) => (
          formatDateToLocal(record.updateTime, true)
        ),
      }, {
        title: '处理结果',
        dataIndex: 'remark',
        key: 'remark',
        width: 200,
        render: (text, record) => {
          const { remark, status, id } = record;
          if (status === 1) { // 已处理
            return (
              <Tooltip title={remark}
                getPopupContainer={() => document.querySelector('.manual-handle-record-modal')}
              >
                <p className="text-beyond-ellipsis">{remark}</p>
              </Tooltip>
            );
          } else { // 待处理
            return (
              <Form>
                {
                  getFieldDecorator(`dealRemark[${id}]`, {
                    rules: [
                      { max: 100, message: '最大长度为100' },
                    ],
                  })(
                    <TextArea
                      placeholder="请输入"
                      size="small"
                      autoChange
                      maxLength={100}
                      style={{ width: '180px' }}
                      onChange={e => this.changeResult(e, id)}
                    />
                  )
                }
              </Form>
            );
          }
        },
      },
    ];
    return columns;
  }

  onOk=() => {
    const { Ids } = this.state;
    if (!Ids || Ids.length === 0) {
      message.destroy();
      message.warning('请至少维护一个事件的处理结果');
      return;
    }
    const { form, refreshMarketingManageList, onCancel } = this.props;
    const value = form.getFieldsValue();
    const { dealRemark = [] } = value;

    const deal = [];
    // 只保留修改了审批结果的数据
    dealRemark.forEach((remark, index) => {
      if (remark) {
        deal.push({ id: index, remark });
      }
    });
    this.props.dispatch({
      type: 'marketingManage/changeResult',
      payload: { deal },
    }).then((res) => {
      if (res.success) {
        message.success('保存成功');
        onCancel();
        refreshMarketingManageList();
      }
    });
  }

  getFooter=() => {
    const { onCancel, manualHandleRecordList, confirmLoading } = this.props;
    const { data = [] } = manualHandleRecordList;
    const footer = [
      <Button key="back" onClick={() => onCancel()}>关闭</Button>,
    ];
    // 有待处理记录
    let hasPending = false;

    data.forEach((list) => {
      if (list.status === 0) {
        hasPending = true;
      }
    });

    if (hasPending) {
      footer.push(
        <Button key="submit" type="primary" loading={confirmLoading} onClick={this.onOk}>
            确定
        </Button>,
      );
    }
    return footer;
  }

  // 点击分页时触发
  onTableChange=(pagination) => {
    const { pageSize, current } = pagination;
    this.setState({
      pageSize,
      pageNo: current,
    });
    this.getManualHandleRecordList({
      pageSize,
      pageNo: current,
    });
  }

  render() {
    const { visible, onCancel, manualHandleRecordList, listLoading } = this.props;
    const { pageNo, pageSize } = this.state;

    const columns = this.getColumns();
    const footer = this.getFooter();
    const pagination = {
      pageSize,
      current: pageNo,
      showSizeChanger: true,
      total: manualHandleRecordList.total,
    };
    return (
      <Modal
        visible={visible}
        width={998}
        title="人工处理记录"
        onCancel={() => onCancel()}
        footer={footer}
        onOk={this.onOk}
        className="manual-handle-record-modal"
      >
        <Spin spinning={listLoading}>
          <Table
            columns={columns}
            scroll={{ y: 350 }}
            dataSource={manualHandleRecordList.data || []}
            pagination={pagination}
            onChange={this.onTableChange}
          />
        </Spin>
      </Modal>
    );
  }
}
