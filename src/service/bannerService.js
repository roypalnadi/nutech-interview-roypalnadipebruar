import db from "../app/db.js";

const list = async () => {
	const [banners] = await db.query(
		"SELECT banner_name, banner_image, description FROM banners"
	);

	return banners;
};

export default { list };
