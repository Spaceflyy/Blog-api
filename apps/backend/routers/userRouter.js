const { Router } = require("express");
require("dotenv").config();
const {
	addUser,
	getAllUsers,
	getUserById,
	deleteUserById,
	updateUser,
	getUser,
} = require("../controllers/userController");
const { verifyToken } = require("../controllers/authController");
const router = Router();
router.post("/sign-up", addUser);

router.get("/me", verifyToken, getUser);
router.get("/", getAllUsers);
router.get("/:userId", getUserById);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUserById);

module.exports = router;
