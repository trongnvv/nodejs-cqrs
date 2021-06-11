const router = require("express").Router();
const friendRoute = require("./friend.route");

router.get("/ping", async (req, res) => {
  res.json({ name: "Service are running...", ping: "PONG" });
});

router.use("/friends", friendRoute);

module.exports = router;
