import { getCountrySpecificData } from '@/ui/commons/constants/CountrySpecificDetail';

const freeDaysArray = [
	'free_days_origin_detention',
	'free_days_origin_demurrage',
	'free_days_destination_detention',
	'free_days_destination_demurrage',
];
const dndArray = [
	'origin_detention',
	'origin_demurrage',
	'destination_detention',
	'destination_demurrage',
];

const getDetentionDemurrageDays = ({
	services,
	detailedServices,
	source,
	trade_type,
	primaryService,
}) => {
	const freeDay = source === 'direct' ? freeDaysArray : dndArray;

	const { origin_country_id } = primaryService || {};

	const { is_country_india } = getCountrySpecificData({
		country_id   : origin_country_id,
		accessorType : 'navigations',
		accessor     : 'common',
	});

	const isExportingCountryIndia =	is_country_india && trade_type === 'export';
	const service = source === 'direct' ? detailedServices : services;

	const primaryServices = Object.values(service || {})
		.map((per_service) => (per_service?.service_type === primaryService?.service_type
			? per_service
			: undefined))
		.filter((item) => item);
	const {
		free_days_origin_detention,
		free_days_origin_demurrage,
		free_days_destination_detention,
		free_days_destination_demurrage,
		origin_detention,
		origin_demurrage,
		destination_detention,
		destination_demurrage,
	} = primaryServices.reduce((acc, curr, index) => {
		const hash = {};
		freeDay.forEach((key) => {
			hash[key] =				source === 'direct'
				? curr[key] || 0
				: (curr[key]?.free_limit || 0) + (curr[key]?.additional_days || 0);
		});

		if (index === 0) {
			return hash;
		}

		const returnHash = {};
		freeDay.forEach((key) => {
			returnHash[key] = Math.min(acc[key], hash[key]);
		});

		return returnHash;
	}, {});

	let obj = {
		originDetention      : origin_detention,
		originDemurrage      : origin_demurrage,
		destinationDetention : destination_detention,
		destinationDemurrage : destination_demurrage,
	};

	if (source === 'direct') {
		obj = {
			originDetention      : free_days_origin_detention,
			originDemurrage      : free_days_origin_demurrage,
			destinationDetention : free_days_destination_detention,
			destinationDemurrage : free_days_destination_demurrage,
		};
	}

	if (isExportingCountryIndia) {
		if (obj.originDetention === null) {
			obj.originDetention = 4;
		}
		if (obj.originDemurrage === null) {
			obj.originDemurrage = 4;
		}
	}

	return obj;
};

export default getDetentionDemurrageDays;
