export const getHSCodeControls = ({ t }) => [
	{
		label : t('hsClassification:hs_code_classification_hs_code_control_label_2'),
		key   : 'displayHsCode',
		type  : 'text',
	},
	{
		label : t('hsClassification:hs_code_classification_hs_code_control_label_1'),
		key   : 'description',
		type  : 'text',
	},
	{
		label : '',
		key   : 'addProduct',
		type  : 'hyperLink',
		func  : 'renderAddProduct',
	},
	{
		label : '',
		key   : 'icon',
		type  : 'icon',
		func  : 'renderIcon',
	},
];
