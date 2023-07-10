import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const CARDFILTER = [
	{
		label          : 'Country',
		name           : 'country',
		type           : 'async_select',
		placeholder    : 'Search Country',
		asyncKey       : 'hs_codes_countries',
		value          : GLOBAL_CONSTANTS.hs_code_country_ids.IN,
		valueKey       : 'id',
		labelKey       : 'countryName',
		defaultOptions : true,
		theme          : 'admin',
		className      : 'primary md',
	},
];

const getControls = ({ setSelectedCountry, countryOptions }) => CARDFILTER.map((control) => {
	if (control.name === 'country') {
		const newControl = { ...control, ...countryOptions };

		return {
			...newControl,
			handleChange: (e) => setSelectedCountry(e?.countryName),
		};
	}
	return control;
});
export default getControls;
