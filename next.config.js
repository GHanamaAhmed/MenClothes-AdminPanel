/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "swiperjs.com",
			},
		],
	},
};

module.exports = nextConfig
