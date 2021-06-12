require("dotenv").config();
const logger = require("morgan");
const { errorHandle, notFoundHandle } = require("./src/utils");
const routers = require("./src/routes");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use("/api/v1", routers);
app.use(notFoundHandle);
app.use(errorHandle);

require("./config/db");
require("./src/jobs")();
module.exports = app;
