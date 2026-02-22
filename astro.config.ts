import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

export default defineConfig({
	output: "static",
	site: isGitHubPages ? "https://aigateways.github.io" : undefined,
	base: isGitHubPages ? "/aigateways-lp/" : "/",
	server: {
		port: 4000,
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
