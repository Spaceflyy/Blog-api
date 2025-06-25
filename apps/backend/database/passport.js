const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const db = require("./queries");
require("dotenv").config();
const cookieExtractor = (req) => {
	let token = null;
	if (req && req.cookies) {
		token = req.cookies["ACCESS_TOKEN"];
	}
	return token;
};

const options = {
	jwtFromRequest: cookieExtractor,
	secretOrKey: process.env.TOKEN_SECRET,
};

passport.use(
	new JwtStrategy(options, async (payload, done) => {
		try {
			const user = await db.getUserId(payload.id);

			if (user) {
				return done(null, user);
			}
			return done(null, false);
		} catch (err) {
			return done(err, false);
		}
	})
);

module.exports = passport;
