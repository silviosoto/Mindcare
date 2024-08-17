// validate if it is production
const isProd = process.env.NODE_ENV == "production";

// Configuration parameters
const basePath = "Mindcare/Front"; 

// Set configuration and env variables to project
module.exports = {
	output: "export",
	distDir: "dist",
	env: {
		PROJECT_NAME: "MindCare",
		YEAR: "2024",
		OAUTH2: "false",
		BASE_PATH: (basePath && isProd) ? `/${basePath}/` : "/"
	},
	images: { unoptimized: true },
	basePath: (basePath && isProd) ? `/${basePath}` : "", // Set base path to statics files,
}