const useCalaculation = ({ formValue, checkedData }) => {
	const { containerCalculator = [] } = formValue || {};

	const MAPPING = {
		'20 Feet': 20,
		'40 Feet': 48,
		'40 High Cube': 48,
	};

	const CheckPoint = (x, value, name) => {
		const packageVolume = ((((x.length / 1000) * x.width) / 1000) * x.Height) / 1000;
		const getTotalQuantity = containerCalculator.reduce(
			(prev, current) => prev + Number(current.quantity),
			0,
		);

		let containerUsableVolume = value;
		const result = [];
		let packageInOneContainer = 0;
		for (let i = 0; i < getTotalQuantity; i += 1) {
			if (containerUsableVolume >= packageVolume) {
				containerUsableVolume -= packageVolume;
				packageInOneContainer += 1;
			} else {
				result.push({
					totalUsedVolume: packageInOneContainer * packageVolume,
					packageCount: packageInOneContainer,
					volumeUsedByContainer: `${((packageInOneContainer / value) * 60).toFixed(2)}%`,
					containerFeet: name,
					totalWeight: x.quantity * x.typeWeight,
					type: x.type,
					quantity: x.quantity,
					typeWeight: x.typeWeight,
					volume:
						(((((x.length / 1000) * x.width) / 1000) * x.Height) / 1000) * x.quantity,
				});
				containerUsableVolume = value;
				packageInOneContainer = 1;
			}
		}

		if (packageInOneContainer !== 0) {
			result.push({
				totalUsedVolume: packageInOneContainer * packageVolume,
				packageCount: packageInOneContainer,
				volumeUsedByContainer: `${((packageInOneContainer / value) * 60).toFixed(2)}%`,
				containerFeet: name,
				totalWeight: x.quantity * x.typeWeight,
				type: x.type,
				quantity: x.quantity,
				typeWeight: x.typeWeight,
				volume: (((((x.length / 1000) * x.width) / 1000) * x.Height) / 1000) * x.quantity,
			});
		}

		const totalVolume = result.reduce(
			(prev, current) => prev + Number(current.totalUsedVolume),
			0,
		);

		const totalWeight = result.reduce(
			(prev, current) => prev + Number(current.packageCount * current.typeWeight),
			0,
		);

		const containerName = name;

		return {
			res: result,
			totalVolume,
			totalWeight,
			containerName,
			left: containerUsableVolume,
		};
	};

	const multipleContaionerData = containerCalculator.map((x) => {
		const res = checkedData.map((item) => CheckPoint(x, +MAPPING[item.name], item.value));
		return res;
	});

	// const finalContainer = (containerCalculator || []).map((x) => ({
	// 	...x,
	// 	volume: (((((x.length / 1000) * x.width) / 1000) * x.Height) / 1000) * x.quantity,
	// 	totalWeight: x.quantity * x.typeWeight,
	// 	x,
	// }));

	const sumWidth = containerCalculator.reduce(
		(prev, value) => prev + +value.typeWeight,
		0,
	);

	const quantity = containerCalculator.reduce((prev, value) => prev + +value.quantity, 0);

	// const sumTotal = finalContainer.reduce((prev, value) => prev + +value.volume, 0);

	// const weightTotal = finalContainer.reduce(
	// 	(prev, value) => prev + +value.totalWeight,
	// 	0,
	// );

	return {
		sumWidth,
		quantity,
		// sumTotal,
		containerCalculator,
		// finalContainer,
		// weightTotal,
		multipleContaionerData,
	};
};

export default useCalaculation;
