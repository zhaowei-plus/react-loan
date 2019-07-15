module.exports = [
  {
    url: '/risk-events/list',
    pageId: '/risk-events/approve',
  }, {
    url: '/risk-events/view/:id',
    view: 'view',
    pageId: '/risk-events/approve',
  }, {
    url: '/risk-events/approve/:id',
    view: 'view',
    pageId: '/risk-events/approve',
  },
];

