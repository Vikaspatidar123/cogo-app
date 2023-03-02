const {
	buildCountries,
} = require('./build-scripts');

const buildApp = async () => {
	await buildCountries();
};

buildApp();
