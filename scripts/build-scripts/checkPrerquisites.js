const path = require('path');

const fs = require('fs-extra');

const checkPrerquisites = () => {
	const dirPath = path.resolve(
		process.cwd(),
		'scripts/build-scripts/.processing-webflow',
	);

	const webflowPath = path.join(process.cwd(), '.data-store');

	const lastReadFilePath = path.join(webflowPath, 'last-read-at');
	if (fs.existsSync(lastReadFilePath)) {
		const lastReadFile = fs.readFileSync(lastReadFilePath);
		const lastReadAt = parseInt(lastReadFile.toString(), 10);
		const diff = new Date().getTime() - lastReadAt;

		// changing it to 1 millisecond
		if (diff < 1) {
			console.log('Skipping pre build, as already called in last 24 hrs...');
			return { exit: true };
		}
	}

	if (fs.existsSync(dirPath)) {
		fs.removeSync(dirPath);
	}

	fs.mkdirSync(dirPath);
	return { exit: false };
};
module.exports = checkPrerquisites;
