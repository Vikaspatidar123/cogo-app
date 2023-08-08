const getControls = ({ t }) => [
	{
		label : t('transactionHistory:controls_label_1'),
		name  : 'incoterm',
		type  : 'text',
		size  : 'sm',
		rules : {
			required: '*Required',
		},
		disabled: true,
	},
	{
		label : t('transactionHistory:controls_label_2'),
		name  : 'consignment',
		type  : 'number',
		size  : 'sm',
		rules : {
			required: '*Required',
		},
		disabled: true,
	},
	{
		label : t('transactionHistory:controls_label_3'),
		name  : 'result',
		type  : 'text',
		size  : 'sm',
		rules : {
			required: '*Required',
		},
		disabled: true,
	},
	{
		label : t('transactionHistory:controls_label_4'),
		name  : 'applicable',
		type  : 'number',
		size  : 'sm',
		rules : {
			required: '*Required',
		},
		disabled: true,
	},
];

export default getControls;
