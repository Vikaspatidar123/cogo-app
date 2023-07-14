const resetObj = {
	productId           : '',
	name                : null,
	description         : '',
	hsCode              : '',
	quantity            : '',
	price               : '',
	product_price       : '',
	productCurrency     : '',
	productExchangeRate : '',
};

const productFormControls = ({ id, checkEdit }) => [
	{
		name : 'productId',
		type : 'hidden',
	},
	{
		name             : 'name',
		placeholder      : 'Name',
		label            : 'Name',
		type             : 'async_select',
		className        : 'name',
		noOptionsMessage : 'Type to search...',
		asyncKey         : 'list_products',
		params           : { userId: id, deletedRequired: checkEdit },
		isClearable      : true,
		initialCall      : true,
		size             : 'sm',
		width            : '15%',
		rules            : { required: true },
	},
	{
		name        : 'description',
		placeholder : 'Description',
		label       : 'Description',
		type        : 'text',
		className   : 'disable_field',
		disabled    : true,
		size        : 'sm',
		width       : '20%',

	},
	{
		name        : 'hsCode',
		placeholder : 'HS Code',
		label       : 'HS Code',
		type        : 'number',
		disabled    : true,
		className   : 'disable_field',
		size        : 'sm',
		width       : '15%',

		// isClearable : true,
	},
	{
		name        : 'quantity',
		placeholder : 'Quantity',
		label       : 'Quantity',
		type        : 'number',
		min         : 0,
		isClearable : true,
		size        : 'sm',
		width       : '15%',
		rules       : {
			required : true,
			min      : {
				value   : 1,
				message : 'Quantity should be greater than 0',
			},
		},

	},
	{
		name        : 'price',
		placeholder : 'Sell Price',
		label       : 'Sell Price',
		type        : 'number',
		min         : 0,
		isClearable : true,
		size        : 'sm',
		width       : '15%',
		rules       : {
			required : true,
			min      : {
				value   : 1,
				message : 'Selling Price should be greater than 0',
			},
		},
	},
	{
		name        : 'product_price',
		placeholder : 'Price',
		label       : 'Price',
		type        : 'hidden',
		// type: 'number',
		isClearable : true,
		size        : 'sm',
		width       : '15%',

	},
	{
		name : 'productCurrency',
		type : 'hidden',
	},
	{
		name : 'productExchangeRate',
		type : 'hidden',
	},
	{
		name        : 'discountAmount',
		placeholder : 'Discount Amount',
		label       : 'Discount Amount',
		type        : 'hidden',
		isClearable : true,
	},
	{
		name        : 'taxAmount',
		placeholder : 'Tax Amount',
		label       : 'Tax Amount',
		type        : 'hidden',
		isClearable : true,
	},
];

const productFieldArr = [
	{
		name     : 'products',
		type     : 'fieldArray',
		controls : [
			{
				name  : 'productId',
				type  : 'hidden',
				rules : { required: true },
			},
			{
				name : 'actualPrice',
				type : 'hidden',
			},
			{
				name        : 'name',
				placeholder : 'Name',
				type        : 'text',
				className   : 'name',
				disabled    : true,
				size        : 'sm',
				width       : '15%',
				rules       : { required: true },
			},
			{
				name        : 'description',
				placeholder : 'Description',
				type        : 'text',
				className   : 'description',
				disabled    : true,
				size        : 'sm',
				width       : '20%',

			},
			{
				name        : 'hsCode',
				placeholder : 'HS Code',
				type        : 'number',
				className   : 'hscode',
				disabled    : true,
				size        : 'sm',
				width       : '15%',
				// rules       : { required: true },
			},
			{
				name        : 'quantity',
				placeholder : 'Quantity',
				type        : 'number',
				className   : 'quantity',
				min         : 0,
				size        : 'sm',
				width       : '15%',
				rules       : {
					required : true,
					min      : {
						value   : 0,
						message : 'Should be greater than 0',
					},
				},
			},
			{
				name        : 'price',
				placeholder : 'Sell Price',
				type        : 'number',
				min         : 0,
				className   : 'price',
				disabled    : true,
				size        : 'sm',
				width       : '15%',

				rules: {
					required : true,
					min      : {
						value   : 0,
						message : 'Should be greater than 0',
					},
				},
			},
			{
				name        : 'product_price',
				placeholder : 'Price',
				type        : 'hidden',
				// type: 'number',
				className   : 'totalPrice',
				isClearable : true,
				size        : 'sm',
				width       : '15%',
				rules       : { required: true },
			},
			{
				name : 'productCurrency',
				type : 'hidden',
			},
			{
				name : 'productExchangeRate',
				type : 'hidden',
			},
			{
				name        : 'discountAmount',
				placeholder : 'Discount Amount',
				label       : 'Discount Amount',
				type        : 'hidden',
				isClearable : true,
				rules       : { required: true },
			},
			{
				name        : 'taxAmount',
				placeholder : 'Tax Amount',
				label       : 'Tax Amount',
				type        : 'hidden',
				isClearable : true,
				rules       : { required: true },
			},
		],
	},
];

export { productFormControls, productFieldArr, resetObj };
