const router = require("express").Router();
const { wrapController, validateInput } = require("../utils");
const validation = require("../validations/common.validation");
const controller = require("../controllers/friend.controller");

router.get("/", wrapController(controller.read));
router.post("/", wrapController(controller.create));
router.put(
  "/:id",
  validateInput(validation.edit),
  wrapController(controller.edit)
);
router.delete(
  "/:id",
  validateInput(validation.remove),
  wrapController(controller.remove)
);

module.exports = router;
