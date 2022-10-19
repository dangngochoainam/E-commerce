const dotenv = require('dotenv')
dotenv.config()
const app = require('./app')

app.listen(process.env.PORT || 8081, (req, res) => {
    console.log("Connected successfully !!")
})

// const dotenv = require("dotenv");
// dotenv.config();
// const app = require("./app");

// const http = require("http");
// const server = http.createServer(app);

// server.listen(process.env.PORT, (req, res) => {
//   console.log("Connected successfully !!");
// });
