const sendToken = function (res, user, statusCode, message) {
	const token = user.getJWTToken();

	const options = {
		httpOnly: true,
		expires: new Date(
			Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
		),
	};

	res.status(statusCode).cookie("xenonstack", token, options).json({
		success: true,
		message,
		user,
		token
	});
};

module.exports = sendToken;
