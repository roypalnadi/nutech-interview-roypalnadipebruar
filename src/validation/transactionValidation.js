import Joi from "joi";

const topUp = Joi.object({
	top_up_amount: Joi.number().min(1).required().messages({
		"any.required":
			"Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
		"number.min":
			"Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
		"number.base":
			"Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
	}),
});

const transaction = Joi.object({
	service_code: Joi.string().required().messages({
		"any.required": "Paramter service code harus diisi",
	}),
});

export default { topUp, transaction };
