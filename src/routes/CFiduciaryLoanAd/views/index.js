import React, { Component } from 'react';
import './index.less';

export default class FiduciaryLoanAd extends Component {
  render() {
    return (
      <div className="fiduciary-loan-ad-wrapper">
        <header>
          <img src="https://sitecdn.zcycdn.com/zcy-front-other-upload/8cedd99fafe10ac874c5f70b3003c4b0.png" alt="ad" className="fiduciary-loan-ad-wrapper-header" />
        </header>
        <main>
          <div className="content-wrapper">
            <section className="features">
              <img src="https://sitecdn.zcycdn.com/zcy-front-other-upload/f440e6f72011375c39d3b0fa677089d1.png" alt="features" />
            </section>
            <section className="steps">
              <img src="https://sitecdn.zcycdn.com/zcy-front-other-upload/0b346f7d3d2211633fe46ff07ae187a4.png" width="772" alt="steps" />
            </section>
          </div>
          <section className="qualification">
            <img src="https://sitecdn.zcycdn.com/zcy-front-other-upload/3454fe585646f9e496952465416dc538.png" width="830" alt="qualification" />
          </section>
          <section className="materials">
            <img src="https://sitecdn.zcycdn.com/zcy-front-other-upload/f79e3702389c69cb116d57a19891cf5b.png" width="660" alt="" />
          </section>
        </main>
      </div>
    );
  }
}
