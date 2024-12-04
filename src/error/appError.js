class AppError extends Error {
	constructor(status, statusResponse, message, data = null) {
		super(message);
		this.status = status;
		this.statusResponse = statusResponse;
		this.data = data;
	}
}

class ValidateError extends AppError {
	constructor(error) {
		super(400, 102, error.message);
	}
}

export { AppError, ValidateError };
