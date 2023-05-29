const controls = () => [
	{
		label     : 'Number of Bill of Lading',
		name      : 'bls_count',
		type      : 'number',
		condition : { services: ['fcl_freight'] },
		rules     : { min: 1, max: 10000 },
		style     : { width: '350px' },
	},
	{
		label   : 'Bill of lading (B/L) type',
		name    : 'bl_type',
		type    : 'chips',
		caret   : true,
		options : [
			{
				key      : 'rfs',
				children : 'RFS (Original) - Received For Shipment',
			},
			{
				key      : 'sob',
				children : 'SOB (Original) - Shipped on Board',
			},
			{
				key      : 'seaway',
				children : 'Seaway (Original) Bill',
			},
		],
		condition : { services: ['fcl_freight'] },
		style     : { width: '350px' },
	},
	{
		name    : 'export_transportation_cargo_handling_type',
		label   : 'Origin Cargo Stuffing',
		type    : 'chips',
		caret   : true,
		options : [
			{
				key      : 'stuffing_at_factory',
				children : 'Factory Stuffing',
			},
			{
				key      : 'stuffing_at_dock',
				children : 'Dock Stuffing',
			},
		],
		condition : { services: ['export_fcl_customs', 'export_transportation'] },
		rules     : { required: 'This is required' },
		style     : { width: '350px' },
	},
	{
		label       : 'Pickup Pincode',
		name        : 'export_transportation_location_id',
		placeholder : 'Search via pincode',
		type        : 'async_select',
		caret       : true,
		asyncKey    : 'locations',
		style       : { width: '350px' },
		grouped     : ['city'],
		params      : { filters: { type: ['pincode', 'city'] } },
		condition   : { services: ['export_transportation'] },
		rules       : { required: 'This is required' },
	},
	{
		label       : 'Address',
		name        : 'export_transportation_address',
		placeholder : 'Enter address',
		type        : 'textarea',
		condition   : { services: ['export_transportation'] },
		style       : { width: '350px' },
	},
	{
		name      : 'export_transportation_truck_type',
		label     : 'Truck Type',
		type      : 'select',
		caret     : true,
		optionKey : 'truck_types',
		style     : { width: '350px' },
		condition : {
			export_transportation_cargo_handling_type : ['stuffing_at_dock'],
			services                                  : ['export_transportation'],
		},
		rules: { required: 'Required' },
	},
	{
		name      : 'export_transportation_trucks_count',
		label     : 'Trucks count',
		type      : 'number',
		style     : { width: '350px' },
		condition : {
			export_transportation_cargo_handling_type : ['stuffing_at_dock'],
			services                                  : ['export_transportation'],
		},
		rules: { required: 'Required', min: 0 },
	},
	{
		name    : 'import_transportation_cargo_handling_type',
		label   : 'Destination Cargo Handling',
		type    : 'chips',
		caret   : true,
		style   : { width: '350px' },
		options : [
			{
				children : 'Direct Port Delivery',
				key      : 'direct_port_delivery',
			},
			{
				children : 'Destuffing at Factory',
				key      : 'delivery_from_dock',
			},
			{
				children : 'Destuffing at CFS',
				key      : 'destuffing_at_dock',
			},
			{
				children : 'DPD Without CFS',
				key      : 'dpd_without_cfs',
			},
			{
				children : 'DPD CFS Dock Destuffing',
				key      : 'dpd_cfs_dock_destuffing',
			},
			{
				children : 'DPD CFS Factory Destuffing',
				key      : 'dpd_cfs_factory_destuffing',
			},
			{
				children : 'Enapanelled CFS Dock Destuffing',
				key      : 'enpanelled_cfs_dock_destuffing',
			},
			{
				children : 'Enapanelled CFS Factory Destuffing',
				key      : 'enpanelled_cfs_factory_destuffing',
			},
			{
				children : ' Non-Enapanelled CFS Factory Destuffing',
				key      : 'non_enpanelled_cfs_factory_destuffing',
			},
			{
				children : 'Non-Enapanelled CFS Dock Destuffing',
				key      : 'non_enpanelled_cfs_dock_destuffing',
			},
		],
		condition : { services: ['import_fcl_customs', 'import_transportation'] },
		rules     : { required: 'This is required' },
	},
	{
		label       : 'Pickup Pincode',
		name        : 'import_transportation_location_id',
		placeholder : 'Search via pincode',
		type        : 'async_select',
		caret       : true,
		asyncKey    : 'locations',
		grouped     : ['city'],
		params      : { filters: { type: ['pincode', 'city'] } },
		condition   : { services: ['import_transportation'] },
		rules       : { required: 'This is required' },
	},
	{
		label       : 'Address',
		name        : 'import_transportation_address',
		placeholder : 'Enter address',
		type        : 'text',
		condition   : { services: ['import_transportation'] },
	},
	{
		name      : 'import_transportation_truck_type',
		label     : 'Truck Type',
		type      : 'select',
		caret     : true,
		optionKey : 'truck_types',
		style     : { width: '350px' },
		condition : {
			import_transportation_cargo_handling_type : ['destuffing_at_dock'],
			services                                  : ['import_transportation'],
		},
		rules: { required: 'Required' },
	},
	{
		name      : 'import_transportation_trucks_count',
		label     : 'Trucks count',
		type      : 'number',
		style     : { width: '350px' },
		value     : 1,
		condition : {
			import_transportation_cargo_handling_type : ['destuffing_at_dock'],
			services                                  : ['import_transportation'],
		},
		rules: { required: 'Required', min: 0 },
	},
	{
		name    : 'export_fcl_cfs_have_ad_code',
		label   : 'Have AD Code?',
		type    : 'chips',
		style   : { width: '350px' },
		options : [
			{ children: 'Yes', key: 'yes' },
			{ children: 'No', key: 'no' },
		],
		condition : { services: ['export_fcl_cfs'] },
		rules     : { required: 'This is required' },
	},
	{
		name    : 'export_fcl_cfs_ad_code_reg',
		label   : 'Do you want AD Code Registration?',
		type    : 'chips',
		caret   : true,
		style   : { width: '350px' },
		options : [
			{ children: 'Yes', key: 'yes' },
			{ children: 'No', key: 'no' },
		],
		condition : { have_ad_code: 'no', services: ['export_fcl_cfs'] },
		rules     : { required: 'This is required' },
	},
	{
		name    : 'export_fcl_cfs_cargo_handling_type',
		label   : 'Origin CFS Cargo Stuffing',
		type    : 'chips',
		caret   : true,
		style   : { width: '350px' },
		options : [
			{
				key      : 'stuffing_at_factory',
				children : 'Factory Stuffing',
			},
			{
				key      : 'stuffing_at_dock',
				children : 'Dock Stuffing',
			},
		],
		condition : { services: ['export_fcl_cfs'] },
		rules     : { required: 'This is required' },
	},
	{
		name      : 'export_fcl_cfs_cargo_value_currency',
		label     : 'Cargo currency',
		optionKey : 'currencies',
		type      : 'select',
		// style     : { width: '350px' },
		condition : { services: ['export_fcl_cfs'] },
		rules     : { required: 'This is required' },
	},
	{
		name      : 'export_fcl_cfs_cargo_value',
		label     : 'Cargo value',
		type      : 'number',
		style     : { width: '350px' },
		condition : { services: ['export_fcl_cfs'] },
		rules     : { required: 'This is required' },
	},
	{
		name    : 'import_fcl_cfs_cargo_handling_type',
		label   : 'Select type of stuffing',
		type    : 'chips',
		style   : { width: '350px' },
		options : [
			{
				children : 'DPD without cfs',
				key      : 'dpd_without_cfs',
			},
			{
				children : 'DPD cfs dock destuffing',
				key      : 'dpd_cfs_dock_destuffing',
			},
			{
				children : 'DPD cfs factory destuffing',
				key      : 'dpd_cfs_factory_destuffing',
			},
			{
				children : 'Enpanelled cfs dock destuffing',
				key      : 'enpanelled_cfs_dock_destuffing',
			},
			{
				children : 'Enpanelled cfs factory destuffing',
				key      : 'enpanelled_cfs_factory_destuffing',
			},
			{
				children : 'Non-enpanelled cfs dock destuffing',
				key      : 'non_enpanelled_cfs_dock_destuffing',
			},
			{
				children : 'Non-enpanelled cfs factory destuffing',
				key      : 'non_enpanelled_cfs_factory_destuffing',
			},
		],
		condition : { services: ['import_fcl_cfs'] },
		rules     : { required: 'Type of stuffing at destinationn is required' },
	},
	{
		name      : 'import_fcl_cfs_cargo_value_currency',
		label     : 'Cargo currency',
		optionKey : 'currencies',
		type      : 'select',
		condition : { services: ['import_fcl_cfs'] },
		rules     : { required: 'This is required' },
	},
	{
		name      : 'import_fcl_cfs_cargo_value',
		label     : 'Cargo value',
		type      : 'number',
		condition : { services: ['import_fcl_cfs'] },
		rules     : { required: 'This is required' },
	},
	{
		name    : 'haulage_type',
		type    : 'radio',
		options : [
			{
				label: (
					<>
						<b>Merchant</b>
						<br />
						<i>1. Cargo handed over to carrier after reaching main port</i>
						<br />
						<i>2. Detention days counted till Cargo reaches main port</i>
					</>
				),
				value: 'merchant',
			},
			{
				label: (
					<>
						<b>Carrier</b>
						<br />
						<i>1. Cargo handed over to carrier at ICD port itself</i>
						<br />
						<i>
							2. Detention days count stops once cargo is handed over to Carrier
							for haulage
						</i>
					</>
				),
				value: 'carrier',
			},
		],
		condition: {
			services: ['export_haulage_freight', 'import_haulage_freight'],
		},
		rules: { required: 'Haulage Type is required' },
	},
];

export default controls;
