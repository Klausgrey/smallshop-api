const errorHandler = (err, req, res, next) => {
	console.error(err.stack);
	const status = err.statusCode || 500;
	return res.status(status).json({
		status: "error",
		message: err.message || "An unexpected error has occured",
	});
};

export default errorHandler;
