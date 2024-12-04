import { jwtSecret } from "../configApp.js";
import { AppError } from "../error/appError.js";
import jwt from "jsonwebtoken";

const authentication = (req, res, next) => {
	if (!req.headers) {
		throw new AppError(404, 404, "Header authorization diperlukan");
	}

	const { authorization } = req.headers;

	if (!authorization) {
		throw new AppError(404, 404, "Header authorization diperlukan");
	}

	const authorizations = authorization.split(" ");

	if (authorizations.length <= 1) {
		throw new AppError(400, 102, "Token tidak ditemukan");
	}

	const token = authorizations[1];

	const secret = jwtSecret;

	try {
		const jwtDecode = jwt.verify(token, secret);

		req.email = jwtDecode?.email;
	} catch (error) {
		throw new AppError(401, 108, "Token tidak tidak valid atau kadaluwarsa");
	}
	next();
};

export default { authentication };
