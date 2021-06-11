const KAFKA_BROKER_PORT = process.env.KAFKA_BROKER_PORT;
const KAFKA_BROKER_HOST = process.env.KAFKA_BROKER_HOST;

const brokersList = () => {
  return [`${KAFKA_BROKER_HOST}:${KAFKA_BROKER_PORT}`];
};

const initProducer = async (kafka) => {
  const producer = kafka.producer();
  await producer.connect();
  kafka.isProducerReady = true;
  kafka.producerInstance = producer;
  console.log("Kafka connected!");
};

const connect = () => {
  const { Kafka } = require("kafkajs");
  const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: [...brokersList()],
  });
  initProducer(kafka);
  return kafka;
};

module.exports = KAFKA_BROKER_PORT && connect();
