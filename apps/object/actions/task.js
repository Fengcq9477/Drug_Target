'use strict';
var exec = require('child_process').exec;
const util = require('util');
const kexpress = require('kexpress');
const path = require('path');
const fs = require("fs");
const marked = require( "marked" );
const Action = kexpress.core.action.Action;
const nodemail = require('../../tool/nodemailer');
const {
    exec_sh
} = require('../../tool/exeu');
const {exec_mv} = require('../../tool/execmv');
const prehandlers = require('./task.pspec');
const {
    Model,
    Task, 
} = require('../models/index');
// const { type } = require('unique-model');
// const { stringify } = require('querystring');

const actionCreateTask = Action.Create({

    name: 'CreateTask',
    summary: '',
    description: '',
    prehandlers: prehandlers.actionCreateTask,
    /**
    * Action handler
    * @param {express.core.Request} req - The HTTP request of express.
    * @param {express.core.Response} res - The HTTP response of express.
    * @param {kexpress.HandleContext} ctx - The context data of kexpress.
    */
    async handler(req, res, ctx) {
      const {taskDao, modelDao} = ctx.store.default;
      const rawurl = req.body.rawurl;
      const inputparams = req.body.inputparams;
      const outparams =  req.body.outparams;
      const description = req.body.description;
      const mail=req.body.mail;
      const model = await modelDao.findOne({
        name: req.body.modelname
      });
      console.log(inputparams);
      if (!model) {
        throw new ctx.errors.ModelNotExist();
      }
      const taskname=req.body.taskname;
      let t1 = await taskDao.findOne({
        name: taskname
      });
      if(t1){
        throw new ctx.errors.TaskExist();
      }
      const home =path.join( path.dirname(require.main.filename),'tasks/'+taskname+'/');
      if (!fs.existsSync(home)){
        fs.mkdirSync(home);
      }
      let inputlist=inputparams;
      if(!inputlist){
        inputlist='[]';
      }
      inputlist=JSON.parse(inputlist);
      for(var i=0;i<inputlist.length;i++)
        {
            if (inputlist[i]['type'] == 'file'){
              if(String(inputlist[i]['default']).trim()==''){
                throw new ctx.errors.FileEmpty();
              }
              inputlist[i]['value'] = path.join(path.join(path.dirname(require.main.filename), 'upload/'), String(inputlist[i]['default']));
              console.log(inputlist[i]['value']);
              const stat = util.promisify(fs.stat);
              async function readStats(dir) {
                  try {
                       let stats = await stat(dir);
                  } catch (err) { // Handle the error.
                       throw new ctx.errors.FileNotFound();
                    }
              }
              await readStats(inputlist[i]['value']);
            }
        }
      const task = new Task({
          name: taskname,
          description: description,
          model: model, 
          mail: mail,
          status: 'ready',
          modelname:model.name,
          inputparams: inputparams,
          outparams: outparams,
          createdAt: new Date().getTime()
      })

      let t = await taskDao.create(task);

      let callback = function (err,exeu) {
          t['status'] = 'initialize failed'
          t['stdout'] = exeu+ err;
          t['finishedAt'] = new Date(); 
          t['outparams'] =  JSON.stringify(outparams);
          taskDao.updateOne(t); 
    }
      exec_mv(home, callback,inputlist);
      
      res.json({
        msg: 'success',
        id: t.id
      });
    }
  });

  const actionUpdateStatus = Action.Create({

    name: 'UpdateStatus',
    summary: '',
    description: '',
    prehandlers: prehandlers.actionUpdateStatus,
    /**
    * Action handler
    * @param {express.core.Request} req - The HTTP request of express.
    * @param {express.core.Response} res - The HTTP response of express.
    * @param {kexpress.HandleContext} ctx - The context data of kexpress.
    */
    async handler(req, res, ctx) {
      
      const { taskDao } = ctx.store.default;
      const id= req.body.id;
      const status =req.body.status;

      let t = await taskDao.findOne({
        id: id
      });
      if (!t) {
        throw new ctx.errors.TaskNotExist();
      }

      t['status'] = status
      if (status == 'executing'){
        let task = await t.$extract({
            includes: {
                name: true,
                model: {
                type:true,
                },
                modelname:true,
                inputparams:true,
                outparams:true,
                description: true,
                status: true,
                mail:true,
            }
            });
            let callback1 = function (err,exeu, log,mail) {

                t['status'] = 'failed'
                t['stdout'] = exeu+ err;
                t['log'] = log
                t['finishedAt'] = new Date();
                t['outparams'] =  JSON.stringify(outparams);
                taskDao.updateOne(t);
                var mail = {
                  // 发件人
                  from: '<canceranaly_ustc@163.com>',
                  // 主题
                  subject: 'End of task execution',//邮箱主题
                  // 收件人
                  to:mail,//前台传过来的邮箱
                  // 邮件内容，HTML格式
                  text: 'Sorry, the execution of the task you added failed. If you have any questions, please contact us.'//发送验证码
                 };
                nodemail(mail);//发送邮件
            }
            let callback2 = function(stdout,exeu, log,mail) {
                t['status'] = 'success';
                t['stdout'] = exeu+stdout;
                t['log'] = log
                t['finishedAt'] = new Date();
                t['outparams'] = JSON.stringify(outparams);
                taskDao.updateOne(t);
                var mail = {
                  // 发件人
                  from: '<canceranaly_ustc@163.com>',
                  // 主题
                  subject: 'End of task execution',//邮箱主题
                  // 收件人
                  to:mail,//前台传过来的邮箱
                  // 邮件内容，HTML格式
                  text: 'Congratulations, the task you added was successfully executed, please go to 202.38.81.87:8180 to download the execution result.'//发送验证码
                 };
                nodemail(mail);//发送邮件
            }
            console.log(task.name);
            const home =path.join( path.dirname(require.main.filename),'tasks/'+task.name+'/');
            let inputparams = task.inputparams;
            let outparams = task.outparams;
          if (!inputparams) {
              inputparams = '[]'
          }
          if (!outparams) {
            outparams = '[]'
        } 
        inputparams=JSON.parse(inputparams);
        outparams=JSON.parse(outparams);
        for(var i=0;i<inputparams.length;i++)
        {
            if (inputparams[i]['type'] == 'file'){
              inputparams[i]['value'] = path.join(home, inputparams[i]['default']);
            }
        }
        for(var i=0;i<outparams.length;i++)
        {
            if (outparams[i]['type'] == 'file'){
              outparams[i]['value'] = path.join(path.join(home, 'result/'),outparams[i]['default']);
            }
        }
          const args = {
            inputparams: inputparams,
            outparams: outparams,
            log : task.name+'.log'
          }
          
          exec_sh(home,task.modelname,args,task.mail,callback1,callback2);
        //   if (task.model.type == 'R'){
        //       console.log('run R');
        //       exec_R(task.model.url,args,callback1,callback2);
        //   }
        //   if (task.model.type == 'python'){
        //     console.log('run python');
        //     exec_python(task.model.url,args,callback1,callback2);
        // }
      }

      await taskDao.updateOne(t);
      res.json({
        msg: 'success',
      });
    }
  });

  const actionGetTasks = Action.Create({
    name: 'actionGetTasks',
    summary: '',
    description: '获取任务',
    prehandlers: prehandlers.actionGetTasks,
    /**
    * Action handler
    * @param {express.core.Request} req - The HTTP request of express.
    * @param {express.core.Response} res - The HTTP response of express.
    * @param {kexpress.HandleContext} ctx - The context data of kexpress.
    */
    async handler(req, res, ctx) {
      const  { taskDao } = ctx.store.default;
      let where = {}
      if (req.query.status) {
          where['status'] = req.query.status
      }

      const {
        skip,
        limit
      } = req.query;
      let tasks = await taskDao.query(where)
      .skip(skip)
      .limit(limit)
      .execute();
     
      let result = await   Task.$extractArray(tasks, {
        includes: {
            name: true,
            description: true,
            model: {
                name: true,
            },
            modelname:true,
            status: true,
            stdout:true,
            createdAt: true,
            updatedAt: true,
            finishedAt: true,
            inputparams: true,
            outparams: true
        }
    });
    let alltask=await taskDao.query({}).execute();
    const count=alltask.length;
    console.log(count);
      res.json({
        result: result,
        count:count
      });
    }
  });
  
  const actionGetTask = Action.Create({
    name: 'actionGetTask',
    summary: '',
    description: '获取任务',
    prehandlers: prehandlers.actionGetTask,
    /**
    * Action handler
    * @param {express.core.Request} req - The HTTP request of express.
    * @param {express.core.Response} res - The HTTP response of express.
    * @param {kexpress.HandleContext} ctx - The context data of kexpress.
    */
    async handler(req, res, ctx) {
      const  { taskDao } = ctx.store.default;
      let where = {}
      if (req.query.id) {
          where['id'] = req.query.id;
      }
      if (req.query.name) {
        where['name'] = req.query.name;
    }


      let task = await taskDao.findOne(where);
     
      let result = await  task.$extract({
        includes: {
            name: true,
            description: true,
            model: {
                name: true,
            },
            modelname:true,
            log: true,
            status: true,
            stdout:true,
            createdAt: true,
            updatedAt: true,
            finishedAt: true,
            inputparams: true,
            outparams: true
        }
    });
    console.log(result);
    // let str;
    // if(task.log){
    //   fs.readFile(task.log, function(err, data){
    //     if(err){
    //         console.log(err);
    //         res.send("log not found！");
    //     }else{
    //          str = marked(data.toString());
    //         console.log(str);
    //         res.json({
    //           result: result,
    //           log: str
    //         });
    //     } 
    // });

    // }else {
      res.json({
        result: result
      });
    // }


    }
  });

  module.exports = {
    actionCreateTask,
    actionUpdateStatus,
    actionGetTasks,
    actionGetTask
  };
  