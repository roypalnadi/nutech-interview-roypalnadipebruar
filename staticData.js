import path from "path";
import { fileURLToPath } from "url";

const publicUpload = "public";

const __root = path.dirname(fileURLToPath(import.meta.url));

export default {
	publicUpload,
	__root,
};
