const { execSync } = require('child_process');
const path = require('path');

const fs = require('fs-extra');

const deployApp = () => {
	const env_files = [
		'.env',
		'.env.local',
		'.env.production',
		'.env.production.local',
		'.env.development',
		'.env.development.local',
	];

	let deploySequence = [];

	const args = process.argv.slice(2);
	if (args.length > 0) {
		const branch = args[0];
		deploySequence = [`git checkout ${branch}`, ...deploySequence];
	}

	const dirPath = path.resolve(process.cwd());
	let envFlag = false;
	env_files.forEach((env_file) => {
		if (fs.existsSync(path.join(dirPath, env_file))) {
			envFlag = true;
		}
	});
	if (!envFlag) {
		throw new Error('.env file does not exist');
	}

	console.log('Deploying Cogo App...');

	deploySequence.forEach((deployCommand) => {
		console.log('execute', deployCommand);
		try {
			const exec_res = execSync(deployCommand);
			console.log(exec_res.toString());
		} catch (error) {
			throw new Error(error.message);
		}
	});
};

deployApp();
