const path = require('path');

require('dotenv').config();
const fs = require('fs-extra');

const getCountries = require('./getCountries');

const setCountries = async () => {
	const dirPath = path.resolve(process.cwd(), '.data-store/constants');
	const countriesPath = path.resolve(dirPath, 'countries.json');
	try {
		fs.mkdirSync(dirPath, { recursive: true });
	} catch (err) {
		console.log("Can't make Countries folder");
	}
	console.log('Building Countries ...');
	await getCountries(
		fs.writeFileSync,
		countriesPath,
		`${process.env.NEXT_PUBLIC_APP_BASE_URL}/`,
	);
	console.log('Successfully Built Countries ...');
};

module.exports = setCountries;
