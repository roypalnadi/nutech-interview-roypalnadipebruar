import db from "../app/db.js";

const list = async () => {
	const [services] = await db.query(
		"SELECT service_code, service_name, service_icon, service_tariff FROM services"
	);

	return services;
};

export default { list };
