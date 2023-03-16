import { COUNTRY_IDS } from '../../../../commons/utils/constants';

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
