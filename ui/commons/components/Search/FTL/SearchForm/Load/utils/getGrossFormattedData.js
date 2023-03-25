import { isEmpty } from '@cogoport/utils';

export const getGrossFormattedData = (loadData = {}) => {
	const grossDetails = loadData.gross_details || {};

	if (isEmpty(grossDetails)) {
		return grossDetails;
	}

	const grossResult = {
		packing_type   : grossDetails.packing_type || grossDetails.packing_type,
		packages_count : grossDetails.packages_count,
		package_weight : grossDetails.package_weight,
		volume         : grossDetails.volume,
		handling_type  : grossDetails.handling_type,
		dimensions     : {
			length : grossDetails.length || grossDetails.dimensions?.length,
			width  : grossDetails.width || grossDetails.dimensions?.width,
			height : grossDetails.height || grossDetails.dimensions?.height,
		},
	};

	return grossResult;
};
