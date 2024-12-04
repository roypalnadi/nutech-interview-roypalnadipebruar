import mysql from "mysql2";
import {
	databaseHost,
	databaseName,
	databasePassword,
	databasePort,
	databaseUser,
} from "../configApp.js";

const db = mysql
	.createPool({
		host: databaseHost,
		port: databasePort,
		database: databaseName,
		user: databaseUser,
		password: databasePassword,
	})
	.promise();

export default db;
