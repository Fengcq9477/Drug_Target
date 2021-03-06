'use strict';

const um = require('unique-model');
const model = um.model;
const types = um.type;

const UString = types.UString;
const UObject = types.UObject;
const UDateTime = types.UDateTime;

const Task = model.createModel('Task', {
  name: UString(),
  description: UString(),
  model: UObject({
    type: 'Model'
  }),
  modelname:UString(),
  status: UString(),
  log: UString(),
  stdout: UString(),
  mail: UString(),
  createdAt: UDateTime(),
  updatedAt: UDateTime(),
  finishedAt: UDateTime(),
  inputparams: UString(),
  outparams: UString()
}, 'tasks');

module.exports = {
  Task
};
