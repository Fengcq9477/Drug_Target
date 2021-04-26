'use strict';

const kexpress = require('kexpress');
const Router = kexpress.core.router.Router;
const actions = require('../actions/object-set');

const router = new Router({
  name: 'objectSet',
  description: '对象集管理'
});

router.post('/', actions.actionCreateObjectSet);
router.get('/', actions.actionGetObjectSets);
router.get('/:objectSetId', actions.actionGetObjectSet);

module.exports = {
  router
};
