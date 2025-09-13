const db = require("../database/queries");

exports.addPost = async (req, res, next) => {
	const { authorId, title, content } = req.body;
	try {
		await db.createPost(authorId, title, content);
	} catch (error) {
		next(error);
	}
	return res.status(200).json("success!");
};

exports.deletePost = async (req, res) => {
	const { postId } = req.params;

	await db.deleteSinglePost(Number(postId));
	return res.status(200).json("success!");
};

exports.getAllPosts = async (req, res) => {
	return res.send(await db.getPosts());
};

exports.getSinglePost = async (req, res) => {
	const { postId } = req.params;
	return res.status(200).send(await db.getPostById(Number(postId)));
};

exports.editSinglePost = async (req, res) => {
	const { postId } = req.params;
	const { title, content } = req.body;

	return res
		.status(200)
		.send(await db.updatePostById(Number(postId), title, content));
};

exports.addComment = async (req, res) => {
	const { postId } = req.params;
	const { content, authorId } = req.body;

	return res
		.status(200)
		.send(await db.addNewComment(Number(postId), Number(authorId), content));
};

exports.editComment = async (req, res) => {
	const { commentId } = req.params;
	const { content } = req.body;
	return res
		.status(200)
		.send(await db.updateComment(Number(commentId), content));
};

exports.deleteComment = async (req, res) => {
	const { id } = req.params;
	return res.status(200).send(await db.deleteSingleComment(Number(id)));
};
