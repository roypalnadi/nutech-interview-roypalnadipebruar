import { responseJson } from "./response.js";
import { AppError, ValidateError } from "../error/appError.js";

const catchAllError = (err, req, res, next) => {
	let status = 500;
	let statusResponse = 500;
	let message = err.message;
	let data = null;

	if (err instanceof ValidateError) {
		status = err.status;
		statusResponse = err.statusResponse;
		message = err.message;
	} else if (err instanceof AppError) {
		status = err.status;
		statusResponse = err.statusResponse;
		message = err.message;
		data = err.data;
	}

	return res.status(status).json(responseJson(statusResponse, message, data));
};

const catchUnhandledRejection = (req, res, next) => {
	process.on("unhandledRejection", (error) => {
		next(error);
	});

	next();
};

export { catchAllError, catchUnhandledRejection };
