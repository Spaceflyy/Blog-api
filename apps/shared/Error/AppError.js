class AppError extends Error {
	constructor(name, message, errorcode) {
		super(message, errorcode);
		this.statusCode = errorcode;

		this.name = name;
	}
}

module.exports = AppError;
