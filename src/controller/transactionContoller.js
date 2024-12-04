import { responseJson } from "../handler/response.js";
import transactionService from "../service/transactionService.js";
import transactionValidation from "../validation/transactionValidation.js";
import validate from "../validation/validation.js";

const balance = async (req, res, next) => {
	try {
		const balance = await transactionService.balance(req.email);

		res.status(200).json(
			responseJson(0, "Get Balance Berhasil", { balance })
		);
	} catch (error) {
		next(error);
	}
};

const topUp = async (req, res, next) => {
	try {
		const value = validate(transactionValidation.topUp, req.body);

		const balance = await transactionService.topUp(
			req.email,
			value.top_up_amount
		);

		res.status(200).json(
			responseJson(0, "Top Up Balance berhasil", { balance })
		);
	} catch (error) {
		next(error);
	}
};

const transaction = async (req, res, next) => {
	try {
		const value = validate(transactionValidation.transaction, req.body);

		const response = await transactionService.transaction(
			req.email,
			value.service_code
		);

		res.status(200).json(responseJson(0, "Transaksi berhasil", response));
	} catch (error) {
		next(error);
	}
};

const history = async (req, res, next) => {
	try {
		const query = req.query;
		const response = await transactionService.history(
			req.email,
			query?.limit,
			query?.offset
		);

		res.status(200).json(responseJson(0, "Get History Berhasil", response));
	} catch (error) {
		next(error);
	}
};

export default { balance, topUp, transaction, history };
