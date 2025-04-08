const jwt = require("jsonwebtoken");
const db = require("../database/queries");
const bcrypt = require("bcryptjs");

exports.deleteToken = (req, res) => {};

exports.getNewToken = (req, res) => {
	const refreshToken = req.body.token;
	// if (localStorage.getItem("token") === null) {
	// 	return res.status(401).json({ message: "User Unauthorized" });
	// }
	// if (localStorage.getItem("token") !== refreshToken) {
	// 	res.status(403).json({ message: "Forbidden" });
	// }

	jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
		if (err) {
			return res.send().Status(403);
		}
		const accessToken = generateAccessToken({ name: user.username });
		res.json({ accessToken });
	});
};

exports.userLogin = async (req, res) => {
	const { username, password } = req.body;
	const user = await db.getUserByUsername(username);

	if (!user) {
		return res.status(400).json({ error: "Incorrect Username" });
	}

	const match = await bcrypt.compare(password, user.password);
	if (!match) {
		return res.status(400).json({ error: "Incorrect Password" });
	}

	const accessToken = generateAccessToken(user);
	const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET);

	res.json({ accessToken, refreshToken });
};

const generateAccessToken = (user) => {
	return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "15s" });
};

exports.verifyToken = (req, res, next) => {
	const bearerHeader = req.headers["authorization"];
	const token = bearerHeader && bearerHeader.split(" ")[1];

	if (token == null) {
		return res.status(401).json({ error: "User unauthorized" });
	}

	jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
		if (err) {
			return res.status(403).json({ error: "Fobidden" });
		}

		req.user = user;
		next();
	});
};
