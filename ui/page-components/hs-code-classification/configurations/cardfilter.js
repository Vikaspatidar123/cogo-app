import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const CARDFILTER = [
	{
		label       : 'Country',
		name        : 'country',
		type        : 'select',
		placeholder : 'Search Country',
		asyncKey    : 'hs_code_countries',
		value       : GLOBAL_CONSTANTS.hs_code_country_ids.IN,
		valueKey    : 'id',
		labelKey    : 'countryName',
		initialCall : true,
		theme       : 'admin',
		className   : 'primary md',
	},
	{
		label       : 'Search by',
		name        : 'searchBy',
		placeholder : 'Search HS Code By',
		type        : 'select',
		value       : 'PRODUCT',
		options     : [
			{ label: 'HS Code', value: 'HS_CODE' },
			{ label: 'Product', value: 'PRODUCT' },
		],
		className: 'try',
	},
	{
		name        : 'searchTerm',
		label       : 'Search Term',
		placeholder : 'Enter Keyword/value',
		type        : 'text',
		value       : '',
		rules       : { required: true },
	},
];

const getControls = () => CARDFILTER.map((control) => {
	const newControl = { ...control };

	// if (name === 'country') {
	// 	newControl = { ...newControl, ...countryOptions };
	// }
	return { ...newControl };
});

export default getControls;
