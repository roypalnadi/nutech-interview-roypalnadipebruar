import app from "./app/web.js";
import { appHost, appPort } from "./configApp.js";

const host = appHost;
const port = appPort;

app.listen(port, host, () => {
	console.log(`app listening on ${host}:${port}`);
});
