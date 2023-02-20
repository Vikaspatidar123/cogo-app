const COUNTRY_IDS = {
	IN: '5f1f94fa-25da-40de-968d-0254abd24ba6',
};

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
	return control;
});
export default getControls;
