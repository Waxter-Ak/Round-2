const express = require("express");
const bodyParser = require("body-parser")

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors({ credentials: true, origin: true }));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

// import routes here
const authRouter = require("./routes/auth.routes");
const contactUsRouter = require("./routes/contactus.routes");
app.use("/api/auth", authRouter);
app.use("/api/contact", contactUsRouter);

// import error-middleware here
app.use((req, res) => {
	res.status(404).json({ success: false, message: "Please enter a valid API-URL" });
});
const error = require("./middlewares/error");
app.use(error);

module.exports = app;