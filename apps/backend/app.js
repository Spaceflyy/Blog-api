const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./routers/userRouter");
const authRouter = require("./routers/authRouter");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.listen(3000, () => {
	console.log("App is now listening on port 3000");
});
