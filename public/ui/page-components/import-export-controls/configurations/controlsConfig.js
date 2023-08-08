const controlsConfig = ({ t }) => [
	{
		name        : 'importCountry',
		label       : t('importExportControls:details_control_import_label'),
		placeholder : t('importExportControls:details_control_country_placeholder'),
		type        : 'async_select',
		asyncKey    : 'country_list_with_flag',
		rules       : { required: true },
		initialCall : true,
	},
	{
		name        : 'exportCountry',
		label       : t('importExportControls:details_control_export_label'),
		placeholder : t('importExportControls:details_control_country_placeholder'),
		type        : 'async_select',
		asyncKey    : 'country_list_with_flag',
		rules       : { required: true },
		initialCall : true,
	},
	{
		name        : 'transportMode',
		label       : t('importExportControls:details_control_transport_label'),
		placeholder : t('importExportControls:details_control_transport_placeholder'),
		type        : 'select',
		options     : [
			{ label: t('importExportControls:ocean'), value: 'ocean' },
			{ label: t('importExportControls:air'), value: 'air' },
		],
		rules: { required: true },
	},
	{
		name        : 'manufacturingCountry',
		label       : t('importExportControls:details_control_manufacture_label'),
		placeholder : t('importExportControls:details_control_country_placeholder'),
		sublabel    : 'Optional',
		type        : 'async_select',
		asyncKey    : 'country_list_with_flag',
		initialCall : true,
	},
	{
		name        : 'importHsCode',
		label       : t('importExportControls:import_hscode_label'),
		placeholder : t('importExportControls:details_control_hscode_placeholder'),
		type        : 'number',
		rules       : { required: true },
	},
	{
		name        : 'exportHsCode',
		label       : t('importExportControls:export_hscode_label'),
		placeholder : t('importExportControls:details_control_hscode_placeholder'),
		type        : 'number',
		rules       : { required: true },
	},
	{
		name        : 'productUse',
		label       : t('importExportControls:details_control_product_label'),
		placeholder : t('importExportControls:details_control_product_placeholder'),
		type        : 'select',
		options     : [
			{ label: t('importExportControls:product_use_option_1'), value: 'military' },
			{ label: t('importExportControls:product_use_option_2'), value: 'commercial' },
		],
		rules: { required: true },
	},
	{
		name : 'productName',
		type : 'hidden',
	},
];

export default controlsConfig;
