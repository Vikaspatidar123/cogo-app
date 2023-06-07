function getSinglePackageDetails({ watch = () => {} }) {
	const ROUND_FIGURE = 1000000;
	const LB_TO_KG = 2.205;
	const CC_TO_CBM = 1000000;
	const INCHCUBE_TO_CBM = 61020;

	const packageQuantity = [];
	const packageWeight = [];
	const packageVolume = [];

	const DIMENSIONS_UNIT_MAPPING = {
		cm   : CC_TO_CBM,
		inch : INCHCUBE_TO_CBM,
	};

	const roundUp = (x) => Math.round(x * ROUND_FIGURE) / ROUND_FIGURE;

	(watch('packages') || []).forEach((item) => {
		packageQuantity.push(Number(item.quantity));
		if (item.weight_unit === 'kg_unit') {
			const wt = item.quantity * item.weight;
			packageWeight.push(roundUp(wt));
		}
		if (item.weight_unit === 'kg_total') {
			const wt = item.weight;
			packageWeight.push(roundUp(wt));
		}
		if (item.weight_unit === 'lb_unit') {
			const wt = (item.quantity * item.weight) / LB_TO_KG;
			packageWeight.push(roundUp(wt));
		}
		if (item.weight_unit === 'lb_total') {
			const wt = item.weight / LB_TO_KG;
			packageWeight.push(roundUp(wt));
		}

		const volume =			(item.quantity * item.length * item.width * item.height)
			/ DIMENSIONS_UNIT_MAPPING[item.dimensions_unit];
		// volume = Math.round(volume * ROUND_FIGURE) / ROUND_FIGURE;
		packageVolume.push(roundUp(volume));
	});

	return {
		packageQuantity,
		packageWeight,
		packageVolume,
	};
}

export default getSinglePackageDetails;
