import express from "express";
import registrationContoller from "../controller/registrationContoller.js";
import loginContoller from "../controller/loginContoller.js";
import authenticationMiddleware from "../middleware/authenticationMiddleware.js";
import profileContoller from "../controller/profileContoller.js";
import uploadMiddleware from "../middleware/uploadMiddleware.js";
import bannerContoller from "../controller/bannerContoller.js";
import serviceContoller from "../controller/serviceContoller.js";
import transactionContoller from "../controller/transactionContoller.js";

const publicRoute = express.Router();
publicRoute.get("/", (req, res) => {
	res.send("Hello World!");
});

//public
publicRoute.post("/registration", registrationContoller.registration);
publicRoute.post("/login", loginContoller.login);

//private
const privateRoute = express
	.Router()
	.use(authenticationMiddleware.authentication);

//profile
privateRoute.get("/profile", profileContoller.profile);
privateRoute.put("/profile/update", profileContoller.update);
privateRoute.put(
	"/profile/image",
	uploadMiddleware.uploadFile("image/user", "image", [
		"image/jpeg",
		"image/png",
	]),
	profileContoller.image
);

//banner
privateRoute.get("/banner", bannerContoller.list);

//service
privateRoute.get("/service", serviceContoller.list);

//transaction
privateRoute.get("/balance", transactionContoller.balance);
privateRoute.post("/topup", transactionContoller.topUp);
privateRoute.post("/transaction", transactionContoller.transaction);
privateRoute.get("/transaction/history", transactionContoller.history);

export { publicRoute, privateRoute };
