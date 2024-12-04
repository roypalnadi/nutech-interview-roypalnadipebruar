import Joi from "joi";

const registration = Joi.object({
	email: Joi.string().email().required().messages({
		"string.email": "Paramter email tidak sesuai format",
		"any.required": "Paramter email harus diisi",
	}),
	first_name: Joi.string(),
	last_name: Joi.string(),
	password: Joi.string().min(8).required().messages({
		"any.required": "Paramter password harus diisi",
		"string.min": "Password length minimal 8 karakter",
	}),
});

export default { registration };
