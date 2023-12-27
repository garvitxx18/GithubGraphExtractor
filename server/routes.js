const { Router } = require("express");
const router = Router();
const controller = require("./controller");

router.post("/getContributions", controller.getContributions);
router.get("/getProfile", controller.getProfile);

module.exports = router;
