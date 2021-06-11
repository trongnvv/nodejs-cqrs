"use strict";

var HttpStatus = require("http-status-codes");

module.exports = module.exports.default = function (req, res, next) {
  if (!req.hasOwnProperty("data") && !req.hasOwnProperty("result")) {
    next({
      success: false,
      code: HttpStatus.NOT_FOUND,
      message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
    });
  }
  next({
    success: true,
    message: req.message,
    data: req.data,
    result: req.result,
  });
};
