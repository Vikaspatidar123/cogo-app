const getAirFreightServices = ({ airPayloadObj, PackagesArr, packageType }) => {
	const completeAirPayload = PackagesArr.map((elem) => {
		let volume =			Number(elem.length || 0)
			* Number(elem.width || 0)
			* Number(elem.height || 0)
			* Number(elem.packages_count || 0);

		const weight = Number(elem.package_weight) * Number(elem.packages_count);

		if (packageType === 'per_package') {
			volume /= 1000000;

			return {
				...airPayloadObj,
				packages: [
					{
						...elem,
						package_weight: Number(elem?.package_weight || 0) || undefined,
					},
				],
				packages_count : elem.packages_count,
				weight         : Math.round(weight * 1000) / 1000,
				volume         : Math.round(volume * 1000000) / 1000000,
			};
		}

		return {
			...airPayloadObj,
			packages: [
				{
					...elem,
					package_weight: Number(elem?.package_weight || 0) || undefined,
				},
			],
			packages_count: elem.packages_count,
		};
	});

	return completeAirPayload;
};

export default getAirFreightServices;
