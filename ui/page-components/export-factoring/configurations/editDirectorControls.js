export const getDirectorControls = (gst_list, setUpdatedValues) => [

	{
		name     : 'pan',
		label    : 'PAN',
		type     : 'text',
		disabled : true,
		rules    : {
			required: true,
		},
	},
	{
		name  : 'shareholder_percentage',
		label : 'Shareholder Percentage (%)',
		type  : 'text',

	},
	{
		name  : 'dob',
		label : 'Date of Birth',
		type  : 'datepicker',
		rules : {
			required: true,
		},
	},
	{
		name    : 'gender',
		label   : 'Gender',
		type    : 'radiogroup',
		options : [{ label: 'MALE', value: 'Male' }, { label: 'Female', value: 'Female' }],
		rules   : {
			required: true,
		},
	},
	{
		name  : 'DIN',
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
		name  : 'country',
		label : 'Country',
		type  : 'text',
		rules : {
			required: true,
		},
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
