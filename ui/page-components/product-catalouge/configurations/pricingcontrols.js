const controls = [
	{
		label: 'HS Code',
		name: 'hsCode',
		type: 'number',
		placeholder: 'HS Code',
		disabled: true,
		rules: {
			required: 'Required',
		},
	},
	{
		label: 'Selling Price',
		name: 'sellingPrice',
		type: 'number',
		placeholder: 'Selling Price',
		rules: {
			required: 'Required',
		},
	},
	{
		label: 'Cost Price',
		name: 'costPrice',
		type: 'number',
		placeholder: 'Cost Price',
		rules: {
			required: 'Required',
		},
	},
	{
		label: 'Product Name',
		name: 'name',
		type: 'text',
		placeholder: 'Add Product Name',
		rules: {
			required: 'Required',
			maxLength: {
				value: 50,
				message: 'length for product name is 50 characters',
			},
		},
	},
	{
		label: 'Description',
		name: 'description',
		type: 'textarea',
		rows: 3,
		placeholder: 'Enter Description',
		rules: {
			maxLength: {
				value: 150,
				message: 'length for Product Description is 150 characters',
			},
		},
	},
	{
		name: 'productImg',
		label: 'Product Image',
		type: 'file',
		uploadIcon: 'ic-upload',
		onlyURLOnChange: true,
		accept: '.png, .jpg, .jpeg, .svg',
		format: '(png, jpg, jpeg, svg)',
		drag: true,
		uploadType: 'aws',
	},
];

const getControls = () => {
	return controls.map((control) => {
		return { ...control };
	});
};

export default getControls;
