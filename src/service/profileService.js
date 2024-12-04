import db from "../app/db.js";
import fs from "fs";
import { AppError } from "../error/appError.js";
import staticData from "../../staticData.js";
import path from "path";

const profile = async (email) => {
	let user;
	const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
		email,
	]);

	if (users.length > 0) {
		user = users[0];
	} else {
		throw new AppError(400, 102, "Profile tidak ditemukan");
	}

	return user;
};

const update = async (email, firstName, lastName) => {
	let user;
	const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
		email,
	]);

	if (users.length > 0) {
		user = users[0];
	} else {
		throw new AppError(400, 102, "Profile tidak ditemukan");
	}

	await db.query(
		"UPDATE users SET first_name = ?, last_name = ? WHERE id = ?",
		[firstName, lastName, user.id]
	);

	const [newUsers] = await db.query("SELECT * FROM users WHERE id = ?", [
		user.id,
	]);

	return newUsers[0];
};

const image = async (email, pathFile) => {
	let user;
	const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
		email,
	]);

	if (users.length > 0) {
		user = users[0];
	} else {
		throw new AppError(400, 102, "Profile tidak ditemukan");
	}

	if (user.profile_image) {
		const oldFilePath = path.join(staticData.__root, user.profile_image);
		if (fs.existsSync(oldFilePath)) {
			fs.unlinkSync(oldFilePath);
		}
	}

	await db.query("UPDATE users SET profile_image = ? WHERE id = ?", [
		pathFile,
		user.id,
	]);

	const [newUsers] = await db.query("SELECT * FROM users WHERE id = ?", [
		user.id,
	]);

	return newUsers[0];
};

export default { profile, update, image };
