export const getCompanyControls = (gst_list, setUpdatedValues) => [
	{
		name     : 'name',
		label    : 'Name',
		type     : 'text',
		disabled : true,
		rules    : {
			required: true,
		},

	},
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
		name     : 'org_iec_number',
		label    : 'iec',
		type     : 'text',
		disabled : true,
		rules    : {
			required: true,
		},
	},
	{
		name  : 'cin',
		label : 'CIN/LLPIN',
		type  : 'text',
	},
	{
		name  : 'date',
		label : 'Date of Incorporation',
		type  : 'datepicker',
		rules : {
			required: true,
		},
	},
	{
		name         : 'gst_number',
		label        : 'GST Number',
		type         : 'select',
		options      : gst_list.map((x) => ({ label: x.gstin, value: x.gstin })),
		handleChange : (e) => {
			setUpdatedValues((prev) => ({ ...prev, address: gst_list.find((x) => x.gstin === e.value).address }));
		},
	},
	{
		name  : 'company_address',
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
	{
		type  : 'text',
		name  : 'constitution_of_business',
		label : 'Constitution of Business',
		rules : {
			required: true,
		},

	},

];
