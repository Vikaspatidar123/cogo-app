export const getFormattedData = (loadData = {}) => {
	const pacakgeData =		loadData?.per_package_details?.packages
		|| loadData?.per_package_details
		|| [];
	const results = [];

	pacakgeData?.forEach((item) => {
		results.push({
			packing_type   : item?.package_type || item?.packing_type,
			packages_count : item?.packages_count,
			package_weight : item?.package_weight,
			dimensions     : {
				length : item?.length || item?.dimensions?.length,
				width  : item?.width || item?.dimensions?.width,
				height : item?.height || item?.dimensions?.height,
			},
			handling_type: item?.handling_type,
		});
	});
	return results;
};
