const responseJson = (status, message, data = null) => {
	return {
		status,
		message,
		data: data,
	};
};

export { responseJson };
