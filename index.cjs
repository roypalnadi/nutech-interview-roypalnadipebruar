import("./src/main.js")
	.then((module) => {
		if (module.default) {
			module.default();
		}
	})
	.catch((err) => {
		console.error("Error loading module:", err);
	});
