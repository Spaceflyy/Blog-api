const { Router } = require("express");
const router = Router();
const {
	addPost,
	getAllPosts,
	getSinglePost,
	deletePost,
	editSinglePost,
	addComment,
} = require("../controllers/postController");

router.post("/new", addPost);
router.get("/:postId", getSinglePost);
router.get("/", getAllPosts);
router.delete("/delete/:postId", deletePost);
router.put("/edit/:postId", editSinglePost);

router.post("/:postId/comments/new", addComment);

router.get("/:postId/comments", (req, res) => {
	//get all comments on post
});
router.get("/:postId/:commentId", (req, res) => {
	//get comment on post
});

router.put("/:postId/:commentId", (req, res) => {
	//edit comment on post
});

router.delete("/:postId/:commentId", (req, res) => {
	//delete comment on post
});

module.exports = router;
