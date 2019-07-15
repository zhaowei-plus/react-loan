import React from 'react';
import { Modal } from 'doraemon';


const LoanRecommendLoading = (props) => {
  const { visible } = props;
  return (
    <Modal
      visible={visible}
      footer={null}
      width={320}
      wrapClassName="loan-recommend-loading"
      close
    >
      <div>
        <div className="ant-spin-nested-loading">
          <div className="ant-spin-dot ant-spin-dot-spin">
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
        <h1 className="title">
              云智贷
        </h1>
        <span>
              正在为您定制推荐贷款产品...
        </span>
        <br />
        <span>
              请勿关闭刷新页面
        </span>
      </div>

    </Modal>
  );
};


export default LoanRecommendLoading;
