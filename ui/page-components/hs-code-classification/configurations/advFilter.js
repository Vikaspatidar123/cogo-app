import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const getControls = ({ t }) => {
	const CONTROLS = [
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
			name        : 'searchBy',
			label       : t('hsClassification:hs_code_classification_filter_label_2'),
			value       : '',
			placeholder : t('hsClassification:hs_code_classification_filter_placeholder_2'),
			type        : 'select',
			options     : [
				{ label: 'Section', value: 'SECTION' },
				{ label: 'Chapter', value: 'CHAPTER' },
				{ label: 'Heading', value: 'HEADING' },
				{ label: 'HS Code', value: 'HS_CODE' },
			],
		},
		{
			name        : 'searchTerm',
			label       : t('hsClassification:hs_code_classification_filter_label_3'),
			placeholder : t('hsClassification:hs_code_classification_filter_placeholder_3'),
			type        : 'text',
			value       : '',
			rules       : { required: true },
		},
		{
			name        : 'filterBy',
			label       : t('hsClassification:hs_code_classification_filter_label_4'),
			placeholder : t('hsClassification:hs_code_classification_filter_placeholder_4'),
			value       : 'EQUALS',
			options     : [
				{ label: t('hsClassification:hs_code_classification_filter_by_label_1'), value: 'STARTS_WITH' },
				{ label: t('hsClassification:hs_code_classification_filter_by_label_2'), value: 'ENDS_WITH' },
				{ label: t('hsClassification:hs_code_classification_filter_by_label_3'), value: 'EQUALS' },
				{ label: t('hsClassification:hs_code_classification_filter_by_label_4'), value: 'CONTAINS' },
			],
			type: 'select',
		},
	];

	return CONTROLS.map((control) => {
		const newControl = { ...control };
		return { ...newControl };
	});
};

export default getControls;
