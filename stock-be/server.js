const express = require("express");
//利用 express 這個框架建立一個 web app
const app = express();

// app.[Method]
// det, post, put, patch, delete, option, head
app.get("/", (req, res) => {
  res.send("Hello Express");
});

app.listen(3001, () => {
  console.log("Server running at port 3001");
});
