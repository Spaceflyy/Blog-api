class CustomNotFoundError extends Error {
	constructor(message, errorcode) {
		super(message, errorcode);
		this.statusCode = errorcode;

		this.name = "Not Found Error";
	}
}

module.exports = CustomNotFoundError;
