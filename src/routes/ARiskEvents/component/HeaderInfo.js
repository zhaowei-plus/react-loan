import React from 'react';
import {
  Panel,
  ZcyStatusBar,
  ZcyTimeline,
  Steps,
} from 'doraemon';
import {
  formatString,
  getRelevantName,
} from 'commonUtils';
import { STATUS, STEP_LIST } from '../constants';

const { Step } = Steps;

export default function HeaderInfo(props) {
  const { detail = {} } = props;
  const {
    riskRecord = {},
    flowLogs = [],
  } = detail;

  const { code, reportTime, status, briefDesc } = riskRecord;

  const title = (
    <div className="panel-title-detail">
      <span className="title">
        {formatString(briefDesc)}
      </span>
      <div className="detail">
        <span style={{ paddingRight: '20px' }}>
          风险编号：{code}
        </span>
        报送时间：{reportTime}
      </div>
    </div>
  );

  const getStepStatus = (key, currentStatus) => {
    if (key === currentStatus) {
      return 'process';
    }
    if (key < currentStatus) {
      return 'finish';
    }
    return 'wait';
  };

  return (
    <Panel
      className="header-info-panel"
      title={title}
      extra={<ZcyStatusBar value={getRelevantName(status, STATUS)} />}
      shrink
    >
      <div className="steps">
        <Steps className="zcy-step step-top">
          {
            STEP_LIST.map((item) => {
              return (
                <Step
                  status={getStepStatus(item.key, status)}
                  key={item.key}
                  title={item.title}
                />
              );
            })
          }
        </Steps>
      </div>
      <ZcyTimeline
        data={flowLogs}
      />
    </Panel>
  );
}
