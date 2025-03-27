const { Router } = require("express");
const {
	addUser,
	getAllUsers,
	getUserById,
	deleteUserById,
	updateUser,
} = require("../controllers/userController");
const router = Router();
//NEEDS ROUTERS FOR
router.post("/", addUser);
router.get("/", getAllUsers);
router.get("/:userId", getUserById);

router.put("/:userId", updateUser);

router.delete("/:userId", deleteUserById);

module.exports = router;
