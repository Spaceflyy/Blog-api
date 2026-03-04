const db = require("../database/queries");
const bcrypt = require("bcryptjs");
const CustomNotFoundError = require("../../shared/Error/CustomNotFoundError");

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
			isAuthor,
		);
	} catch (error) {
		next(error);
	}
	return res.status(200).json("New user successful!");
};

exports.getAllUsers = async (req, res) => {
	return res.send(await db.getUsers());
};

exports.getUserById = async (req, res) => {
	const { userId } = req.params;
	const user = await db.getUserId(Number(userId));

	return res.status(200).send(user);
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
			isAuthor,
		);
		res.end();
	} catch (error) {
		next(error);
	}
};

exports.getUser = (req, res) => {
	try {
		res.json(req.user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Unable to retrieve user" });
	}
};
