let doWorkPromise = function (job, timer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let now = new Date();
      resolve(`完成工作 ${job} at ${now.toISOString()}`);
    }, timer);
  });
};

let p1 = doWorkPromise("刷牙", 3000);
let p2 = doWorkPromise("吃早餐", 5000);
let p3 = doWorkPromise("寫功課", 3000);

// Promise.all([p1, p2, p3]).then((data) => {
//   console.log(data);
// });
(async () => {
  let data = await Promise.all([p1, p2, p3]);
  console.log("await 版本", data);
})();
