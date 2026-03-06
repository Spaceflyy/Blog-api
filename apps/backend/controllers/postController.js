const db = require("../database/queries");
const AppError = require("../../shared/Error/AppError");

exports.addPost = async (req, res) => {
	const { authorId, title, content } = req.body;
	if (!authorId || !title) {
		throw new AppError(
			"Bad Request Error",
			"Required Information is missing!",
			400,
		);
	}

	await db.createPost(authorId, title, content);

	return res.status(200).json("success!");
};

exports.deletePost = async (req, res) => {
	const postId = Number(req.params.postId);

	if (!Number.isInteger(postId)) {
		throw new AppError("Invalid ID", "Invalid post Id!", 400);
	}

	await db.deleteSinglePost(postId);

	return res.status(200).json("Post deleted successfully");
};

exports.getAllPosts = async (req, res) => {
	const posts = await db.getPosts();
	// might need to change this as its not really an issue if theres no posts
	if (!posts) {
		throw new AppError("Posts not found.", "No posts found", 404);
	}
	return res.status(200).send(posts);
};

exports.getSinglePost = async (req, res, next) => {
	const { postId } = req.params;

	const postInfo = await db.getPostById(Number(postId));
	const commentInfo = await db.getCommentsByPost(Number(postId));

	if (!postInfo || !commentInfo) {
		throw new AppError("Not Found Error", "Post not found!", 404);
	}

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

	const result = await db.updatePostById(Number(postId), title, content);

	return res.status(200).send(result);
};

exports.addComment = async (req, res) => {
	const { postId } = req.params;
	const { content, authorId, parentCommentId } = req.body;

	if (!postId || !authorId) {
		throw new AppError("Invalid ID.", "Invalid post / author ID.", 400);
	}

	const newComment = await db.addNewComment(
		Number(postId),
		Number(authorId),
		content,
		Number(parentCommentId),
	);

	if (!newComment) {
		throw new AppError("Add Comment Failed.", "Failed to add comment.", 500);
	}

	return res.status(200).json(newComment);
};

exports.editComment = async (req, res) => {
	const commentId = Number(req.params.commentId);
	const { content } = req.body;

	if (!Number.isInteger(commentId) || commentId < 0) {
		throw new AppError("Invalid Id", "Invalid comment ID", 400);
	}

	const updatedComment = await db.updateComment(commentId, content);

	return res.status(200).send(updatedComment);
};

exports.deleteComment = async (req, res) => {
	const id = Number(req.params.id);

	if (!Number.isInteger(id)) {
		throw new AppError("Invalid Id", "Invalid comment ID", 400);
	}

	return res.status(200).send(await db.deleteSingleComment(id));
};
