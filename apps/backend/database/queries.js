const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
exports.deleteUser = async (userId) => {
	await prisma.user.delete({ where: { id: userId } });
};
