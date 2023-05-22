import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const CONTROLS = [
	{
		label       : 'Country',
		name        : 'country',
		type        : 'select',
		placeholder : 'Search Country',
		asyncKey    : 'hs_code_countries',
		value       : GLOBAL_CONSTANTS.COUNTRY_IDS.IN,
		valueKey    : 'id',
		labelKey    : 'countryName',
		initialCall : true,
		theme       : 'admin',
		className   : 'primary md',
	},
	{
		name        : 'searchBy',
		label       : 'Search By',
		value       : '',
		placeholder : 'Search By',
		type        : 'select',
		options     : [
			{ label: 'Section', value: 'SECTION' },
			{ label: 'Chapter', value: 'CHAPTER' },
			{ label: 'Heading', value: 'HEADING' },
			{ label: 'HS Code', value: 'HS_CODE' },
		],
	},
	{
		name        : 'searchTerm',
		label       : 'Search Term',
		placeholder : 'Enter value',
		type        : 'text',
		value       : '',
		rules       : { required: true },
	},
	{
		name        : 'filterBy',
		label       : 'Filter By',
		placeholder : 'Filter By',
		value       : 'EQUALS',
		options     : [
			{ label: 'Starts With', value: 'STARTS_WITH' },
			{ label: 'Ends With', value: 'ENDS_WITH' },
			{ label: 'Equals', value: 'EQUALS' },
			{ label: 'Contains', value: 'CONTAINS' },
		],
		type: 'select',
	},
];

const getControls = () => CONTROLS.map((control) => {
	const newControl = { ...control };

	// if (name === 'country') {
	// 	newControl = { ...newControl, ...countryOptions };
	// }
	return { ...newControl };
});

export default getControls;
