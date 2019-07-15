import React from 'react';
import smartImg from '../image/smart-loan.jpeg';

const SmartCloudLoan = (props) => {
  const { toggleRecommend } = props;
  return (
    <div className="banner">
      <a onClick={() => {
        toggleRecommend('1');
      }}
      >
        <img
          src={smartImg}
          alt="云智贷"
          style={{ width: '100%', margin: '10px 0' }}
        />
      </a>
    </div>
  );
};

export default SmartCloudLoan;
