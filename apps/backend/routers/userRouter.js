const { Router } = require("express");
const router = Router();
//NEEDS ROUTERS FOR
router.post("/", (req, res) => {
	//creates a user
});
router.get("/", (req, res) => {
	//gets all users
});

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
