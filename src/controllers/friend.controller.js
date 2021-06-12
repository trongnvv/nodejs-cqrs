const mongoose = require("mongoose");
const HSC = require("http-status-codes");
const { FriendModel } = require("../models");
const { sendMessageKafka } = require("../utils");
const { kafka: kafkaConfig } = require("../../config");
const { read: readElastic } = require("../services/sync-elastic.service");

const index = "service_collection";

const read = async (req) => {
  try {
    const rs = await readElastic(index);
    const result = rs.hits.hits.map((v) => v._source);
    const total = rs.hits.total.value;
    return { total, result };
  } catch (error) {
    next({
      status: HSC.BAD_REQUEST,
      message: "Data not found!",
    });
  }
};

const create = async (req) => {
  const { fullName } = req.body;
  const friend = await FriendModel.create({ fullName });
  sendMessageKafka(kafkaConfig.syncFriendCreate.TOPIC, {
    index,
    data: { _id: friend._id, fullName },
  });
  req.message = "Created successfully!";
};

const edit = async (req, res, next) => {
  const { id } = req.params;
  const { fullName } = req.body;
  const friend = await FriendModel.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(id) },
    { fullName }
  );

  if (!friend) {
    next({
      status: HSC.BAD_REQUEST,
      message: "Data not found!",
    });
    return;
  }
  sendMessageKafka(kafkaConfig.syncFriendEdit.TOPIC, {
    index,
    data: { _id: friend._id, fullName },
  });
  req.message = "Edited successfully!";
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  const rs = await FriendModel.findOneAndRemove({
    _id: mongoose.Types.ObjectId(id),
  });
  if (!rs) {
    next({
      status: HSC.BAD_REQUEST,
      message: "Data not found!",
    });
    return;
  }
  sendMessageKafka(kafkaConfig.syncFriendRemove.TOPIC, {
    index,
    data: { _id: rs._id },
  });
  req.message = "Deleted successfully!";
};

module.exports = {
  read,
  create,
  edit,
  remove,
};
