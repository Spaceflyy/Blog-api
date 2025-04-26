const jwt = require("jsonwebtoken");
const db = require("../database/queries");
const bcrypt = require("bcryptjs");

exports.deleteToken = (req, res) => {
	refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
	return res.status(204).json({ message: "Logout successful" });
};
let refreshTokens = [];
exports.getNewToken = async (req, res) => {
	const refreshToken = req.cookies.ACCESS_TOKEN;
	console.log(refreshToken);
	const refreshTokens = await db.getTokens();
	const databaseTokens = refreshTokens.map(function (obj) {
		return obj.token;
	});

	// if (refreshToken === undefined) {
	// 	return res.status(401).json({ message: "User Unauthorized" });
	// }

	// if (!databaseTokens.includes(refreshToken)) {
	// 	return res.status(403).json({ message: "Forbidden" });
	// }

	res.json({ databaseTokens, refreshToken });

	// jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
	// 	if (err) {
	// 		return res.sendStatus(403);
	// 	}
	// 	const accessToken = generateAccessToken({ username: user.username });
	// 	res.json({ accessToken });
	// });
};

exports.userLogin = async (req, res, next) => {
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
	const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET, {
		expiresIn: "30d",
	});

	// try {
	// 	const hashedToken = await bcrypt.hash(refreshToken, 10);
	// 	await db.addToken(user.id, hashedToken);
	// } catch (error) {
	// 	return res.status(400).json({ error: "Token already exists" });
	// }

	res.cookie("REFRESH_TOKEN", refreshToken, {
		httpOnly: true,
		secure: true,
		sameSite: "strict",
		path: "/token",
		maxAge: 30 * 24 * 60 * 60 * 1000,
	});

	res
		.cookie("ACCESS_TOKEN", accessToken, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			maxAge: 60 * 60 * 1000,
		})
		.status(200)
		.json({
			message: "ok",
		});
};

const generateAccessToken = (user) => {
	return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "1h" });
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
