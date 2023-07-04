const mobileValidator = /^[0-9]{10}$/;
// eslint-disable-next-line max-len
const emailValidator =	/^[^<>()[\]\\,;:%#^\s@"$&!@]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/;
const GstValidator = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

const createSellerControl = () => {
	const billingDetailControl = [
		{
			name        : 'name',
			label       : 'Billing Party Name *',
			placeholder : 'Enter Billing Party Name',
			type        : 'text',
			rules       : {
				required: '*Required',
			},
		},
		{
			name        : 'pincode',
			label       : 'Pincode *',
			type        : 'number',
			placeholder : 'Enter Pincode',
			rules       : {
				required  : '*Required',
				minLength : {
					value   : 6,
					message : 'min length is 6',
				},
				maxLength: {
					value   : 6,
					message : 'max length is 6',
				},
			},
		},
		{
			name        : 'tax_number',
			label       : 'Tax Number*',
			type        : 'text',
			placeholder : 'Enter Tax Number',
			rules       : {
				required : '*Required',
				pattern  : {
					value   : GstValidator,
					message : 'Invalid GST Number',
				},
			},
		},
		{
			name  : 'gst_proof',
			label : 'GST Proof',
			type  : 'file',
			rules : {
				required: '*Required',
			},
			accept: '.jpg , .png, .csv, .jpeg',
		},
		{
			name    : 'is_sez',
			label   : 'Is Your Address SEZ?',
			type    : 'checkbox',
			value   : false,
			options : [
				{
					label : 'YES',
					value : true,
				},
				{
					label : 'NO',
					value : false,
				},
			],
		},
		{
			name  : 'sez_proof',
			label : 'SEZ Proof*',
			type  : 'file',
			rules : {
				required: '*Required',
			},
			accept: '.jpg , .png, .csv, .jpeg',
		},
	];

	const pocDetailControl = [
		{
			name        : 'poc_name',
			label       : 'POC Name *',
			type        : 'text',
			placeholder : 'User\'s Name',
			rules       : {
				required: '*Required',
			},
		},
		{
			name        : 'address',
			label       : 'Address*',
			type        : 'textarea',
			placeholder : 'Enter Address',
			rows        : 1,
			rules       : {
				required: '*Required',
			},
		},
		{
			name         : 'mobile_number',
			label        : 'POC Mobile Number*',
			type         : 'mobile_number',
			isInputGroup : true,
			rules        : {
				required : true,
				pattern  : {
					value   : mobileValidator,
					message : 'Invalid mobile number',
				},
			},
			placeholder: 'User\'s Mobile Number',
		},
		{
			name        : 'email',
			label       : 'POC Email *',
			type        : 'text',
			placeholder : 'User\'s Email Address',
			rules       : {
				required : '*Required',
				pattern  : {
					value   : emailValidator,
					message : 'Invalid email',
				},
			},
		},
	];

	const resetSeller = {
		address       : '',
		email         : '',
		gst_proof     : null,
		is_sez        : false,
		mobile_number : null,
		name          : '',
		pincode       : '',
		poc_name      : '',
		sez_proof     : null,
		tax_number    : '',
	};

	return {
		billingDetailControl, pocDetailControl, resetSeller,
	};
};

export default createSellerControl;
