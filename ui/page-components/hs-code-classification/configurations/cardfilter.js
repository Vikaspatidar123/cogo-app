import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const getControls = ({ t }) => {
	const CARDFILTER = [
		{
			label       : t('hsClassification:hs_code_classification_filter_label_1'),
			name        : 'country',
			type        : 'select',
			placeholder : t('hsClassification:hs_code_classification_filter_placeholder_1'),
			asyncKey    : 'hs_code_countries',
			value       : GLOBAL_CONSTANTS.hs_code_country_ids.IN,
			valueKey    : 'id',
			labelKey    : 'countryName',
			initialCall : true,
			theme       : 'admin',
			className   : 'primary md',
		},
		{
			label       : t('hsClassification:hs_code_classification_filter_label_2'),
			name        : 'searchBy',
			placeholder : t('hsClassification:hs_code_classification_filter_placeholder_2'),
			type        : 'select',
			value       : 'PRODUCT',
			options     : [
				{ label: 'HS Code', value: 'HS_CODE' },
				{ label: 'Product', value: 'PRODUCT' },
			],
			className: 'try',
		},
		{
			name        : 'searchTerm',
			label       : t('hsClassification:hs_code_classification_filter_label_3'),
			placeholder : t('hsClassification:hs_code_classification_filter_placeholder_3'),
			type        : 'text',
			value       : '',
			rules       : { required: true },
		},
	];

	return CARDFILTER.map((control) => {
		const newControl = { ...control };

		return { ...newControl };
	});
};

export default getControls;
