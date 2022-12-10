const fs = require('fs');
// Promise 是一個表示非同步運算的最終完成或失敗的物件。
let p = new Promise((resolve, reject) => {
    // error-first callback
      fs.readFile('test.txt', 'utf-8', (err, data) => {
        if (err) {
        // 如果 err 有值，表示有錯誤發生
        // 這裡應該要處理錯誤
          reject(err);
        } else {
        // 進來這裡，表示 err 是空的 (可能是 null)
          resolve(data);
        }
      });
    });
// async function doJob(){
//     let data = await p;
// }
// //函式名稱() -> 呼叫
// dojob();

// IIEF
(async ()=> {
    try{
        let data = await p;
        console.log('用await 拿到結果', data);
    }catch(e){
        console.log('catch 到錯誤', e);
    }
})();
// (function test() {})();