module.exports = [{
  url: '/product-release/list',
}, {
  url: '/product-release/config/:id',
  view: 'config',
  models: ['config'],
}, {
  url: '/product-release/edit/:id',
  view: 'config',
  models: ['config'],
}, {
  url: '/product-release/create/:id',
  view: 'config',
  models: ['config'],
}, {
  url: '/product-release/view/:id',
  view: 'detail',
  models: ['config'],
}, {
  url: '/product-basic-config/edit/:id',
  view: 'config',
  models: ['config'],
}, {
  url: '/product-basic-config/create',
  view: 'config',
  models: ['config'],
}, {
  url: '/product-basic-config/view/:id',
  view: 'detail',
  models: ['config'],
}];

