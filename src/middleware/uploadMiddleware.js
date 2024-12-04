import multer from "multer";
import path from "path";
import staticData from "../../staticData.js";
import fs from "fs";
import { AppError } from "../error/appError.js";

const uploadFile = (distination, bodyKey, mimetype = []) => {
	const dir = path.join(staticData.publicUpload, distination);

	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}

	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, dir);
		},
		filename: (req, file, cb) => {
			cb(null, `${Date.now()}-${file.originalname}`);
		},
	});

	const fileFilter = (req, file, cb) => {
		if (mimetype.length == 0) {
			cb(null, true);
		}

		if (mimetype.includes(file.mimetype)) {
			cb(null, true);
		} else {
			cb(new AppError(400, 102, "Format Image tidak sesuai"), false);
		}
	};

	return multer({ storage, fileFilter }).single(bodyKey);
};

export default { uploadFile };
