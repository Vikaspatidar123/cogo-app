const listConfig = {
	fields: [
		{
			key   : 'name',
			label : 'Name',
			span  : 1.7,
		},
		{
			key   : 'categoryDisplayName',
			label : 'Category',
			span  : 2.9,
		},
		{
			key     : 'subCategoryDisplayName',
			label   : 'SubCategory',
			span    : 2.1,
			toolTip : true,
		},
		{
			key   : 'hsCode',
			label : 'HsCode',
			span  : 1.6,
		},
		{
			key   : 'costPrice',
			label : 'Cost Price',
			span  : 1.3,
		},
		{
			key   : 'sellingPrice',
			label : 'Selling Price',
			span  : 1.6,
		},
		{
			key   : '',
			label : '',
			width : '10%',
			span  : 0.5,
			func  : 'renderIcon',
		},
	],
};

export default listConfig;
