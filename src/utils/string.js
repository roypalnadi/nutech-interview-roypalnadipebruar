import crypto from "crypto";

const randomString = (length = 4) => {
	return crypto
		.randomBytes(length)
		.toString("base64") // Encode ke base64
		.replace(/[^a-zA-Z0-9]/g, "") // Hapus karakter non-alphanumeric
		.substring(0, length); // Ambil panjang yang dibutuhkan
};

export { randomString };
