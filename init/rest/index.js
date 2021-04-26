'use strict';

module.exports = {
  name: 'Drug_Target',
  version: '1.0.0-alpha.1',
  description: 'Description',
  basePath: '/Drug_Target/v1',
  apps: {
    account: require('./account'),
    object: require('./object')
  }
};
