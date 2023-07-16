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
	},
	{
		label       : 'Notification Preferrences',
		name        : 'notification_perferrences',
		type        : 'select',
		isClearable : true,
		placeholder : 'Select notification',
		multiple    : true,
		options     : [
			{ label: 'Whatsapp', value: 'whatsapp' },
			{ label: 'Email', value: 'email' },
		],
	},
	{
		label      : 'Upload any supporting documents',
		name       : 'file_url',
		type       : 'file',
		drag       : true,
		// showOptional : false,
		uploadIcon : <IcMCloudUpload fill="#DED7FC" height="62px" width="44px" />,
		// showProgress : true,
	},
];

export default controls;
