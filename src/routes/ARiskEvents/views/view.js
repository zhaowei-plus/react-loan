import React, { Component } from 'react';
import {
  ZcyBreadcrumb,
  Spin,
  Panel,
} from 'doraemon';
import { connect } from 'dva';
import { getGlobalBtn, getDetailRoutes } from '../config';

import HeaderInfo from '../component/HeaderInfo';
import BaseInfo from '../component/BaseInfo';
import SupplierInfo from '../component/SupplierInfo';

import ApproveModal from '../modal/ApproveModal';
import './index.less';

@connect(({ riskEvents, loading, privileges }) => ({
  detail: riskEvents.detail,
  loading: loading.effects['riskEvents/fetchDetail'] || loading.effects['riskEvents/fetchTimeline'],
  privileges: privileges['/risk-events/approve'],
}))
export default class RiskEvents extends Component {
  constructor(props) {
    super(props);
    const { path, params = {} } = this.props.match;
    const { id } = params;
    this.id = id;
    this.isApprove = path.indexOf('approve') > -1;
    this.state = {
      showApproveModal: false,
    };
  }
  componentDidMount() {
    this.id = this.props.match.params.id;
    this.fetchDetail(this.id);
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'riskEvents/resetDetail',
    });
  }

  fetchDetail = (id) => {
    this.props.dispatch({
      type: 'riskEvents/fetchDetail',
      payload: {
        id,
      },
    });
  }

  // 审批
  approve = () => {
    const { showApproveModal } = this.state;
    this.setState({
      showApproveModal: !showApproveModal,
    });
  }

  goBack = () => {
    this.props.history.goBack();
  }

  render() {
    const { loading = false, detail = {} } = this.props;
    const { riskRecord = {}, supplierInfo = {} } = detail;
    const { showApproveModal } = this.state;
    const globalBtn = getGlobalBtn(this, riskRecord.status);
    const routes = getDetailRoutes(this.isApprove);
    return (
      <Spin
        spinning={loading}
      >
        <ZcyBreadcrumb
          routes={routes}
          globalBtn={globalBtn}
        />
        <HeaderInfo
          detail={detail}
        />
        <Panel title="基础信息">
          <BaseInfo riskRecord={riskRecord} />
          <SupplierInfo supplierInfo={supplierInfo} />
        </Panel>
        {
          showApproveModal ? (
            <ApproveModal
              visible={showApproveModal}
              id={this.id}
              riskRecord={riskRecord}
              onCancel={this.approve}
            />
          ) : null
        }
      </Spin>
    );
  }
}
