const { fetchAPI } = require("../utils");
const { ELASTICSEARCH_HOST } = require("../../config");
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

const edit = (data) => {};

const remove = (id) => {};

module.exports = {
  create,
  edit,
  remove,
};
