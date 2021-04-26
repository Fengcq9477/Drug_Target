'use strict';

const kexpress = require('kexpress');
const Action = kexpress.core.action.Action;

const prehandlers = require('./object-set.pspec');

const actionCreateObjectSet = Action.Create({
  name: 'CreateObjectSet',
  summary: '',
  description: '',
  prehandlers: prehandlers.actionCreateObjectSet,
  /**
  * Action handler
  * @param {express.core.Request} req - The HTTP request of express.
  * @param {express.core.Response} res - The HTTP response of express.
  * @param {kexpress.HandleContext} ctx - The context data of kexpress.
  */
  async handler(req, res) {
    res.json({
    });
  }
});

const actionGetObjectSets = Action.Create({
  name: 'GetObjectSets',
  summary: '',
  description: '',
  prehandlers: prehandlers.actionGetObjectSets,
  /**
  * Action handler
  * @param {express.core.Request} req - The HTTP request of express.
  * @param {express.core.Response} res - The HTTP response of express.
  * @param {kexpress.HandleContext} ctx - The context data of kexpress.
  */
  async handler(req, res) {
    res.json({
    });
  }
});

const actionGetObjectSet = Action.Create({
  name: 'GetObjectSet',
  summary: '',
  description: '',
  prehandlers: prehandlers.actionGetObjectSet,
  /**
  * Action handler
  * @param {express.core.Request} req - The HTTP request of express.
  * @param {express.core.Response} res - The HTTP response of express.
  * @param {kexpress.HandleContext} ctx - The context data of kexpress.
  */
  async handler(req, res) {
    res.json({
    });
  }
});

module.exports = {
  actionCreateObjectSet,
  actionGetObjectSets,
  actionGetObjectSet,
};
