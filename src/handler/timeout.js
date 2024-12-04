import { AppError } from "../error/appError.js";

const timeoutHandler = (err, req, res, next) => {
	if (req.timedout) {
		throw new AppError(503, 503, "Request timed out");
	}
	next(err);
};

export default timeoutHandler;
