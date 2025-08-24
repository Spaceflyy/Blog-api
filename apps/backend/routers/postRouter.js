const { Router } = require("express");
const router = Router();
const {
	addPost,
	getAllPosts,
	getSinglePost,
} = require("../controllers/postController");

router.post("/new", addPost);

router.post("/:postId/:commentId", (req, res) => {
	//create comment on post
});

router.get("/:postId", getSinglePost);
router.get("/", getAllPosts);

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
