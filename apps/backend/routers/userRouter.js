const { Router } = require("express");
const { addUser, getAllUsers } = require("../controllers/userController");
const router = Router();
//NEEDS ROUTERS FOR
router.post("/", addUser);
router.get("/", getAllUsers);

router.get("/:userId", (req, res) => {
	//get specific user
});

router.put("/:userId", (req, res) => {
	//updates a  user
});

router.delete("/:userId", (req, res) => {
	//deletes a  user
});

module.exports = router;
