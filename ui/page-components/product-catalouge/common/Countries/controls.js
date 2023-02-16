import { COUNTRY_IDS } from '../../utils/constants';

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

const getControls = ({ setSelectedCountry }) => CARDFILTER.map((control) => {
	if (control.name === 'country') {
		return {
			...control,
			handleChange: (e) => setSelectedCountry(e?.countryName),
		};
	}
	return control;
});
export default getControls;
