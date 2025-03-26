const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./routers/userRouter");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/users", userRouter);

app.listen(3000, () => {
	console.log("App is now listening on port 3000");
});
