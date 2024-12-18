import { responseJson } from "../handler/response.js";
import profileService from "../service/profileService.js";
import profileValidation from "../validation/profileValidation.js";
import validation from "../validation/validation.js";

const profile = async (req, res, next) => {
	try {
		const user = await profileService.profile(req.email);

		let profileImage = null;
		if (user.profile_image) {
			profileImage = `${req.protocol}://${req.get("host")}/${
				user?.profile_image
			}`;
		}

		res.status(200).json(
			responseJson(0, "Sukses", {
				email: user?.email,
				first_name: user?.first_name,
				last_name: user?.last_name,
				profile_image: profileImage,
			})
		);
	} catch (error) {
		next(error);
	}
};

const update = async (req, res, next) => {
	try {
		const value = validation(profileValidation.update, req.body);

		const user = await profileService.update(
			req.email,
			value.first_name,
			value.last_name
		);

		let profileImage = null;
		if (user.profile_image) {
			profileImage = `${req.protocol}://${req.get("host")}/${
				user?.profile_image
			}`;
		}

		res.status(200).json(
			responseJson(0, "Update Pofile berhasil", {
				email: user?.email,
				first_name: user?.first_name,
				last_name: user?.last_name,
				profile_image: profileImage,
			})
		);
	} catch (error) {
		next(error);
	}
};

const image = async (req, res, next) => {
	try {
		const user = await profileService.image(req.email, req.file.path);

		let profileImage = null;
		if (user.profile_image) {
			profileImage = `${req.protocol}://${req.get("host")}/${
				user?.profile_image
			}`;
		}

		res.status(200).json(
			responseJson(0, "Update Profile Image berhasil", {
				email: user?.email,
				first_name: user?.first_name,
				last_name: user?.last_name,
				profile_image: profileImage,
			})
		);
	} catch (error) {
		next(error);
	}
};

export default { profile, update, image };
