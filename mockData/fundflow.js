const Mock = require('mockjs')

module.exports = {
  '/api/fundsFlow': () => {
    const data = Mock.mock({
      "success|1-1": true,
      "result|1-50": [
        {
          "key|+1": 1,
          "time|+1": "2019-01-03 16:18:11",
          "type": "借款本金放款",
          "income|1-3": 3,
          "tradeChannel": "中国农业银行",
          "account": "中国农业银行 6222 2222 2222 2222",
          "remark": "款借款编号本息还款支出",
        }
      ],
      "error": null
    });
    return data;
  },
  '/api/loan/supplier/capitalFlow': () => {
    return Mock.mock({"success":true,"result":{"total":20,"data":[{"id":1,"tradeTime":"2019-02-11 11:56:01","customerName":"浙江省直同人建设有限公司","tradeType":1,"tradeAmount":1000,"amountType":2,"remark":"xxx","bankAbstract":"xx","tradeChannel":"农行","tradeAccount":"123456789"},{"id":2,"tradeTime":"2019-02-12 11:56:01","customerName":"浙江省直同人建设有限公司","tradeType":2,"tradeAmount":100,"amountType":1,"remark":"xxx","bankAbstract":"xx","tradeChannel":"农行","tradeAccount":"123456789"},{"id":3,"tradeTime":"2019-02-13 11:56:01","customerName":"浙江省直同人建设有限公司","tradeType":2,"tradeAmount":100,"amountType":1,"remark":"xxx","bankAbstract":"xx","tradeChannel":"农行","tradeAccount":"123456789"},{"id":4,"tradeTime":"2019-02-14 11:56:01","customerName":"浙江省直同人建设有限公司","tradeType":2,"tradeAmount":100,"amountType":1,"remark":"xxx","bankAbstract":"xx","tradeChannel":"农行","tradeAccount":"123456789"},{"id":5,"tradeTime":"2019-02-15 11:56:01","customerName":"浙江省直同人建设有限公司","tradeType":1,"tradeAmount":1000,"amountType":2,"remark":"xxx","bankAbstract":"xx","tradeChannel":"农行","tradeAccount":"123456789"},{"id":6,"tradeTime":"2019-02-16 11:56:01","customerName":"浙江省直同人建设有限公司","tradeType":2,"tradeAmount":100,"amountType":1,"remark":"xxx","bankAbstract":"xx","tradeChannel":"农行","tradeAccount":"123456789"},{"id":7,"tradeTime":"2019-02-17 11:56:01","customerName":"浙江省直同人建设有限公司","tradeType":2,"tradeAmount":100,"amountType":1,"remark":"xxx","bankAbstract":"xx","tradeChannel":"农行","tradeAccount":"123456789"},{"id":8,"tradeTime":"2019-02-18 11:56:01","customerName":"浙江省直同人建设有限公司","tradeType":3,"tradeAmount":100,"amountType":1,"remark":"xxx","bankAbstract":"xx","tradeChannel":"农行","tradeAccount":"123456789"},{"id":9,"tradeTime":"2029-02-19 11:56:02","customerName":"浙江省直同人建设有限公司","tradeType":1,"tradeAmount":1000,"amountType":2,"remark":"xxx","bankAbstract":"xx","tradeChannel":"农行","tradeAccount":"123456789"},{"id":10,"tradeTime":"2029-02-20 11:56:02","customerName":"浙江省直同人建设有限公司","tradeType":2,"tradeAmount":100,"amountType":1,"remark":"xxx","bankAbstract":"xx","tradeChannel":"农行","tradeAccount":"123456789"}],"pageNum":1,"pageSize":10,"pages":2,"size":10},"error":null});
  }
}

