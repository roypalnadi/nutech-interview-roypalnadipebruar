import { responseJson } from "../handler/response.js";
import registrationService from "../service/registrationService.js";
import registrationValidation from "../validation/registrationValidation.js";
import validate from "../validation/validation.js";

const registration = async (req, res, next) => {
	try {
		const value = validate(registrationValidation.registration, req.body);

		await registrationService.save(value);

		res.status(200).json(
			responseJson(0, "Registrasi berhasil silahkan login")
		);
	} catch (error) {
		next(error);
	}
};

export default { registration };
