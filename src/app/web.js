import express from "express";
import { publicRoute, privateRoute } from "./route.js";
import timeout from "connect-timeout";
import path from "path";
import timeoutHandler from "../handler/timeout.js";
import { catchAllError, catchUnhandledRejection } from "../handler/error.js";
import staticData from "../../staticData.js";

const app = express();

// set static folder
app.use("/public", express.static(path.join(staticData.__root, "public")));

// set middleware untuk menangkap semua error termaksud dari async agar sistem tidak mati
app.use(catchUnhandledRejection);

// set timeout
app.use(timeout("3s"));

// set agar dapat menerima json dari body
app.use(express.json());

//set router public
app.use(publicRoute);

//set router private
app.use(privateRoute);

//set handler untuk timeout
app.use(timeoutHandler);

//set untuk menangkap error dan memberikan response error ke client
app.use(catchAllError);

export default app;
