const { Router } = require("express");
const {
	addUser,
	getAllUsers,
	getUserById,
	deleteUserById,
	updateUser,
	userLogin,
} = require("../controllers/userController");
const { verifyToken } = require("../controllers/authController");
const jwt = require("jsonwebtoken");
const router = Router();
router.post("/sign-up", addUser);
router.get("/test", verifyToken, (req, res) => {
	jwt.verify(req.token, "secretkey", (err, userData) => {
		if (err) {
			res.status(403);
		} else {
			res.json({ message: "Auth accepted", authData: userData });
		}
	});
});
router.get("/", getAllUsers);
router.get("/:userId", getUserById);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUserById);
router.post("/login", userLogin);

module.exports = router;
