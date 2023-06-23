import { startCase } from '@cogoport/utils';

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
			item?.[`origin_${portType}`]?.display_name || item?.[`origin_${portType}`]?.name || ''
		).split(',');
		const destinationPort = (
			item?.[`destination_${portType}`]?.display_name
			|| item?.[`destination_${portType}`]?.name || ''
		).split(',');
		const tempOriginName = (
			originPort?.[1] || originPort?.[2] || originPort?.[0] || ''
		).trim();
		const tempDestinationName = (
			destinationPort?.[1] || destinationPort?.[2] || destinationPort?.[0] || ''
		).trim();
		addName(tempOriginName);
		addName(tempDestinationName);
	});

	return { nameSuggestions };
};

export default getNameSuggestions;
