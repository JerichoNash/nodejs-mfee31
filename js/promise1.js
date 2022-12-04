let doWorkPromise = function(job, timer){
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
            let now = new Date();
            resolve(`完成工作 ${job} at ${now.toISOString()}`);
        }, timer);
    })
}

let now = new Date();
console.log(`工作開始 at ${now.toISOString()}`);
let brushPromise = doWorkPromise(`刷牙`, 3000);
brushPromise
    .then((data) =>{
        console.log(data);
    })
    .catch((err) =>{
        console.error(`發生錯誤`, err);
    });
