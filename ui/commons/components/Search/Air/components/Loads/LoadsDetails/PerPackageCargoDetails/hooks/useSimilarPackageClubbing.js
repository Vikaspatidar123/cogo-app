function useSimilarPackageClubbing({ data }) {
	const packages = data.packages || [];

	for (let i = 0; i < packages.length; i += 1) {
		const { quantity } = packages[i];
		let firstQuantity = quantity;

		for (let j = i + 1; j < packages.length; j += 1) {
			const { quantity: lastQuantity } = packages[j];

			if (
				packages[i].packing_type === packages[j].packing_type
				&& packages[i].weight === packages[j].weight
				&& packages[i].length === packages[j].length
				&& packages[i].width === packages[j].width
				&& packages[i].height === packages[j].height
				&& packages[i].handling_type === packages[j].handling_type
				&& packages[i].dimensions_unit === packages[j].dimensions_unit
				&& packages[i].weight_unit === packages[j].weight_unit
			) {
				firstQuantity = Number(firstQuantity) + Number(lastQuantity);
				packages.splice(j, 1);
				packages[i].quantity = firstQuantity;
			}
		}
	}

	return {
		packages,
	};
}

export default useSimilarPackageClubbing;
