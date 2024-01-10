const User = require("../modals/user.modal");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const sendToken = require("../utils/sendToken");
const validateEmail = require("../utils/validateEmail");


//SignUp User
const signup = catchAsyncErrors(async (req, res, next) => {
	const { name, email, password } = req.body;

	if (!name || !email) {
		return next(new ErrorHandler("Please enter all the credentials", 400));
	}
	if (!validateEmail(email)) {
		return next(new ErrorHandler("Email format is incorrect", 400));
	}

	const user = await User.findOne({ email });
	if (user) {
		return next(new ErrorHandler("User account already exists", 400));
	}

	const newUser = await User.create({
		name,
		email,
		password
	});

	if (!newUser) {
		return next(new ErrorHandler("Unable to create user", 500));
	}

	sendToken(res, newUser, 201, "User created successfully");
});

//Login User
const login = catchAsyncErrors(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new ErrorHandler("Please enter all the credentials", 400));
	}

	if (!validateEmail(email)) {
		return next(new ErrorHandler("Email format is incorrect", 400));
	}

	const user = await User.findOne({ email }).select("+password");
	if (!user) {
		return next(new ErrorHandler("Enter valid credentials", 400));
	}

	const comparePasswordResult = await user.comparePassword(password);
	if (!comparePasswordResult) {
		return next(new ErrorHandler("Enter valid credentials", 400));
	}

	sendToken(res, user, 200, "User logged-in successfully");
});

//Logout User
const logout = catchAsyncErrors(async (req, res, next) => {
	res.clearCookie("xenonstack");

	res.status(200).json({ success: true, message: "User logged out successfully" });
});


module.exports = { signup, login, logout };
