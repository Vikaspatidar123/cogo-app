import { IcMCloudUpload } from '@cogoport/icons-react';

const getControls = ({ t }) => [
	{
		label       : t('createTicketPublic:raise_issue_label_1'),
		name        : 'issue_type',
		type        : 'select',
		placeholder : t('createTicketPublic:raise_issue_placeholder_1'),
		rules       : {
			required: true,
		},
		defaultOptions: true,
	},
	{
		label       : t('createTicketPublic:raise_issue_label_2'),
		name        : 'additional_information',
		type        : 'textarea',
		placeholder : t('createTicketPublic:raise_issue_placeholder_2'),
	},
	{
		label       : t('createTicketPublic:raise_issue_label_3'),
		name        : 'notification_perferrences',
		type        : 'select',
		isClearable : true,
		placeholder : t('createTicketPublic:raise_issue_placeholder_3'),
		multiple    : true,
		options     : [
			{ label: 'Whatsapp', value: 'whatsapp' },
			{ label: 'Email', value: 'email' },
		],
	},
	{
		label      : t('createTicketPublic:raise_issue_label_4'),
		name       : 'file_url',
		type       : 'file',
		drag       : true,
		multiple   : true,
		uploadIcon : <IcMCloudUpload fill="#DED7FC" height="62px" width="44px" />,
	},
];

export default getControls;
