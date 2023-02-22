const path = require('path');

const fs = require('fs-extra');

const markLastRead = () => {
	const webflowPath = path.join(process.cwd(), '.data-store');
	const lastReadFilePath = path.join(webflowPath, 'last-read-at');
	fs.writeFileSync(lastReadFilePath, new Date().getTime().toString());
};

module.exports = markLastRead;
