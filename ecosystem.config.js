module.exports = {
	apps: [
		{
      
			name: "fri7a-dashboard",
      script: "npm start",
      watch: true,
      env: {
        NODE_ENV: "production",
      },
		},
	],

	deploy: {
		production: {
			user: "root",
			host: "88.198.200.124",
			ref: "origin/main",
			repo: "git@github.com:0asaca0rum0/fri7a-dashboard.git",
			path: "/home/test01",
			"post-deploy":
				"source ~/.nvm/nvm.sh &&  npm install sharp&& pm2 reload ecosystem.config.js --env production",
		},
	},
};
