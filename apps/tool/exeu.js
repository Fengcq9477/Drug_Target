var exec = require('child_process').exec;
function exec_sh(path,model,args,mail,callback1,callback2){
    let exec_l = 'nohup sh /home/fcq2/Server/shell.sh \'' + path + '\' \'' + model+'\''+' > '+path+'/output.txt '+' 2>&1';
    //let exec_l = 'nohup python /home/fcq2/Server/test.py > /home/fcq2/Server/out.txt 2>&1';
    // let exec_l = 'mkdir '+ path + "\\result";
    console.log(exec_l)
    exec(exec_l,function(error,stdout,stderr){
        if(error) {
            console.log("Failed!");
            callback1(stderr,exec_l,args.log,mail)
        }else{
            console.log("Finished!");
            callback2(stdout,exec_l,args.log,mail)
        }
    });

}

module.exports = {
    exec_sh
  };