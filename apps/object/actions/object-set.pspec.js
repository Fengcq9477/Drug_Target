'use strict';

const {
  ObjectSetNotFound,
} = require('../config/errors');

module.exports = {
  actionCreateObjectSet: {
    request: {
      contentType: 'application/json',
      body: {
        name: 'string*',
        description: 'string*'
      }
    },
    response: {
      200: {
        data: {
          id: 'string*',
          name: 'string*',
          description: 'string*'
        }
      },
      contentType: 'application/json'
    },
    store: {
      default: {
      }
    }
  },
  actionGetObjectSets: {
    request: {
      contentType: 'application/json',
      query: {
        skip: {
          $type: 'integer',
          $default: 0
        },
        limit: {
          $type: 'integer',
          $default: 10
        }
      }
    },
    response: {
      200: {
        data: [
          {
            id: 'string*',
            naem: 'string*',
            description: 'string*'
          }
        ]
      },
      contentType: 'application/json'
    },
    store: {
      default: {
      }
    }
  },
  actionGetObjectSet: {
    request: {
      contentType: 'application/json',
      params: {
        objectSetId: 'string*'
      }
    },
    response: {
      200: {
        data: [
          {
            id: 'string*',
            name: 'string*',
            description: 'string*'
          }
        ]
      },
      404: {
        errors: {
          ObjectSetNotFound
        }
      },
      contentType: 'application/json'
    },
    store: {
      default: {
      }
    }
  },
};
