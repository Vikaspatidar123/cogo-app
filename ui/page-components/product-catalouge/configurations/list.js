const listConfig = {
	fields: [
		{
			key   : 'name',
			label : 'Name',
		},
		{
			key   : 'categoryDisplayName',
			label : 'Category',
		},
		{
			key     : 'subCategoryDisplayName',
			label   : 'SubCategory',
			toolTip : true,
		},
		{
			key   : 'hsCode',
			label : 'HsCode',
		},
		{
			key   : 'costPrice',
			label : 'Cost Price',
		},
		{
			key   : 'sellingPrice',
			label : 'Selling Price',
		},
		{
			key   : '',
			label : '',
			width : '10%',
			func  : 'renderIcon',
		},
	],
};

export default listConfig;
