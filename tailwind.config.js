/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			FontFace: {
				"Hacen-Tunisia": "Hacen Tunisia",
			},
			colors: {
				primaryColor: "#191919",
				scandaryColor: "#1FAB71",
				basketColor: "#403A63",
				card1: "#363636",
				card2: "#666666",
				lightContent: "#A7A7A7",
				lightSolid: "#CCCCCC",
				trueblue: "#429CBC",
				azure: "#3185FC",
			},
			backgroundImage: {
				"hero-pattern": "url('/pexels-tomáš-malík-1703317.webp')",
			},
		},
	},
	plugins: [],
});
