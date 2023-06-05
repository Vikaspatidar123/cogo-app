import getGeoConstants from '@/ui/commons/constants/geo';

const SELL_WITHOUT_BUY_ALLOWED_SERVICES = [
	'fcl_freight',
	'lcl_freight',
	'air_freight',
	'trailer_freight',
	'ftl_freight',
	'ltl_freight',
	'haulage_freight',
	'fcl_customs',
	'lcl_customs',
	'air_customs',
	'rail_domestic_freight',
];

const SELL_WITHOUT_BUY_WITH_RATES_SERVICES = ['fcl_freight', 'air_freight'];

const swbAllowedServices = ({ search_type, trade_type, rates }) => {
	const geo = getGeoConstants();
	let swb_with_rates = false;
	let swb_without_rates = false;

	const ftl_default_provider_check = (rates || [])
		.every((rate) => rate?.service_provider_id === geo?.uuid.cogoxpress_id);

	if (SELL_WITHOUT_BUY_ALLOWED_SERVICES.includes(search_type)) {
		swb_without_rates = true;
	}

	if (SELL_WITHOUT_BUY_WITH_RATES_SERVICES.includes(search_type)) {
		swb_with_rates = true;
	}

	if (search_type === 'ftl_freight' && ftl_default_provider_check) {
		swb_with_rates = true;
	}

	if (search_type === 'air_freight' && trade_type === 'domestic') {
		swb_without_rates = false;
		swb_with_rates = false;
	}

	return { swb_with_rates, swb_without_rates };
};

export default swbAllowedServices;
