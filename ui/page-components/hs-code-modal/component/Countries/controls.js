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

const getControls = ({ setSelectedCountry, countryOptions = {} }) => CARDFILTER.map((control) => {
	let newControl = { ...control };
	if (control.name === 'country') {
		newControl = { ...newControl, ...countryOptions };

		return {
			...newControl,
			handleChange: (e) => setSelectedCountry(e?.countryName),
		};
	}
	return newControl;
});
export default getControls;
