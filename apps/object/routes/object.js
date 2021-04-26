'use strict';

const kexpress = require('kexpress');
const Router = kexpress.core.router.Router;
const actions = require('../actions/object');

const router = new Router({
  name: 'object',
  description: '对象管理'
});

router.post('/', actions.actionCreateObject);
router.get('/', actions.actionGetObjects);

module.exports = {
  router
};
