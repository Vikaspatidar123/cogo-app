import COUNTRY_IDS from '@/ui/commons/constants/globals';

const CARDFILTER = [
	{
		label          : 'Country',
		name           : 'country',
		type           : 'select',
		placeholder    : 'Search Country',
		optionsListKey : 'hs_codes_countries',
		value          : COUNTRY_IDS.IN,
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
