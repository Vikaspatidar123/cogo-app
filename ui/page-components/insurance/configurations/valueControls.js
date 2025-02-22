const invoiceNumberValidator = /^[^~!@#$%^&*()+=}:;"'<>?{]+$/;

const controls = [
	{
		name        : 'policyCurrency',
		type        : 'select',
		placeholder : 'Currency',
		options     : [
			{
				label : 'INR',
				value : 'INR',
			},
			{
				label : 'USD',
				value : 'USD',
			},
		],
	},
	{
		name        : 'cargoAmount',
		placeholder : 'Consignment Value',
		type        : 'number',
		rules       : {
			maxValue: {
				value   : 400000000,
				message : 'Maximum Invoice Value is INR 400000000 only for Bajaj',
			},
		},
	},
	{
		name        : 'invoiceNo',
		placeholder : 'Invoice No.',
		type        : 'text',
		rules       : {
			pattern: {
				value   : invoiceNumberValidator,
				message : 'No special characters are allowed',
			},
		},
	},
	{
		name                  : 'invoiceDate',
		placeholder           : 'Invoice Date',
		maxDate               : new Date(),
		type                  : 'datepicker',
		isPreviousDaysAllowed : true,
	},
	{
		name        : 'invoiceDoc',
		placeholder : 'Invoice Proof',
		type        : 'file',
		accept      : '.pdf, .png, .jpg, .jpeg,',
	},
	{
		name        : 'panDoc',
		placeholder : 'PAN Proof',
		type        : 'file',
		accept      : '.pdf, .png, .jpg, .jpeg,',
	},
	{
		name        : 'gstDoc',
		placeholder : 'Tax Number Proof',
		type        : 'file',
		accept      : '.pdf, .png, .jpg, .jpeg,',
	},
	{
		name        : 'aadharDoc',
		placeholder : 'Aadhar Proof',
		type        : 'file',
		accept      : '.pdf, .png, .jpg, .jpeg,',
	},
];

const getControls = ({ uploadType }) => {
	const modifiedControls = controls.filter((item) => (uploadType === 'CORPORATE'
		? item.name !== 'aadharDoc' : item.name !== 'gstDoc'));
	return modifiedControls;
};

export default getControls;
