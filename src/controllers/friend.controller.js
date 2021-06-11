const mongoose = require("mongoose");
const HSC = require("http-status-codes");
const { FriendModel } = require("../models");
const { sendMessageKafka } = require("../utils");

const read = async (req) => {
  const rs = await FriendModel.find({})
    .sort({ createdAt: -1 })
    .select("title description color type")
    .lean();
  return rs;
};

const create = async (req) => {
  const { fullName } = req.body;
  await FriendModel.create({ fullName });
  req.message = "Created successfully!";
};

const edit = async (req, res, next) => {
  const { id } = req.params;
  const { fullName } = req.body;
  const rs = await FriendModel.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(id) },
    { fullName }
  );

  if (!rs) {
    next({
      status: HSC.BAD_REQUEST,
      message: "Data not found!",
    });
    return;
  }

  req.message = "Edited successfully!";
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  const rs = await FriendModel.findOneAndRemove({
    _id: mongoose.Types.ObjectId(id),
    userID: req.user.userId,
  });
  if (!rs) {
    next({
      status: HSC.BAD_REQUEST,
      message: "Data not found!",
    });
    return;
  }
  req.message = "Deleted successfully!";
};

module.exports = {
  read,
  create,
  edit,
  remove,
};
