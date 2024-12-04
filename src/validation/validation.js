import { ValidateError } from "../error/appError.js";

const validate = (schema, request) => {
	const { error, value } = schema.validate(request);

	if (!error) {
		return value;
	}

	throw new ValidateError(error);
};

export default validate;
