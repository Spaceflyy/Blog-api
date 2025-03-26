const db = require("../database/queries");
const bcrypt = require("bcryptjs");
exports.addUser = async (req, res, next) => {
	const { firstname, lastname, username, password, isAuthor } = req.body;
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		await db.createUser(firstname, lastname, username, hashedPassword, isAuthor);
		res.end();
	} catch (error) {
		console.error(error);
		next(error);
	}
};

exports.getAllUsers = async (req, res) => {
	return res.send(await db.getUsers());
};
