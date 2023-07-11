import { getByKey } from '@cogoport/utils';

const getControls = ({ setCountryDetails, formDetails, countryOptions, t }) => {
	const controls = [
		{
			label       : t('traderEligibilityCheck:tec_form_name_label'),
			name        : 'name',
			type        : 'text',
			placeholder : t('traderEligibilityCheck:tec_form_name_label'),
			rules       : { required: 'required' },
		},
		{
			label       : t('traderEligibilityCheck:tec_form_country_label'),
			name        : 'countryId',
			type        : 'select',
			placeholder : t('traderEligibilityCheck:tec_form_country_label'),
			rules       : { required: 'required' },
		},
		{
			label       : t('traderEligibilityCheck:tec_form_postal_code_label'),
			name        : 'postal_code',
			type        : 'text',
			placeholder : t('traderEligibilityCheck:tec_form_postal_code_placeholder'),
		},
		{
			label       : t('traderEligibilityCheck:tec_form_state_label'),
			name        : 'state',
			type        : 'text',
			placeholder : t('traderEligibilityCheck:tec_form_state_label'),
			width       : '45%',
		},
		{
			label       : t('traderEligibilityCheck:tec_form_city_label'),
			name        : 'city',
			type        : 'text',
			placeholder : t('traderEligibilityCheck:tec_form_city_label'),
			width       : '45%',
		},
		{
			label       : t('traderEligibilityCheck:tec_form_address_label'),
			name        : 'address',
			type        : 'text',
			placeholder : t('traderEligibilityCheck:tec_form_address_placeholder'),
		},
	];

	return controls.map((control) => {
		if (control.name === 'countryId') {
			return {
				...control,
				...countryOptions,
				handleChange: (e) => {
					setCountryDetails(() => ({
						countryName : e?.display_name,
						countryCode : e?.country_code,
					}));
				},
				value: getByKey(formDetails?.formValues, control.name) || '',
			};
		}
		return {
			...control,
			...countryOptions,
			value: getByKey(formDetails?.formValues, control.name) || '',
		};
	});
};
export default getControls;
