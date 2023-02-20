/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const path = require('path');

const fs = require('fs-extra');
const snakeCase = require('lodash/snakeCase');

const firstNums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

const webflow = async () => {
	try {
		console.log('Building Webflow...');

		const dirPath = path.resolve(
			process.cwd(),
			'scripts/build-scripts/.processing-webflow',
		);

		const webflowPath = path.join(process.cwd(), '.data-store');
		const apiScriptsPath = path.join(__dirname, 'apis');
		const files = fs.readdirSync(apiScriptsPath);
		const newFiles = [];

		for (let m = 0; m < files.length; m += 1) {
			const file = files[m];
			// eslint-disable-next-line no-await-in-loop
			const response = await require(`${apiScriptsPath}/${file}`)();
			const dirName = file.split('.js')[0];
			const slugs = [];

			if (!fs.existsSync(dirPath)) {
				fs.mkdirSync(dirPath);
			}

			if (fs.existsSync(`${dirPath}/${dirName}`)) {
				fs.removeSync(`${dirPath}/${dirName}`);
			}

			fs.mkdirSync(`${dirPath}/${dirName}`);

			for (let i = 0; i < ((response.data || {}).items || []).length; i += 1) {
				const item = ((response.data || {}).items || [])[i];
				let { slug } = item;
				slug = slug.replace(/([0-9])/g, '_$1');
				const casedSlug = snakeCase(slug);
				const firstChar = casedSlug[0];
				const originNalSlug = firstNums.includes(firstChar)
					? `_${casedSlug}`
					: casedSlug;
				slugs.push(originNalSlug);

				newFiles.push(`${webflowPath}/${dirName}/${slug}.js`);
				fs.writeFileSync(
					`${dirPath}/${dirName}/${slug}.js`,
					`export default ${JSON.stringify(item, null, 4)};`,
				);
				fs.appendFileSync(
					`${dirPath}/${dirName}/index.js`,
					`import ${originNalSlug} from './${slug}';\n`,
				);
			}
			newFiles.push(`${webflowPath}/${dirName}/index.js`);
			fs.appendFileSync(
				`${dirPath}/${dirName}/index.js`,
				`const ${dirName} = [${slugs.join(
					',',
				)}];\n\nexport default ${dirName};`,
			);
		}

		let oldFiles = [];
		if (fs.existsSync(webflowPath)) {
			const webflowFiles = fs.readdirSync(webflowPath);
			webflowFiles.forEach((_dirName) => {
				// eslint-disable-next-line no-underscore-dangle
				const _dirPath = path.join(webflowPath, _dirName);
				if (fs.lstatSync(_dirPath).isDirectory()) {
					// eslint-disable-next-line no-underscore-dangle
					const _dirFiles = fs.readdirSync(_dirPath);
					oldFiles = oldFiles.concat(
						_dirFiles
							.map((x) => path.join(_dirPath, x))
							.filter((x) => !newFiles.includes(x)),
					);
				}
			});
		}
		fs.copySync(dirPath, webflowPath);

		fs.removeSync(dirPath);
		oldFiles.map((f) => fs.removeSync(f));
		console.log('Successfully Built Webflow ...');
		return 'Success';
	} catch (e) {
		console.error(e);
		return e.message;
	}
};

module.exports = webflow;
