import { startCase } from '@cogoport/utils';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const zerothIndex = GLOBAL_CONSTANTS.zeroth_index;
const firstIndex = GLOBAL_CONSTANTS.first_index;
const secondIndex = 2;

const getNameSuggestions = ({ formData }) => {
	let nameSuggestions = [];

	const addName = (tempDestinationName) => {
		if (
			!nameSuggestions.includes(`${startCase(tempDestinationName)} Contract`)
		) {
			nameSuggestions = [
				...nameSuggestions,
				`${startCase(tempDestinationName)} Contract`,
			];
		}
	};

	formData.forEach((item) => {
		const portType = item?.service_type === 'air_freight' ? 'airport' : 'port';

		const originPort = (
			item?.[`origin_${portType}`]?.display_name
			|| item?.[`origin_${portType}`]?.name
		)?.split(',');

		const destinationPort = (
			item?.[`destination_${portType}`]?.display_name
			|| item?.[`destination_${portType}`]?.name
		)?.split(',');

		const tempOriginName = (
			originPort?.[firstIndex] || originPort?.[secondIndex] || originPort?.[zerothIndex]
		)?.trim();

		const tempDestinationName = (
			destinationPort?.[firstIndex] || destinationPort?.[secondIndex] || destinationPort?.[zerothIndex]
		)?.trim();

		addName(tempOriginName);
		addName(tempDestinationName);
	});

	return { nameSuggestions };
};

export default getNameSuggestions;
