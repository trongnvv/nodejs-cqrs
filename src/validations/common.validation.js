const Joi = require("joi");
const mongoose = require("mongoose");

const isObjectID = Joi.string().custom((value, helper) => {
  if (value) {
    if (mongoose.Types.ObjectId.isValid(value)) return true;
    return helper.message("Invalid objectId");
  }
  return true;
});

const create = Joi.object({ fullName: Joi.string().required() });

module.exports = {
  create,
  edit: create.keys({ id: isObjectID }),
  remove: Joi.object({ id: isObjectID }),
};
