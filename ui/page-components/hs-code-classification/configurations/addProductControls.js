const getControls = ({ t }) => {
	const addProductControls = [
		{
			name        : 'hsCode',
			type        : 'number',
			label       : `${t('hsClassification:hs_code_classification_favourite_text_2')} *`,
			placeholder : t('hsClassification:hs_code_classification_favourite_text_2'),
			disabled    : true,
			rules       : {
				required  : t('hsClassification:hs_code_classification_add_product_controls_required_text'),
				minLength : {
					value   : 6,
					message : t('hsClassification:hs_code_classification_add_product_controls_invalid_hscode_text'),
				},
			},
		},
		{
			name        : 'name',
			label       : t('hsClassification:hs_code_classification_add_product_control_label_1'),
			placeholder : t('hsClassification:hs_code_classification_add_product_control_placeholder_1'),
			type        : 'text',
			rules       : { required: t('hsClassification:hs_code_classification_add_product_controls_required_text') },
		},
		{
			name        : 'costPrice',
			label       : t('hsClassification:hs_code_classification_add_product_control_label_2'),
			placeholder : t('hsClassification:hs_code_classification_add_product_control_placeholder_2'),
			type        : 'number',
			rules       : {
				required : t('hsClassification:hs_code_classification_add_product_controls_required_text'),
				min      : {
					value: 0.001,
					message:
					t('hsClassification:hs_code_classification_add_product_control_invalid_cost_price_text_1'),
				},
				maxLength: {
					value: 10,
					message:
					t('hsClassification:hs_code_classification_add_product_control_invalid_cost_price_text_2'),
				},
			},
		},
		{
			name        : 'sellingPrice',
			label       : t('hsClassification:hs_code_classification_add_product_control_label_3'),
			placeholder : t('hsClassification:hs_code_classification_add_product_control_placeholder_3'),
			type        : 'number',
			rules       : {
				required : t('hsClassification:hs_code_classification_add_product_controls_required_text'),
				min      : {
					value: 0.001,
					message:
					t('hsClassification:hs_code_classification_add_product_control_invalid_cost_price_text_1'),
				},
				maxLength: {
					value: 10,
					message:
					t('hsClassification:hs_code_classification_add_product_control_invalid_cost_price_text_2'),
				},
			},
		},
		{
			name        : 'description',
			label       : t('hsClassification:hs_code_classification_add_product_control_label_4'),
			placeholder : t('hsClassification:hs_code_classification_add_product_control_placeholder_4'),
			type        : 'textarea',
			rows        : 3,
			rules       : {
				maxLength: {
					value   : 150,
					message : t('hsClassification:hs_code_classification_invalid_description_text'),
				},
			},
			style: {
				height       : '100px',
				borderRadius : '4px',
			},
		},
		{
			name            : 'productImg',
			label           : t('hsClassification:hs_code_classification_add_product_control_label_5'),
			type            : 'file',
			onlyURLOnChange : true,
			accept          : '.png, .jpg, .jpeg, .svg',
			format          : '(png, jpg, jpeg, svg)',
			drag            : true,
			uploadType      : 'aws',
			style           : {
				borderRadius: '4px',
			},
		},
	];
	return addProductControls.map((control) => {
		const newControl = { ...control };
		return { ...newControl };
	});
};

export default getControls;
