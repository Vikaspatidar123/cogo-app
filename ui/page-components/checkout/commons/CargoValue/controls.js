import getGeoConstants from '@/ui/commons/constants/geo';

const geo = getGeoConstants();

const controls = [
	{
		name        : 'cargo_value_currency',
		label       : 'Currency',
		type        : 'select',
		placeholder : 'Cargo Value',
		value       : {
			currency : geo.country.currency.code,
			price    : '',
		},
		rules: {
			required : true,
			validate : (value) => (value.price <= 0 ? 'Cannot be Negative or Zero' : undefined),
		},
	},
];

export default controls;
