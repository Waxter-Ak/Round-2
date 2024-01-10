const { Router } = require("express");
const {
	signup,
	login,
	logout,
} = require("../controllers/auth.controller");
const auth = require("../middlewares/auth");
const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(auth, logout);

module.exports = router;
