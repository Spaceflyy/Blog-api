const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
//////////USER QUERIES///////////////////////////////
exports.createUser = async (
	email,
	firstname,
	lastname,
	username,
	password,
	isAuthor,
) => {
	await prisma.user.create({
		data: {
			email: email,
			firstname: firstname,
			lastname: lastname,
			username: username,
			password: password,
			isAuthor: isAuthor,
		},
	});
};
exports.getUsers = async () => {
	return await prisma.user.findMany();
};

exports.getUserByUsername = async (email) => {
	return prisma.user.findUnique({
		where: { email: email },
	});
};
exports.deleteUser = async (userId) => {
	await prisma.user.delete({ where: { id: userId } });
};

exports.getUserId = async (userId) => {
	return await prisma.user.findUnique({
		where: { id: userId },
		include: { posts: true, comments: true },
	});
};

exports.editUser = async (
	userId,
	firstname,
	lastname,
	username,
	password,
	isAuthor,
) => {
	await prisma.user.update({
		where: { id: userId },
		data: {
			firstname: firstname,
			lastname: lastname,
			username: username,
			password: password,
			isAuthor: isAuthor,
		},
	});
};

//////////POST QUERIES///////////////////////////////
exports.createPost = async (authorId, title, content) => {
	await prisma.post.create({ data: { authorId, title, content } });
};

exports.getPosts = async () => {
	return await prisma.post.findMany({
		include: { author: { select: { username: true } } },
	});
};

exports.getPostById = async (postId) => {
	return await prisma.post.findUnique({
		where: { id: postId },
		include: { author: { select: { username: true } } },
	});
};

exports.deleteSinglePost = async (postId) => {
	await prisma.post.delete({ where: { id: postId } });
};

exports.updatePostById = async (postId, title, content) => {
	await prisma.post.update({ where: { id: postId }, data: { title, content } });
};

////////////COMMENT QUERIES ///////////////////

exports.addNewComment = async (
	postId,
	authorId,
	content,
	parentCommentId = null,
) => {
	return await prisma.comment.create({
		data: { parentId: postId, parentCommentId, content, authorId },
	});
};

exports.updateComment = async (id, content) => {
	await prisma.comment.update({ where: { id }, data: { content } });
};

exports.deleteSingleComment = async (id) => {
	await prisma.comment.delete({ where: { id } });
};

exports.getCommentsByPost = async (parentId) => {
	return await prisma.comment.findMany({
		where: { parentId },
		include: { author: { select: { username: true } } },
		orderBy: { created_at: "desc" },
	});
};
////////////TOKEN QUERIES ///////////////////
exports.addToken = async (userId, token) => {
	await prisma.refreshTokens.create({ data: { ownerId: userId, token: token } });
};
exports.getTokens = async () => {
	return await prisma.refreshTokens.findMany({ select: { token: true } });
};

exports.deleteToken = async (id, refeshToken) => {
	await prisma.refreshTokens.delete({
		where: { ownerId: id, token: refeshToken },
	});
};
