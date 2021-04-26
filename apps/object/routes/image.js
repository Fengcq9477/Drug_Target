'use strict';

const kexpress = require('kexpress');
const Router = kexpress.core.router.Router;
const actions = require('../actions/image');

const router = new Router({
  name: 'image',
  description: '图像管理'
});

router.post('/', actions.actionCreateImage);
router.get('/', actions.actionGetImages);

module.exports = {
  router
};
