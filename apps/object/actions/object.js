'use strict';

const kexpress = require('kexpress');
const Action = kexpress.core.action.Action;

const prehandlers = require('./object.pspec');

const actionCreateObject = Action.Create({
  name: 'CreateObject',
  summary: '',
  description: '',
  prehandlers: prehandlers.actionCreateObject,
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

const actionGetObjects = Action.Create({
  name: 'GetObjects',
  summary: '',
  description: '',
  prehandlers: prehandlers.actionGetObjects,
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
  actionCreateObject,
  actionGetObjects,
};
