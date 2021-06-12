const { fetchAPI } = require("../utils");
const { ELASTICSEARCH_HOST } = require("../../config");
const read = async (index) => {
  try {
    const rs = await fetchAPI({
      url: `${ELASTICSEARCH_HOST}/${index}/_search`,
      method: "GET",
      data: {
        query: {
          match_all: {},
        },
      },
    });
    return rs;
  } catch (error) {
    console.log("[KAFKA][ERROR]", error.response.data);
  }
};

const create = async ({ index, data }) => {
  try {
    const { _id: refID, ...body } = data;
    const rs = await fetchAPI({
      url: `${ELASTICSEARCH_HOST}/${index}/_doc`,
      method: "POST",
      data: { refID, ...body },
    });
    console.log(rs);
  } catch (error) {
    console.log("[KAFKA][ERROR]", error.response.data);
  }
};

const edit = async ({ index, data }) => {
  try {
    const { _id: refID, fullName } = data;
    const rs = await fetchAPI({
      url: `${ELASTICSEARCH_HOST}/${index}/_update_by_query?scroll_size=10000`,
      method: "POST",
      data: {
        query: { match: { refID } },
        source: `ctx._source.fullName = ${fullName}`,
      },
    });
    console.log(rs);
  } catch (error) {
    console.log("[KAFKA][ERROR]", error.response.data);
  }
};

const remove = async ({ index, data }) => {
  try {
    const { _id: refID } = data;
    const rs = await fetchAPI({
      url: `${ELASTICSEARCH_HOST}/${index}/_delete_by_query?scroll_size=10000`,
      method: "POST",
      data: { query: { match: { refID } } },
    });
    console.log(rs);
  } catch (error) {
    console.log("[KAFKA][ERROR]", error.response.data);
  }
};

module.exports = {
  read,
  create,
  edit,
  remove,
};
