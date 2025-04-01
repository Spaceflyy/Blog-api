const { Router } = require("express");
const {
	addUser,
	getAllUsers,
	getUserById,
	deleteUserById,
	updateUser,
	userLogin,
} = require("../controllers/userController");
const router = Router();
router.post("/sign-up", addUser);
router.get("/", getAllUsers);
router.get("/:userId", getUserById);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUserById);
router.post("/login", userLogin);
module.exports = router;
