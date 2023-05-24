const controls = [
	{
		name        : 'country_id',
		type        : 'async_select',
		asyncKey    : 'countries',
		span        : 4,
		label       : 'Organization’s registration country',
		placeholder : 'Select country',
		rules       : { required: 'Required' },
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
		name          : 'preferred_languages',
		label         : 'Preferred Languages',
		multiple      : true,
		type          : 'select',
		span          : 4,
		autoCloseMenu : false,
		optionKey     : 'languages',
		placeholder   : 'Select preferred language(s)',
		rules         : { required: 'Required' },
	},
	{
		name            : 'utility_bill_document_url',
		type            : 'file',
		span            : 8,
		drag            : true,
		showProgress    : true,
		onlyURLOnChange : true,
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
