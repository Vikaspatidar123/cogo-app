import { IcMCloudUpload } from '@cogoport/icons-react';

const uploadIcon = () => <IcMCloudUpload size={3.0} />;

const controls = [
	{
		name           : 'country_id',
		type           : 'select',
		span           : 4,
		optionsListKey : 'countries',
		label          : 'Organization’s registration country',
		placeholder    : 'Select country',
		rules          : { required: 'Required' },
	},
	{
		name        : 'registration_number',
		type        : 'text',
		span        : 4,
		label       : 'Organization’s PAN/Registration Number',
		placeholder : 'Type your organization’s PAN number?',
		rules       : { required: 'Required' },
	},
	{
		name           : 'preferred_languages',
		label          : 'Preferred Languages',
		multiple       : true,
		span           : 4,
		type           : 'select',
		caret          : true,
		autoCloseMenu  : false,
		optionsListKey : 'languages',
		placeholder    : 'Select preferred language(s)',
		rules          : { required: 'Required' },
	},
	{
		name            : 'utility_bill_document_url',
		type            : 'file',
		drag            : true,
		span            : 8,
		height          : 70,
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
