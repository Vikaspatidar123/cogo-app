const getlistConfig = ({ t }) => ({
	fields: [
		{
			key   : 'name',
			label : t('productCatalogue:product_catalogue_sub_categorylist_column_title_1'),
		},
		{
			key   : 'categoryDisplayName',
			label : t('productCatalogue:product_catalogue_sub_categorylist_column_title_2'),
		},
		{
			key     : 'subCategoryDisplayName',
			label   : t('productCatalogue:product_catalogue_sub_categorylist_column_title_3'),
			toolTip : true,
		},
		{
			key   : 'hsCode',
			label : t('productCatalogue:product_catalogue_sub_categorylist_column_title_4'),
		},
		{
			key   : 'costPrice',
			label : t('productCatalogue:product_catalogue_sub_categorylist_column_title_5'),
		},
		{
			key   : 'sellingPrice',
			label : t('productCatalogue:product_catalogue_sub_categorylist_column_title_6'),
		},
		{
			key   : '',
			label : '',
			width : '10%',
			func  : 'renderIcon',
		},
	],
});

export default getlistConfig;
