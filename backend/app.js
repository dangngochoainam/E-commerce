const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileupload = require('express-fileupload')
// const bodyParser = require("body-parser");


const app = express();

// Middleware

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileupload({
    useTempFiles: true
}));

app.use(morgan("common"));

// Routes
const indexRouter = require("./src/api/v1/routes/index");
app.use(indexRouter);

module.exports = app;
