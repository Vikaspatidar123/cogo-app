const documentConfig = ({ t }) => [
	{
		name        : 'exportCountry',
		label       : t('importExportDoc:document_control_export_label'),
		placeholder : t('importExportDoc:document_control_placeholder'),
		asyncKey    : 'country_list_with_flag',
		type        : 'async_select',
		initialCall : true,
		rules       : { required: true },
	},
	{
		name        : 'importCountry',
		label       : t('importExportDoc:document_control_import_label'),
		placeholder : t('importExportDoc:document_control_placeholder'),
		asyncKey    : 'country_list_with_flag',
		type        : 'async_select',
		initialCall : true,
		rules       : { required: true },
	},
	{
		name        : 'transportMode',
		label       : t('importExportDoc:document_control_transport_label'),
		placeholder : t('importExportDoc:document_control_placeholder'),
		type        : 'select',
		options     : [
			{ label: 'Ocean', value: 'ocean' },
			{ label: 'Air', value: 'air' },
		],
		rules: { required: true },
	},
	{
		name        : 'manufacturingCountry',
		label       : t('importExportDoc:document_control_manufacture_label'),
		placeholder : t('importExportDoc:document_control_placeholder'),
		sublabel    : t('importExportDoc:document_control_sublabel'),
		asyncKey    : 'country_list_with_flag',
		type        : 'async_select',
		initialCall : true,
	},
	{
		name        : 'hsCode',
		label       : t('importExportDoc:document_control_hscode_label'),
		placeholder : t('importExportDoc:document_control_placeholder'),
		sublabel    : t('importExportDoc:document_control_sublabel'),
		type        : 'number',
	},
	{
		name : 'productName',
		type : 'hidden',
	},
];

export default documentConfig;
