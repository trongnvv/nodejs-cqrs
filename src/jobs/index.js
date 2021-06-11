const { kafka: kafkaConfig } = require("../../config");
const { create, edit, remove } = require("./sync-friends");

const createInstance = async (kafka, config, handleCallback) => {
  try {
    const { TOPIC, GROUP } = config;
    const consumer = kafka.consumer({ groupId: GROUP });
    await consumer.connect();
    await consumer.subscribe({ topic: TOPIC, fromBeginning: true });
    await consumer.run({
      eachMessage: ({ message }) =>
        handleCallback(JSON.parse(message.value.toString())),
    });
  } catch (e) {
    console.error(`[KAFKA] [ERROR] ${e.message}`, e);
  }
};

module.exports = () => {
  const { kafka } = require("../utils");
  createInstance(kafka, kafkaConfig.syncFriendCreate, create);
  createInstance(kafka, kafkaConfig.syncFriendEdit, edit);
  createInstance(kafka, kafkaConfig.syncFriendRemove, remove);
};
