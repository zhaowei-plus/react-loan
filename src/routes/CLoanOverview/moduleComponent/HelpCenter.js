import React from 'react';
import { Row, Col, Icon, Panel } from 'doraemon';

const HelpCenter = (props) => {
  const { helpCenterInfo = [], onlyQuestion, col = 3, contentStyle = {} } = props;


  const helpWrapStyle = onlyQuestion ? {} : { height: '84px' };

  return (
    <Panel>
      {
        onlyQuestion ? null : (
          <span className="panel-sub-title">
               帮助中心
          </span>
        )
      }

      <Row gutter={24}>
        {helpCenterInfo && helpCenterInfo.map((helpInfo, index) => {
          if (index > 4) {
            return null;
          }

          const href = helpInfo.url ? { href: `http:${helpInfo.url}` } : {};
          return (
            <Col span={24 / col} key={helpInfo.id}>
              <div className="help-wrap" style={helpWrapStyle}>
                <div className="title">
                  <Icon type="question-circle" />&nbsp;
                  <a
                    className="title"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...href}
                  >
                    {helpInfo.title}
                  </a>
                </div>
                <div className="content" style={contentStyle}>
                  {helpInfo.content}
                </div>
              </div>
            </Col>
          );
        })}
        {!onlyQuestion && (
          <Col span={8} key="more">
            <div className="help-wrap" style={helpWrapStyle}>
              <a
                href="https://help.zcygov.cn"
                className="title"
                target="_blank"
                rel="noopener noreferrer"
              >
                {'更多内容请至"帮助中心-供应商-融资贷款"目录查看'}
              </a>
            </div>
          </Col>
        )}
      </Row>
    </Panel>

  );
};


export default HelpCenter;
