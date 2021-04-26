'use strict';
const {
    Model,
    Task, 
} = require('../models/index');
const {
  TaskExist, ModelExist,ModelNotExist,TaskNotExist,FileNotFound,FileEmpty
} = require('../config/errors');

module.exports = {
  actionCreateTask: {
    request: {
      contentType: 'application/json',
      body: {
        taskname: 'string*',
        description: 'string*',
        rawurl: 'string*',
        // rawtype: 'string*',
        modelname: 'string*',
        inputparams: 'string*',
        outparams: 'string*',
        mail: 'string*',
      }
    },
    response: {
      200: {
      },
      404: {
        errors: {
            ModelNotExist,FileNotFound
        }
      },
      403: {
        errors: {
            TaskExist, ModelExist,FileEmpty
        }
      },
      contentType: 'application/json'
    },
    store: {
      default: {
        Model,
        Task, 
      }
    },
  },
  actionUpdateStatus: {
    request: {
      contentType: 'application/json',
      body: {
        id: 'string*',
        status: 'string*'
      }
    },
    response: {
      200: {
      },
      404: {
        errors: {
            TaskNotExist
        }

      },
      403: {
        errors: {
        }
      },
      contentType: 'application/json'
    },
    store: {
      default: {
        Task
      }
    }
  },
  actionGetTasks: {
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
        },
        status: 'string',
      }
    },
    response: {
      200: {
      },
      contentType: 'application/json'
    },
    store: {
      default: {
        Task
      }
    }
  },
  actionGetTask: {
    request: {
      contentType: 'application/json',
      query: {
        id: 'string',
        name: 'string',
      }
    },
    response: {
      200: {
      },
      contentType: 'application/json'
    },
    store: {
      default: {
        Task
      }
    }
  },
};
