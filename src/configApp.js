import "dotenv/config";

const appHost = process.env.APP_HOST;
const appPort = process.env.APP_PORT;

const databaseHost = process.env.DATABASE_HOST;
const databasePort = process.env.DATABASE_PORT;
const databaseName = process.env.DATABASE_NAME;
const databaseUser = process.env.DATABASE_USER;
const databasePassword = process.env.DATABASE_PASSWORD;

const jwtSecret = process.env.JWT_SECRET;

export {
	appHost,
	appPort,
	databaseHost,
	databasePort,
	databaseName,
	databaseUser,
	databasePassword,
	jwtSecret,
};
