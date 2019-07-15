const Mock = require('mockjs');

module.exports = {
  '/api/test': function () {
    const data = Mock.mock({
      'list|1-3': [{
        'id|1-100': 1,
        name: Mock.Random.cname(),
        'age|18-60': 1,
        email: Mock.mock('@EMAIL()'),
      }],
    });
    return data.list;
  },
};
