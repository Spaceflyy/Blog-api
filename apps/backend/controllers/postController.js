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
	const postInfo = await db.getPostById(Number(postId));
	const commentInfo = await db.getCommentsByPost(Number(postId));

	const commentsMap = new Map();
	const comments = [];

	commentInfo.map((comment) => {
		commentsMap.set(comment.id, { ...comment, replies: [] });
	});

	commentInfo.map((comment) => {
		if (comment.parentCommentId) {
			commentsMap
				.get(comment.parentCommentId)
				?.replies.push(commentsMap.get(comment.id));
		} else {
			comments.push(commentsMap.get(comment.id));
		}
	});

	const post = { ...postInfo, comments: comments };

	return res.status(200).send(post);
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
	const { content, authorId, parentCommentId } = req.body;
	const newcomment = await db.addNewComment(
		Number(postId),
		Number(authorId),
		content,
		Number(parentCommentId),
	);

	return res.status(200).json(newcomment);
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
