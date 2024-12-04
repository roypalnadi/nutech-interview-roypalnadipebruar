import { responseJson } from "../handler/response.js";
import loginService from "../service/loginService.js";
import loginValidation from "../validation/loginValidation.js";
import validate from "../validation/validation.js";

const login = async (req, res, next) => {
	try {
		const value = validate(loginValidation.login, req.body);

		const token = await loginService.login(value);

		res.status(200).json(
			responseJson(0, "Login Sukses", {
				token,
			})
		);
	} catch (error) {
		next(error);
	}
};

export default { login };
