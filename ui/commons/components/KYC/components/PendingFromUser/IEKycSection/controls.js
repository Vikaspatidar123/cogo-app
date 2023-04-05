import { IcMCloudUpload } from '@cogoport/icons-react';

const uploadIcon = () => <IcMCloudUpload size={3.0} />;

const controls = [
	{
		name        : 'country_id',
		type        : 'async_select',
		asyncKey    : 'countries',
		label       : 'Organization’s registration country',
		placeholder : 'Select country',
		rules       : { required: 'Required' },
	},
	{
		name        : 'registration_number',
		type        : 'text',
		label       : 'Organization’s PAN/Registration Number',
		placeholder : 'Type your organization’s PAN number?',
		rules       : { required: 'Required' },
	},
	{
		name          : 'preferred_languages',
		label         : 'Preferred Languages',
		multiple      : true,
		type          : 'select',
		autoCloseMenu : false,
		optionkey     : 'languages',
		placeholder   : 'Select preferred language(s)',
		rules         : { required: 'Required' },
	},
	{
		name            : 'utility_bill_document_url',
		type            : 'file',
		drag            : true,
		showProgress    : true,
		onlyURLOnChange : true,
		uploadIcon,
		docName         : 'Business Address proof',
		lowerlabel      : `You can upload any of the following documents - 
					Electricity Bill, Water Bill, Telephone Landline Bill, Property 
					tax receipt, Current registered sale/lease/rent agreement, Gas connection bill, 
					Credit card statement ( not older than 6 months )`,
		label      : 'Business Address Proof',
		accept     : 'image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		uploadType : 'aws',
		rules      : { required: 'Required' },
	},
];

export default controls;
