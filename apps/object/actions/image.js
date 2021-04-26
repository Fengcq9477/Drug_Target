'use strict';

const kexpress = require('kexpress');
const Action = kexpress.core.action.Action;

const prehandlers = require('./image.pspec');

const actionCreateImage = Action.Create({
  name: 'CreateImage',
  summary: '',
  description: '',
  prehandlers: prehandlers.actionCreateImage,
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

const actionGetImages = Action.Create({
  name: 'GetImages',
  summary: '',
  description: '',
  prehandlers: prehandlers.actionGetImages,
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
  actionCreateImage,
  actionGetImages,
};
