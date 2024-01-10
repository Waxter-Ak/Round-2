const { verify } = require("jsonwebtoken");
const User = require("../modals/user.modal");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

const isUserAuthenticated = catchAsyncErrors(async function (req, res, next) {
	const token = req.cookies?.xenonstack;
	if (!token) {
		return next(new ErrorHandler("Please login to access this resource", 401));
	}

	const data = verify(token, String(process.env.JWT_SECRET));
	if (!data) {
		return next(new ErrorHandler("User not found", 404));
	}
	req.user = await User.findById(data.id);

	next();
});

module.exports = isUserAuthenticated;
