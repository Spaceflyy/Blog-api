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

exports.getAllPosts = async (req, res) => {
	return res.send(await db.getPosts());
};
