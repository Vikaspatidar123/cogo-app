const addProductControls = [
	{
		name        : 'hsCode',
		type        : 'number',
		label       : 'Hs Code*',
		placeholder : 'Hs Code',
		disabled    : true,
		rules       : {
			required  : 'required',
			minLength : {
				value   : 6,
				message : 'minimum 6 digit is required',
			},
		},
	},
	{
		name        : 'name',
		label       : 'Product Name*',
		placeholder : 'Add Product Name',
		type        : 'text',
		rules       : { required: true },
	},
	{
		name        : 'costPrice',
		label       : 'Cost Price*',
		placeholder : 'Cost Price',
		type        : 'number',
		rules       : {
			required : true,
			min      : {
				value   : 0.001,
				message : 'Should be greater than 0',
			},
			maxLength: {
				value   : 10,
				message : 'maximum 10 digits are allowed',
			},
		},
	},
	{
		name        : 'sellingPrice',
		label       : 'Selling Price*',
		placeholder : 'Selling Price',
		type        : 'number',
		rules       : {
			required : true,
			min      : {
				value   : 0.001,
				message : 'Should be greater than 0',
			},
			maxLength: {
				value   : 10,
				message : 'maximum 10 digits are allowed',
			},
		},
	},
	{
		name        : 'description',
		label       : 'Description',
		placeholder : 'Enter Description',
		type        : 'textarea',
		rows        : 3,
		rules       : {
			maxLength: {
				value   : 150,
				message : 'maximum 150 characters are allowed',
			},
		},
		style: {
			height       : '100px',
			borderRadius : '4px',
		},
	},
	{
		name            : 'productImg',
		label           : 'Product Image',
		type            : 'file',
		uploadIcon      : 'ic-upload',
		onlyURLOnChange : true,
		accept          : '.png, .jpg, .jpeg, .svg',
		format          : '(png, jpg, jpeg, svg)',
		drag            : true,
		uploadType      : 'aws',
		style           : {
			borderRadius: '4px',
		},
	},
];

const getControls = () => addProductControls.map((control) => {
	const newControl = { ...control };
	return { ...newControl };
});

export default getControls;
