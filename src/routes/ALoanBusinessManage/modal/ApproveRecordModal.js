import React, { Component } from 'react';
import {
  Spin,
  Modal,
  Table,
  Button,
} from 'doraemon';
import { connect } from 'dva';
import { getRelevantName } from 'commonUtils';
import { PROJECT_PHASE } from 'common/constants';
import './index.less';

@connect(({ loading, loanBusinessManage }) => ({
  approveRecordList: loanBusinessManage.approveRecordList,
  approveRecordLoading: loading.effects['loanBusinessManage/getApproveRecord'],
}))
export default class ApproveRecordModal extends Component {
  componentDidMount() {
    this.getRepayPlanList();
  }

  // 获得审批记录列表
  getRepayPlanList=() => {
    const { selectedRecord = {} } = this.props;
    this.props.dispatch({
      type: 'loanBusinessManage/getApproveRecord',
      payload: {
        id: selectedRecord.id,
      },
    });
  }

  getColumns=() => {
    const columns = [
      {
        title: '时间',
        dataIndex: 'approveTime',
        key: 'approveTime',
        width: 200,
        render: (text, record) => (
          record.approveTime || '-'
        ),
      }, {
        title: '项目阶段',
        dataIndex: 'projectStatus',
        key: 'projectStatus',
        width: 200,
        render: (text, record) => {
          const phaseName = getRelevantName(record.projectStatus, PROJECT_PHASE);
          return phaseName;
        },
      }, {
        title: '审批人',
        dataIndex: 'approver',
        key: 'approver',
        width: 150,
        render: (text, record) => (
          record.approver || '-'
        ),
      }, {
        title: '审批结果',
        dataIndex: 'result',
        key: 'result',
        width: 100,
        render: (text, record) => {
          return record.result === null ? '-' : (record.result ? '通过' : '不通过');
        },
      }, {
        title: '审批意见',
        dataIndex: 'remark',
        key: 'remark',
        width: 150,
        render: (text, record) => (
          record.remark || '-'
        ),
      },
    ];
    return columns;
  }

  render() {
    const { visible,
      onCancel,
      approveRecordList,
      approveRecordLoading,
      selectedRecord = {},
    } = this.props;
    const columns = this.getColumns();
    return (
      <Modal
        title="审批记录"
        visible={visible}
        width={800}
        onCancel={onCancel}
        footer={
          <Button onClick={onCancel}>关闭</Button>
        }
      >
        <p><span className="list-sub-title">客户名称: </span>{selectedRecord.customerName}</p>
        <p className="mb20"><span className="list-sub-title">项目名称: </span>{selectedRecord.projectName}</p>
        <Spin spinning={approveRecordLoading}>
          <Table
            columns={columns}
            dataSource={approveRecordList}
            pagination={false}
            rowKey={(record => record.id)}
            scroll={{ y: 300 }}
          />
        </Spin>
      </Modal>
    );
  }
}
