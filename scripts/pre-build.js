const {
	checkPrerquisites,
	buildWebflow,
	buildCountries,
	markLastRead,
} = require('./build-scripts');

const buildApp = async () => {
	const check = checkPrerquisites();

	if (check.exit === false) {
		await buildWebflow();
		await buildCountries();
		markLastRead();
	}
};

buildApp();
