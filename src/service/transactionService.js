import db from "../app/db.js";
import { AppError } from "../error/appError.js";
import { randomString } from "../utils/string.js";

const balance = async (email) => {
	let user;
	const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
		email,
	]);

	if (users.length > 0) {
		user = users[0];
	} else {
		throw new AppError(400, 102, "Profile tidak ditemukan");
	}

	return user.balance;
};

const topUp = async (email, amount) => {
	let user;
	const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
		email,
	]);

	if (users.length > 0) {
		user = users[0];
	} else {
		throw new AppError(400, 102, "Profile tidak ditemukan");
	}

	const currentBalance = user.balance + amount;

	const connection = await db.getConnection();

	await connection.beginTransaction();
	try {
		await connection.query("UPDATE users SET balance = ? WHERE id = ?", [
			currentBalance,
			user.id,
		]);

		const invoiceNumber = "TRX/" + randomString() + "/" + Date.now();

		await connection.query(
			"INSERT INTO transactions (user_id, invoice_number, transaction_type, description, total_amount, created_on) VALUES (?, ? ,?, ?, ?, ?)",
			[user.id, invoiceNumber, "TOPUP", "Top Up balance", amount, new Date()]
		);
		await connection.commit();
	} catch (error) {
		await connection.rollback();
		throw error;
	}

	return currentBalance;
};

const transaction = async (email, serviceCode) => {
	let user;
	const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
		email,
	]);

	if (users.length > 0) {
		user = users[0];
	} else {
		throw new AppError(400, 102, "Profile tidak ditemukan");
	}

	let service;
	const [services] = await db.query(
		"SELECT * FROM services WHERE service_code = ?",
		[serviceCode]
	);

	if (services.length > 0) {
		service = services[0];
	} else {
		throw new AppError(400, 102, "Service ataus Layanan tidak ditemukan");
	}

	if (user.balance < service.service_tariff) {
		throw new AppError(400, 102, "Balance tidak mencukupi");
	}

	const currentBalance = user.balance - service.service_tariff;

	const connection = await db.getConnection();

	await connection.beginTransaction();
	try {
		await connection.query("UPDATE users SET balance = ? WHERE id = ?", [
			currentBalance,
			user.id,
		]);

		const invoiceNumber = "INV/" + randomString() + "/" + Date.now();

		const currentDate = new Date();
		const transactionType = "PAYMENT";

		await connection.query(
			"INSERT INTO transactions (user_id, service_id, invoice_number, transaction_type, description, total_amount, created_on) VALUES (?, ?, ? ,?, ?, ?, ?)",
			[
				user.id,
				service.id,
				invoiceNumber,
				transactionType,
				service.service_name,
				service.service_tariff,
				currentDate,
			]
		);
		await connection.commit();
		return {
			invoice_number: invoiceNumber,
			service_code: service.service_code,
			service_name: service.service_name,
			transaction_type: transactionType,
			total_amount: service.service_tariff,
			created_on: currentDate,
		};
	} catch (error) {
		await connection.rollback();
		throw error;
	}
};

const history = async (email, limit, offset) => {
	let dataLimit = null;
	let dataOffset = null;

	let user;
	const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
		email,
	]);

	if (users.length > 0) {
		user = users[0];
	} else {
		throw new AppError(400, 102, "Profile tidak ditemukan");
	}

	const query = [
		"SELECT invoice_number, transaction_type, description, total_amount, created_on FROM transactions WHERE user_id = ? ORDER BY created_on DESC",
	];

	const bindings = [user.id];

	if (limit) {
		limit = Number(limit);
		query.push("LIMIT ?");
		bindings.push(limit);
		dataLimit = limit;

		if (offset) {
			offset = Number(offset);
			query.push("OFFSET ?");
			bindings.push(offset);
			dataOffset = offset;
		}
	}

	const [historys] = await db.query(query.join(" "), bindings);

	return {
		offset: dataOffset,
		limit: dataLimit,
		records: historys,
	};
};

export default { balance, topUp, transaction, history };
