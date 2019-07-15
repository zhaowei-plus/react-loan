import React, { Component } from 'react';
import { ZcyBreadcrumb, Spin, Panel } from 'doraemon';
import { connect } from 'dva';
import AgreementInfoModal from 'common/modal/AgreementInfoModal';
import './index.less';

import BaseInfo from '../component/BaseInfo';
import ApplyInfo from '../component/ApplyInfo';
import EstimateInfo from '../component/EstimateInfo';
import ProtocolInfo from '../component/ProtocolInfo';
import ApproveInfo from '../component/ApproveInfo';

const breadcrumb = [{
  label: '贷款申请记录',
}, {
  label: '详情',
}];

const globalBtn = [{
  label: '返回',
  to: '/cloan-apply-record',
}];

@connect(({ cLoanApply, loading }) => ({
  applyRecordDetail: cLoanApply.applyRecordDetail,
  loading: loading.effects['cLoanApply/fetchApplyRecordDetail'],
}))
export default class CApplyDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAgreementModal: false,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { params: { id } } = match;
    this.fetchDetail(id);
  }

  fetchDetail = (id) => {
    this.props.dispatch({
      type: 'cLoanApply/fetchApplyRecordDetail',
      payload: {
        id,
      },
    });
  }

  onShowAgreementModal = (show) => {
    this.setState({
      showAgreementModal: show,
    });
  }

  render() {
    const { showAgreementModal } = this.state;
    const { loading, applyRecordDetail } = this.props;
    const {
      applyInfo = {},
      approveInfo = {},
      estimateInfo = {},
      projectInfo = {},
      type,
    } = applyRecordDetail;

    return (
      <Spin spinning={loading}>
        <ZcyBreadcrumb routes={breadcrumb} globalBtn={globalBtn} />
        <Panel className="loan-apply-detail" title="贷款申请记录详情">
          <BaseInfo projectInfo={projectInfo} />
          <ApplyInfo applyInfo={applyInfo} type={type} />
          <EstimateInfo estimateInfo={estimateInfo} />
          <ProtocolInfo handleClick={this.onShowAgreementModal} />
          <ApproveInfo approveInfo={approveInfo} />
        </Panel>
        {
          showAgreementModal ? (
            <AgreementInfoModal
              visible={showAgreementModal}
              onCancel={() => this.onShowAgreementModal(false)}
            />
          ) : null
        }
      </Spin>
    );
  }
}
