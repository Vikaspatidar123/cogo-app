import { IcAIdea } from '@cogoport/icons-react';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const getControls = ({ t, orgCountryCode }) => {
	const field = [
		{
			label       : t('hsClassification:hs_code_classification_filter_label_1'),
			name        : 'country',
			type        : 'async_select',
			placeholder : t('hsClassification:hs_code_classification_filter_placeholder_1'),
			asyncKey    : 'hs_code_countries',
			valueKey    : 'id',
			labelKey    : 'countryName',
			initialCall : true,
			className   : 'select',
		},
		{
			label       : t('hsClassification:hs_code_classification_filter_label_2'),
			name        : 'searchBy',
			placeholder : t('hsClassification:hs_code_classification_filter_placeholder_2'),
			type        : 'select',
			options     : [
				{ label: t('hsClassification:basic_filter_opt_1'), value: 'HS_CODE' },
				{ label: t('hsClassification:basic_filter_opt_2'), value: 'PRODUCT' },
			],
			className: 'select',

		},
		{
			name        : 'searchTerm',
			label       : t('hsClassification:hs_code_classification_filter_label_3'),
			placeholder : t('hsClassification:hs_code_classification_filter_placeholder_3'),
			type        : 'text',
			value       : '',
			rules       : { required: true },
			className   : 'input_select',
			prefix      : <IcAIdea width={20} height={20} />,

		},
	];

	const defaultValues = {
		searchBy : 'PRODUCT',
		country  : GLOBAL_CONSTANTS.hs_code_country_ids?.[orgCountryCode],
	};

	return { field, defaultValues };
};

export default getControls;
