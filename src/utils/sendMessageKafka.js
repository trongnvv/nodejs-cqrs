const kafka = require("./kafka");
const delay = (m = 1000) => new Promise((r) => setTimeout(r, m));
module.exports = async (topic, data, time = 0) => {
  try {
    if (!kafka.isProducerReady) {
      await delay();
      time++;
      if (time === 3) throw new Error("Kafka producer is not ready!");
      return sendMessageKafka(topic, data, time);
    }

    await kafka.producerInstance.send({
      topic: topic,
      messages: [{ value: JSON.stringify(data) }],
    });
    console.log("[KAFKA] send done:", topic, "-------", data);
  } catch (error) {
    console.error("[KAFKA-ERROR]", topic, "-------", error.message);
  }
};
