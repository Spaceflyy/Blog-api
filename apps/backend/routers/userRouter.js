const { Router } = require("express");
const passport = require("passport");
require("dotenv").config();
const {
	addUser,
	getAllUsers,
	getUserById,
	deleteUserById,
	updateUser,
	getUser,
} = require("../controllers/userController");
const router = Router();
router.post("/sign-up", addUser);

router.get("/me", passport.authenticate("jwt", { session: false }), getUser);
router.get("/", getAllUsers);
router.get("/:userId", getUserById);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUserById);

module.exports = router;
