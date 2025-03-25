const { Router } = require("express");
const router = Router();

router.post("/", (req, res) => {
	//create a post
});
router.post("/:postId/:commentId", (req, res) => {
	//create comment on post
});

router.get("/:postId", (req, res) => {
	//get a post
});
router.get("/posts", (req, res) => {
	//get all post
});
router.get("/:postId/comments", (req, res) => {
	//get all comments on post
});
router.get("/:postId/:commentId", (req, res) => {
	//get comment on post
});

router.put("/:postId", (req, res) => {
	//update a post
});
router.put("/:postId/:commentId", (req, res) => {
	//edit comment on post
});

router.delete("/:postId", (req, res) => {
	//delete a post
});
router.delete("/:postId/:commentId", (req, res) => {
	//delete comment on post
});

module.exports = router;
