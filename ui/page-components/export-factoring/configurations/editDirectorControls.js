export const getDirectorControls = (constitutionMapping = '') => [

	{
		name  : 'registration_number',
		label : 'PAN',
		type  : 'text',
		rules : {
			required: true,
		},
	},
	{
		name  : 'shareholder_percentage',
		label : `${constitutionMapping.share_percent_label} (%)`,
		type  : 'text',

	},
	{
		name                  : 'date_of_birth',
		label                 : 'Date of Birth',
		type                  : 'datepicker',
		isPreviousDaysAllowed : true,
		dateFormat            : 'dd MMM yyyy',
		rules                 : {
			required: true,
		},
	},
	{
		name    : 'gender',
		label   : 'Gender',
		type    : 'radiogroup',
		options : [{ label: 'MALE', value: 'M' }, { label: 'Female', value: 'F' }],
		rules   : {
			required: true,
		},
	},
	{
		name  : 'din',
		label : 'DIN',
		type  : 'text',
	},
	{
		name  : 'address',
		label : 'Address',
		type  : 'text',
		rules : {
			required: true,
		},
	},
	{
		name  : 'city',
		label : 'City',
		type  : 'text',
		rules : {
			required: true,
		},
	},
	{
		name  : 'state',
		label : 'State',
		type  : 'text',
		rules : {
			required: true,
		},
	},
	{
		label          : 'Country',
		name           : 'country',
		type           : 'async_select',
		placeholder    : 'Enter Site/Entity',
		asyncKey       : 'locations',
		defaultOptions : true,
		params         : {
			filters: {
				type: ['country'],
			},
		},
		theme     : 'admin',
		className : 'primary md',
	},
	{
		name  : 'pincode',
		label : 'Pincode',
		type  : 'text',
		rules : {
			required: true,
		},
	},

];
