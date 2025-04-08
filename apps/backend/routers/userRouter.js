const { Router } = require("express");
require("dotenv").config();
const {
	addUser,
	getAllUsers,
	getUserById,
	deleteUserById,
	updateUser,
} = require("../controllers/userController");
const { verifyToken } = require("../controllers/authController");
const jwt = require("jsonwebtoken");
const router = Router();
router.post("/sign-up", addUser);

router.get("/test", verifyToken, (req, res) => {
	return res.json(req.user);
});
router.get("/", getAllUsers);
router.get("/:userId", getUserById);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUserById);

module.exports = router;
