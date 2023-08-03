export const getControls = (gst_list, setUpdatedValues) => [
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
		name                  : 'date_of_incorporation',
		label                 : 'Date of Incorporation',
		type                  : 'datepicker',
		isPreviousDaysAllowed : true,
		dateFormat            : 'dd MMM yyyy',
		rules                 : {
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
		label       : 'Pincode / Zip Code',
		name        : 'zipcode',
		type        : 'async_select',
		placeholder : 'Enter Pincode',
		rules       : { required: 'required *' },
		span        : 6,
		isClearable : true,
		params      : {
			filters: {
				type     : ['pincode'],
				includes : { country: true, region: true },
			},
		},
		asyncKey : 'locations',
		valueKey : 'postal_code',
		labelKey : 'display_name',
	},
	{
		name        : 'city',
		label       : 'City',
		type        : 'text',
		span        : 6,
		placeholder : 'City',
		rules       : { required: 'City is Required' },
	},
	{
		name        : 'state',
		label       : 'State',
		type        : 'text',
		span        : 6,
		placeholder : 'State',
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

];

export const getCompanyControls = ({
	gst_list, setUpdatedValues,
	setAddressDetail,
}) => getControls(gst_list, setUpdatedValues).map((control) => {
	if (control.name === 'zipcode') {
		return ({
			...control,
			handleChange: (e) => setAddressDetail(e),
		});
	}
	return control;
});
