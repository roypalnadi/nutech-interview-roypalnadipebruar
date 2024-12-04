import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../app/db.js";
import { AppError } from "../error/appError.js";
import { jwtSecret } from "../configApp.js";

const login = async (request) => {
	const { email, password } = request;

	let user = null;
	const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
		email,
	]);

	if (users.length > 0) {
		user = users[0];
	} else {
		throw new AppError(401, 103, "Username atau password salah");
	}

	const getAccess = await bcrypt.compare(password, user.password);

	if (!getAccess) {
		throw new AppError(401, 103, "Username atau password salah");
	}

	const secret = jwtSecret;

	if (!secret) {
		throw new AppError(400, 102, "Secret jwt belum ditambahkan");
	}

	const token = jwt.sign({ email }, secret, {
		expiresIn: 60 * 60 * 12,
	});

	return token;
};

export default { login };
