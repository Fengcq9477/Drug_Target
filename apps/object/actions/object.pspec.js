'use strict';


module.exports = {
  actionCreateObject: {
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
  actionGetObjects: {
    request: {
      contentType: 'application/json'
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
};
