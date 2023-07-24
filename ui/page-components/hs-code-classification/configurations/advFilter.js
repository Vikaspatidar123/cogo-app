import getGeoConstants from '@/ui/commons/constants/geo';

const getControls = ({ t }) => {
	const geo = getGeoConstants();

	const CONTROLS = [
		{
			label       : t('hsClassification:hs_code_classification_filter_label_1'),
			name        : 'country',
			type        : 'async_select',
			placeholder : t('hsClassification:hs_code_classification_filter_placeholder_1'),
			asyncKey    : 'hs_code_countries',
			value       : geo.uuid.hs_code_country_id,
			valueKey    : 'id',
			labelKey    : 'countryName',
			initialCall : true,
		},
		{
			name        : 'searchBy',
			label       : t('hsClassification:hs_code_classification_filter_label_2'),
			placeholder : t('hsClassification:hs_code_classification_filter_placeholder_2'),
			type        : 'select',
			options     : [
				{ label: t('hsClassification:hs_code_classification_section_label'), value: 'SECTION' },
				{ label: t('hsClassification:hs_code_classification_chapter_label'), value: 'CHAPTER' },
				{ label: t('hsClassification:hs_code_classification_heading_label'), value: 'HEADING' },
				{ label: t('hsClassification:hs_code_classification_favourite_text_2'), value: 'HS_CODE' },
			],
		},
		{
			name        : 'searchTerm',
			label       : t('hsClassification:hs_code_classification_filter_label_3'),
			placeholder : t('hsClassification:hs_code_classification_filter_placeholder_3'),
			type        : 'text',
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

	return CONTROLS;
};

export default getControls;
