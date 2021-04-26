var exec = require('child_process').exec;
function exec_mv(dstpath,callback,inputlist){
    // let exec_l = 'nohup mv ' + srcpath + 'Tumor.csv '+dstpath; 
    for(var i=0;i<inputlist.length;i++){
        if (inputlist[i]['type'] == 'file'){
            const dst=dstpath+String(inputlist[i]['name']);
             let exec_1='nohup mv '+inputlist[i]['value']+' '+dst;
            //let exec_1=' mv '+inputlist[i]['value']+' '+dst;
            exec(exec_1,function(error,stdout,stderr){
                if(error) {
                    callback(stderr,exec_l);
                }
            });
        }
    }
    


    

}
module.exports = {
    exec_mv
  };