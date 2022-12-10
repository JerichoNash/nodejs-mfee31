let doWorkPromise = function(job, timer){
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
            let now = new Date();
            resolve(`完成工作 ${job} at ${now.toISOString()}`)
        }, timer);
    })
}

let now = new Date();
console.log(`工作開始 at ${now.toISOString()}`);
let brushPromise = doWorkPromise(`刷牙`, 3000);

// 不知道為什麼 吃早餐 寫功課 let之後會變成同時跑...

// let eatbreafirst = doWorkPromise(`吃早餐`, 5000);
// let dohw = doWorkPromise(`寫功課`, 3000);

brushPromise
    .then((data) =>{
        console.log(data);
        return doWorkPromise(`吃早餐`, 5000);
    })
    .then((data) =>{
        console.log(data);
        return doWorkPromise(`寫功課`, 3000);
    })
    .then((data) =>{
        console.log(data);
    })
    .catch((err) =>{
        console.error(`發生錯誤`, err);
    })
    
    





