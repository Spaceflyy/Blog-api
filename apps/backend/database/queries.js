const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
//////////USER QUERIES///////////////////////////////
exports.createUser = async (
	firstname,
	lastname,
	username,
	password,
	isAuthor
) => {
	await prisma.user.create({
		data: {
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

exports.getUserByUsername = async (username) => {
	return prisma.user.findUnique({
		where: { username: username },
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
	isAuthor
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
exports.createPost = async (userId, postId, content) => {};
