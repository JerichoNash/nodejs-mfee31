// axios await 版本
// 把 query string 抽出來當變數，用 params 的方式去設定

// 1. 安裝 npm i axios
// 2. 引用 require
// 3. 去讀官方文件
const axios = require("axios");
const fs = require("fs/promises");
const moment = require("moment");
const mysql2 = require("mysql2/promise");
// http://54.71.133.152:3000/stocks?stockNo=2618&date=202211
require("dotenv").config();
// let dotenv = require('dotenv');
// dotenv.config();

(async () => {
  let connection = await mysql2.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
  });
  try {
    let stockNo = await fs.readFile("stock.txt", "utf-8");
    let date = moment().format("YYYYMMDD");
    let response = await axios.get(`http://54.71.133.152:3000/stocks`, {
      params: {
        stockNo,
        date,
      },
    });

    let rawData = response.data.data;
    rawData.map((d) => {
      // d=>本身也是一個陣列
      // ['日期','成交股數','成交金額', '開盤價','最高價',   '最低價','收盤價', '漲跌價差','成交筆數']
    //   console.log("before", d);
      d = d.map((value) => {
        return value.replace(/[,X]/g, "");
      });

      // 111/12/15 => 2022-12-15
      // 111/12/15 => 1111215 +19110000 => 20221215

      let dt = parseInt (d[0].replace(/\//g, ""), 10) + 19110000;
    //   console.log("dt", dt);
      d[0] = moment(dt, "YYYYMMDD").format("YYYY-MM-DD");
      d.unshift(stockNo)

      let [result] = await connection.query('INSERT INTO stock_prices (stock_id, date, open_price, high_price, low_price, close_price, delta_price, transactions, volume, amount)',d)
      console.log(result);
      return d
    });

    // console.log("await", response.data.data);
  } catch (e) {
    console.error(e);
  } finally {
    if (connection) {
      connection.end();
    }
  }
})();
