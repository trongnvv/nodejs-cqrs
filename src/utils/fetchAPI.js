"use strict";

const axios = require("axios");

module.exports = async function fetch({
  url,
  method = "POST",
  headers,
  data = null,
  params = {},
}) {
  const response = await axios({
    url,
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: (headers && headers.authorization) || "",
      "uber-trace-id": (headers && headers["uber-trace-id"]) || "",
      "content-language": (headers && headers["content-language"]) || "",
    },
    params,
    data,
    timeout: 18000,
  });
  return response.data;
};
