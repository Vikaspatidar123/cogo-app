// import CloudUpload from '../../../../Goods/GoodsDetails/SpecialConsideration/cloudUpload.svg';

const controls = [
	{
		name: 'certificates',
		showProgress: true,
		onlyURLOnChange: true,
		accept:
			'image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		uploadType: 'aws',
		themeType: 'secondary',
		// uploadIcon: () => <CloudUpload size={4} />,
		validations: [{ type: 'required', message: 'Mandatory' }],
		type: 'file',
		drag: true,
		label: 'Upload packing list',
		span: 12,
		height: 44,
		// value: dangerous_goods?.msds_document,
		rules: {
			required: true,
		},
	},
];

export default controls;
