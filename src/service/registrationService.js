import bcrypt from "bcrypt";
import db from "../app/db.js";
import { AppError } from "../error/appError.js";

const save = async (request) => {
	const [results] = await db.query(
		"SELECT * FROM users WHERE email = ? LIMIT 1",
		[request.email]
	);

	if (results.length > 0) {
		throw new AppError(400, 102, "Email sudah terdaftar");
	}

	request.password = await bcrypt.hash(request.password, 10);

	const [result] = await db.query(
		"INSERT INTO user (email, first_name, last_name, password) values (?, ?, ?, ?)",
		[request.email, request?.first_name, request?.last_name, request.password]
	);

	return result.insertId;
};

export default { save };
