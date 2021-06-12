const { create, edit, remove } = require("../services/sync-elastic.service");

module.exports = {
  create: (data) => create(data),
  edit: (data) => edit(data),
  remove: (data) => remove(data),
};
