'use strict';

const kexpress = require('kexpress');
const Action = kexpress.core.action.Action;
const prehandlers = require('./model.pspec');
const {
    Model,
    Param
} = require('../models/index')

  const actionCreateModel = Action.Create({

    name: 'CreateModel',
    summary: '',
    description: '',
    prehandlers: prehandlers.actionCreateModel,
    /**
    * Action handler
    * @param {express.core.Request} req - The HTTP request of express.
    * @param {express.core.Response} res - The HTTP response of express.
    * @param {kexpress.HandleContext} ctx - The context data of kexpress.
    */
    async handler(req, res, ctx) {
      const { modelDao,paramDao } = ctx.store.default;
      const type=req.body.type;
      const description=req.body.description;
      const modelname= req.body.modelname;
      const inputparams = JSON.parse(req.body.inputparams);
      const outparams = JSON.parse(req.body.outparams);
      const one = await modelDao.findOne({
        name: modelname
      });
      if (one) {
        throw new ctx.errors.ModelExist();
      }
      const model = new Model({
        name: modelname,
        type: type,
        description: description,
        status: '已审核',
        createdAt: new Date().getTime()
      });
      for await (const param of inputparams) {
        let p = new Param(param);
        let object = await paramDao.create(p);
        model['inputparams'].push(object);
      }
      for await (const param of outparams) {
        let p = new Param(param);
        let object = await paramDao.create(p);
        model['outparams'].push(object);
      }
      let m = await modelDao.create(model);
      res.json({
        msg: 'success',
        id: m.id
      });
    }
  });

  const actionUpdateModel = Action.Create({

    name: 'UpdateModel',
    summary: '',
    description: '',
    prehandlers: prehandlers.actionUpdateModel,
    /**
    * Action handler
    * @param {express.core.Request} req - The HTTP request of express.
    * @param {express.core.Response} res - The HTTP response of express.
    * @param {kexpress.HandleContext} ctx - The context data of kexpress.
    */
    async handler(req, res, ctx) {
      const { modelDao } = ctx.store.default;   
      const modelname=req.body.modelname;

      
      const model = await modelDao.findOne({
        name: modelname
      });
      if (!model) {
        throw new ctx.errors.ModelNotExist();
      }
      
      for (const key in req.body){
        if(req.body[key]!= ''){
          model[key]= req.body[key];
        }
      }
      
      await modelDao.updateOne(model);
      res.json({
        msg: 'success',
      });
    }
  });

  const actionGetModels = Action.Create({
    name: 'GetModels',
    summary: '',
    description: '获取模型',
    prehandlers: prehandlers.actionGetModels,
    /**
    * Action handler
    * @param {express.core.Request} req - The HTTP request of express.
    * @param {express.core.Response} res - The HTTP response of express.
    * @param {kexpress.HandleContext} ctx - The context data of kexpress.
    */
    async handler(req, res, ctx) {
      const  { modelDao } = ctx.store.default;
      let where = {}
      if (req.query.status) {
          where['status'] = req.query.status
      }

      const {
        skip,
        limit
      } = req.query;
      let models = await modelDao.query(where)
      .skip(skip)
      .limit(limit)
      .execute();
     
      let result = await   Model.$extractArray(models, {
        includes: {
            name : true,
            description: true,
            type: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            inputparams:{
                type:true,
                default:true,
                name: true
            },
            outparams:{
                type:true,
                default:true,
                name: true
            },
        }
    });
      res.json({
        result: result,
      });
    }
  });
  
  const actionGetModel = Action.Create({
    name: 'GetModel',
    summary: '',
    description: '根据id模型',
    prehandlers: prehandlers.actionGetModel,
    /**
    * Action handler
    * @param {express.core.Request} req - The HTTP request of express.
    * @param {express.core.Response} res - The HTTP response of express.
    * @param {kexpress.HandleContext} ctx - The context datai of kexpress.
    */
    async handler(req, res, ctx) {
    const  { modelDao } = ctx.store.default;
    const id = req.params.id;
    const one = await modelDao.findOne({
    id: id,
    });
    if (!one){
    throw new ctx.errors.ModelNotExist();
    }
    let result = await one.$extract({
    includes: {
        name : true,
        description: true,
        type: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        inputparams:{
            type:true,
            default:true,
            name: true
        },
        outparams:{
            type:true,
            default:true,
            name: true
        },
    }
    });
    res.json(result);
    }
  });
  
  const actionDeleteModel = Action.Create({
    name: 'DeleteModel',
    summary: '',
    description: '删除模型',
    prehandlers: prehandlers.actionDeleteModel,
    /**
    * Action handler
    * @param {express.core.Request} req - The HTTP request of express.
    * @param {express.core.Response} res - The HTTP response of express.
    * @param {kexpress.HandleContext} ctx - The context data of kexpress.
    */
    async handler(req, res, ctx) {
        const  { modelDao } = ctx.store.default;
        const id = req.params.id;
        const one = await modelDao.findOne({
        id: id,
        });
        if (!one){
        throw new ctx.errors.ModelNotExist();
        }
        await modelDao.remove(one);
        res.json({ 
        msg: 'success'
        });
    }
  });
  
  module.exports = {
    actionCreateModel,
    actionUpdateModel,
    actionGetModels,
    actionGetModel,
    actionDeleteModel
  };
  