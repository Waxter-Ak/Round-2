const { Router } = require("express");
const { sendContactUs } = require("../controllers/contactus.controller.js");
const router = Router();

router.route("/send-message").post(sendContactUs);

module.exports = router;