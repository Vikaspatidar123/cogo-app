import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const CARDFILTER = [
	{
		label          : 'Country',
		name           : 'country',
		type           : 'select',
		placeholder    : 'Search Country',
		optionsListKey : 'hs_codes_countries',
		value          : GLOBAL_CONSTANTS.COUNTRY_IDS.IN,
		valueKey       : 'id',
		labelKey       : 'countryName',
		defaultOptions : true,
		theme          : 'admin',
		className      : 'primary md',
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

const getControls = ({ countryOptions = {} }) => CARDFILTER.map((control) => {
	const { name } = control;
	let newControl = { ...control };

	if (name === 'country') {
		newControl = { ...newControl, ...countryOptions };
	}
	return { ...newControl };
});

export default getControls;
