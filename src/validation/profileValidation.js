import Joi from "joi";

const update = Joi.object({
	first_name: Joi.string(),
	last_name: Joi.string(),
});

export default { update };
