import { IcMCloudUpload } from '@cogoport/icons-react';

const controls = [
	{
		label       : 'Select issue type',
		name        : 'issue_type',
		type        : 'async_select',
		placeholder : 'Select Type',
		rules       : {
			required: true,
		},
		defaultOptions : true,
		showOptional   : false,
	},
	{
		label       : 'Enter additional information',
		name        : 'additional_information',
		type        : 'textarea',
		placeholder : 'Enter Comments',
		theme       : 'admin',
		className   : 'primary md',
	},
	{
		label       : 'Notification Preferrences',
		name        : 'notification_perferrences',
		type        : 'select',
		isClearable : true,
		placeholder : 'Select notification',
		theme       : 'admin',
		multiple    : true,
		className   : 'primary md',
		options     : [
			{ label: 'Whatsapp', value: 'whatsapp' },
			{ label: 'Email', value: 'email' },
		],
	},
	{
		label        : 'Upload any supporting documents',
		name         : 'file_url',
		type         : 'file',
		themeType    : 'secondary',
		uploadType   : 'aws',
		drag         : true,
		showOptional : false,
		span         : 12,
		height       : 100,
		uploadIcon   : () => (
			<IcMCloudUpload fill="#DED7FC" height="62px" width="44px" />
		),
		theme        : 'admin',
		className    : 'primary md',
		showProgress : true,
	},
];

export default controls;
