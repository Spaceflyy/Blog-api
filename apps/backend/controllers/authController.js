const jwt = require("jsonwebtoken");
const db = require("../database/queries");
const bcrypt = require("bcryptjs");

exports.deleteToken = async (req, res) => {
	const token = req.cookies["REFRESH_TOKEN"];
	const { id } = jwt.decode(token, process.env.REFRESH_SECRET);

	await db.deleteToken(id, token);

	res.clearCookie("ACCESS_TOKEN");
	res.clearCookie("REFRESH_TOKEN", {
		httpOnly: true,
		secure: true,
		sameSite: "strict",
		path: "/auth/",
	});
	return res.status(204).json({ message: "Logout successful" });
};

exports.getNewToken = async (req, res) => {
	const refreshToken = req.cookies["REFRESH_TOKEN"];
	const dbResult = await db.getTokens();

	const refreshTokens = dbResult.map(function (token) {
		return token["token"];
	});

	if (refreshToken === undefined) {
		return res.status(401).json({ message: "User Unauthorized" });
	}

	if (!refreshTokens.includes(refreshToken)) {
		return res.status(403).json({ message: "Forbidden" });
	}

	jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
		if (err) {
			return res.status(403).json({ message: "Invalid Token" });
		}
		const accessToken = generateAccessToken({
			id: user.id,
			username: user.username,
		});

		res.cookie("ACCESS_TOKEN", accessToken, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			maxAge: 60 * 60 * 1000,
		});
		return res.status(200).json("Access Token generated");
	});
};

exports.userLogin = async (req, res, next) => {
	const { email, password } = req.body;
	const user = await db.getUserByUsername(email);

	if (!user) {
		return res.status(400).json({ error: "Incorrect Email Address" });
	}

	const match = await bcrypt.compare(password, user.password);
	if (!match) {
		return res.status(400).json({ error: "Incorrect Password" });
	}

	const accessToken = generateAccessToken(user);
	const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET, {
		expiresIn: "30d",
	});

	try {
		await db.addToken(user.id, refreshToken);
	} catch (error) {
		return res.status(400).json({ error: "Token already exists" });
	}

	res.cookie("REFRESH_TOKEN", refreshToken, {
		httpOnly: true,
		secure: true,
		sameSite: "strict",
		path: "/auth/",
		maxAge: 30 * 24 * 60 * 60 * 1000,
	});
	res.cookie("ACCESS_TOKEN", accessToken, {
		httpOnly: true,
		secure: true,
		sameSite: "strict",
		maxAge: 60 * 60 * 1000,
	});

	res.status(200).json({ user });
};

const generateAccessToken = (user) => {
	return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "1h" });
};
