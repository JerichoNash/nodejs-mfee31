const express = require("express");
//利用 express 這個框架建立一個 web app
const app = express();

require("dotenv").config();
const mysql2 = require("mysql2/promise");

let pool = mysql2.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  // 限制 pool 連線數的上限
  connectionLimit: 10,
});

// 如果要讓 express 認得 json 資料
// request Content-Type: application/json
// 需要加上這個中間件
app.use(express.json());

// 允許跨源存取
// 預設是全部開放
// 也可以部份限制,參考 npm cors 的文件
const cors = require("cors");
app.use(cors());

// middleware => pipeline pattern

// 設定express 處裡靜態檔案
// -> express 內建-> 不需要安裝任何東西
// app.use(express.static('./static'));
// http://localhost:3001/2048/
app.use("/2048", express.static("./static"));

// 中間件
app.use((req, res, next) => {
  console.log("這裡是第一個中間件 A");
  req.mfee31 = "前端班";
  req.dt = new Date().toISOString();
  next();
});
app.use((req, res, next) => {
  console.log("這裡是第一個中間件 B");
  next();
});

// app.[Method]
// get, post, put, patch, delete, option, head

// 路由中間件
app.get("/", (req, res, next) => {
  console.log("這裡是首頁", req.mfee31, req.dt);
  res.send("Hello Express 2");
});

app.get("/api", (req, res, next) => {
  res.json({
    name: "John",
    age: 8,
  });
});

app.get("/api/stocks", async (req, res, next) => {
  // let result = await connection.query('SELECT * FROM stocks')
  // let data = result[0]

  let [data] = await pool.query("SELECT * FROM stocks");
  res.json(data);
});

// localhost:3001/api/stocks/2330
// req.params.stockId => 2330
// SELECT * FROM stock_prices WHERE stock_id=2330

// sql injection
// localhost:3001/api/stocks/1234 or 1=1;--
// req.params.stockId => 1234 or 1=1;--
// SELECT * FROM stock_prices WHERE stock_id=1234 or 1=1;--

app.get("/api/stocks/:stockId", async (req, res, next) => {
  console.log("/api/stocks/:stockId => ", req.params.stockId);
  // 會用 prepared statement 的方式來避免發生 sql injection
  let [data] = await pool.query("SELECT * FROM stock_prices WHERE stock_id=?", [
    req.params.stockId
  ]);
  res.json(data);
});

// hw
app.post('/api/stocks', (req, res) => {
  console.log('POST /api/stocks', req.body);
  // req.body.stockId, req.body.stockName
  // TODO: 完成 insert
  // let results = await pool.query("");
  // console.log(results);
  res.json({});
});
// ---

app.use((req, res, next) => {
  console.log("這是一個中間件 C");
  next();
});

app.get("/test", (req, res, next) => {
  console.log("這裡是test頁面");
  res.send("Hello Test 1");
});

// 放在所有路由中間件的後面
// 前面所有的路由都比不到對的網址時,就會掉到這裡來
// -->
app.use((req, res, next) => {
  console.log("這裡是 404");
  res.send("沒有這個網頁啦");
});

app.listen(3001, () => {
  console.log("Server running at port 3001");
});
