const calculator = (dimensions, serviceType = 'lcl_freight') => {
	let packagesCount = 0;
	let totalWeight = 0;
	let totalVolume = 0;
	let newPackages = [];
	let stackability = 'stackable';
	let packageTypes = [];

	(dimensions || []).forEach((item) => {
		packagesCount += Number(item?.packages_count);
		totalWeight
			+= Number(item?.packages_count)
			* Number(item?.package_weight || item?.weight);
		totalVolume
			+= (Number(item?.packages_count)
				* Number(item?.length)
				* Number(item?.width)
				* Number(item?.height))
			/ 1000000;
		newPackages = [...newPackages, item];

		if (serviceType === 'air_freight') {
			if (item?.handling_type === 'non_stackable') {
				stackability = 'non stackable';
			}
			if (!packageTypes.includes(item?.packing_type)) {
				packageTypes = [...packageTypes, item?.packing_type];
			}
		}
	});

	return {
		packagesCount,
		totalWeight,
		totalVolume,
		newPackages,
		stackability,
		packageType: packageTypes.join(', '),
	};
};

export default calculator;
