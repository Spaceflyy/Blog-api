const { Router } = require("express");
const router = Router();
const {
	userLogin,
	getNewToken,
	deleteToken,
} = require("../controllers/authController");

router.post("/login", userLogin);
router.post("/token", getNewToken);
router.delete("/logout", deleteToken);
module.exports = router;
