import { responseJson } from "../handler/response.js";
import bannerService from "../service/bannerService.js";

const list = async (req, res, next) => {
	try {
		const banners = await bannerService.list();

		res.status(200).json(
			responseJson(
				0,
				"Sukses",
				banners.map((data) => {
					data.banner_image = `${req.protocol}://${req.get("host")}/${
						data.banner_image
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
