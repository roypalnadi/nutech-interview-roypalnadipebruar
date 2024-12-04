import Joi from "joi";

const login = Joi.object({
	email: Joi.string().email().required().messages({
		"string.email": "Paramter email tidak sesuai format",
		"any.required": "Paramter email harus diisi",
	}),
	password: Joi.string().min(8).required().messages({
		"any.required": "Paramter password harus diisi",
		"string.min": "Paramter password minimum memiliki 8 karakter",
	}),
});

export default { login };
