import { responseJson } from "../handler/response.js";
import serviceService from "../service/serviceService.js";

const list = async (req, res, next) => {
	try {
		const services = await serviceService.list();

		res.status(200).json(
			responseJson(
				0,
				"Sukses",
				services.map((data) => {
					data.service_icon = `${req.protocol}://${req.get("host")}/${
						data.service_icon
					}`;

					return data;
				})
			)
		);
	} catch (error) {
		next(error);
	}
};

export default { list };
