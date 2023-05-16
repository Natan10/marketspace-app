module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
		plugins: [
			[
				require.resolve('babel-plugin-module-resolver'),
				{
					root: ["./src/"],
					alias: {
						"@dtos": "./src/dtos",
						"@components": "./src/components",
						"@routes": "./src/routes",
						"@screens": "./src/screens",
						"@utils": "./src/utils",
						"@assets": "./src/assets",
						"@contexts": "./src/contexts",
						"@hooks": "./src/hooks",
						"@theme": "./src/theme"
					}
				}
			]
		]
  };
};
