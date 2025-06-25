const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./routers/userRouter");
const authRouter = require("./routers/authRouter");
const cookieParser = require("cookie-parser");
const passport = require("./database/passport");
app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.listen(3000, () => {
	console.log("App is now listening on port 3000");
});
