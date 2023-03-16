import { country_ids } from '../../configuration/countryId';

const CARDFILTER = [
	{
		label          : 'Country',
		name           : 'country',
		type           : 'select',
		placeholder    : 'Search Country',
		optionsListKey : 'hs_codes_countries',
		value          : country_ids.IN,
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
