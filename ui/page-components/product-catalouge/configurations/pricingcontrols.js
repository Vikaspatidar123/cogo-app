const getControls = ({ t }) => {
	const controls = [
		{
			label       : t('productCatalogue:product_catalogue_pricing_control_label_1'),
			name        : 'hsCode',
			type        : 'number',
			placeholder : t('productCatalogue:product_catalogue_pricing_control_label_1'),
			disabled    : true,
			rules       : {
				required: t('productCatalogue:product_catalogue_pricing_form_required_text'),
			},
		},
		{
			label       : t('productCatalogue:product_catalogue_sub_categorylist_column_title_6'),
			name        : 'sellingPrice',
			type        : 'number',
			placeholder : t('productCatalogue:product_catalogue_sub_categorylist_column_title_6'),
			rules       : {
				required: t('productCatalogue:product_catalogue_pricing_form_required_text'),
			},
		},
		{
			label       : t('productCatalogue:product_catalogue_sub_categorylist_column_title_5'),
			name        : 'costPrice',
			type        : 'number',
			placeholder : t('productCatalogue:product_catalogue_sub_categorylist_column_title_5'),
			rules       : {
				required: t('productCatalogue:product_catalogue_pricing_form_required_text'),
			},
		},
		{
			label       : t('productCatalogue:product_catalogue_pricing_control_label_2'),
			name        : 'name',
			type        : 'text',
			placeholder : t('productCatalogue:product_catalogue_pricing_control_placeholder_2'),
			rules       : {
				required  : t('productCatalogue:product_catalogue_pricing_form_required_text'),
				maxLength : {
					value   : 50,
					message : t('productCatalogue:product_catalogue_pricing_form_required_text_2'),
				},
			},
		},
		{
			label       : t('productCatalogue:product_catalogue_pricing_control_label_3'),
			name        : 'description',
			type        : 'textarea',
			rows        : 3,
			placeholder : t('productCatalogue:product_catalogue_pricing_control_placeholder_3'),
			rules       : {
				maxLength: {
					value   : 150,
					message : t('productCatalogue:product_catalogue_pricing_form_required_text_3'),
				},
			},
		},
		{
			name            : 'productImg',
			label           : t('productCatalogue:product_catalogue_pricing_control_label_4'),
			type            : 'file',
			onlyURLOnChange : true,
			accept          : '.png, .jpg, .jpeg, .svg',
			format          : '(png, jpg, jpeg, svg)',
			drag            : true,
			uploadType      : 'aws',
		},
	];

	return controls.map((control) => ({ ...control }));
};

export default getControls;
