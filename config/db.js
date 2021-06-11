const mongoose = require("mongoose");
const URI = process.env.MONGO_URI;
mongoose.connect(URI, {
  socketTimeoutMS: 10000,
  keepAlive: true,
  poolSize: 50,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error.");
  console.error(err);
  process.exit();
});

mongoose.connection.once("open", () => {
  console.log(`Connected to MongoDB: ${URI}`);
});
