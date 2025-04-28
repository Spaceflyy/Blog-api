const { Router } = require("express");
const router = Router();
const {
	userLogin,
	getNewToken,
	deleteToken,
	verifyToken,
} = require("../controllers/authController");

router.post("/login", userLogin);
router.post("/token", getNewToken);
router.get("/me", verifyToken, (req, res) => {
	return res.json({ user: req.user });
});
router.delete("/logout", deleteToken);
module.exports = router;
