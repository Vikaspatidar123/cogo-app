import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const getControls = ({ setSelectedCountry, countryOptions, t }) => {
	const CARDFILTER = [
		{
			label          : t('productCatalogue:product_catalogue_country_controls_label'),
			name           : 'country',
			type           : 'async_select',
			placeholder    : t('productCatalogue:product_catalogue_country_controls_placeholder'),
			asyncKey       : 'hs_codes_countries',
			value          : GLOBAL_CONSTANTS.hs_code_country_ids.IN,
			valueKey       : 'id',
			labelKey       : 'countryName',
			defaultOptions : true,
			theme          : 'admin',
			className      : 'primary md',
		},
	];

	return CARDFILTER.map((control) => {
		if (control.name === 'country') {
			const newControl = { ...control, ...countryOptions };

			return {
				...newControl,
				handleChange: (e) => setSelectedCountry(e?.countryName),
			};
		}
		return control;
	});
};
export default getControls;
