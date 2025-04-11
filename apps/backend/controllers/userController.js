const db = require("../database/queries");
const bcrypt = require("bcryptjs");

exports.addUser = async (req, res, next) => {
	const { firstname, lastname, username, password, email, isAuthor } = req.body;
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		await db.createUser(
			email,
			firstname,
			lastname,
			username,
			hashedPassword,
			isAuthor
		);
		res.end();
	} catch (error) {
		next(error);
	}
};

exports.getAllUsers = async (req, res) => {
	return res.send(await db.getUsers());
};

exports.getUserById = async (req, res) => {
	const { userId } = req.params;
	return res.send(await db.getUserId(Number(userId)));
};

exports.deleteUserById = async (req, res) => {
	const { userId } = req.params;
	await db.deleteUser(Number(userId));
};

exports.updateUser = async (req, res) => {
	const { firstname, lastname, username, password, isAuthor } = req.body;
	const { userId } = req.params;

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		await db.editUser(
			Number(userId),
			firstname,
			lastname,
			username,
			hashedPassword,
			isAuthor
		);
		res.end();
	} catch (error) {
		console.error(error);
		next(error);
	}
};
