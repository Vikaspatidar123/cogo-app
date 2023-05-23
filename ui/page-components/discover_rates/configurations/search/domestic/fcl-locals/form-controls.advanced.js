const controls = () => [
	{
		label     : 'Number of Bill of Lading',
		name      : 'bls_count',
		type      : 'number',
		condition : { services: ['fcl_freight'] },
		rules     : { min: 1, max: 10000 },
		// style     : { width: '300px' },
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
		condition: { services: ['fcl_freight'] },
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
	},
	{
		label       : 'Pickup Pincode',
		name        : 'export_transportation_location_id',
		placeholder : 'Search via pincode',
		type        : 'async_select',
		caret       : true,
		asyncKey    : 'locations',
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
	},
	{
		name      : 'export_transportation_truck_type',
		label     : 'Truck Type',
		type      : 'select',
		caret     : true,
		optionkey  : 'truck_types',
		span      : 8,
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
		span      : 4,
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
		span    : 12,
		options : [
			{
				label : 'Direct Port Delivery',
				value : 'direct_port_delivery',
			},
			{
				label : 'Destuffing at Factory',
				value : 'delivery_from_dock',
			},
			{
				label : 'Destuffing at CFS',
				value : 'destuffing_at_dock',
			},
			{
				label : 'DPD Without CFS',
				value : 'dpd_without_cfs',
			},
			{
				label : 'DPD CFS Dock Destuffing',
				value : 'dpd_cfs_dock_destuffing',
			},
			{
				label : 'DPD CFS Factory Destuffing',
				value : 'dpd_cfs_factory_destuffing',
			},
			{
				label : 'Enapanelled CFS Dock Destuffing',
				value : 'enpanelled_cfs_dock_destuffing',
			},
			{
				label : 'Enapanelled CFS Factory Destuffing',
				value : 'enpanelled_cfs_factory_destuffing',
			},
			{
				label : ' Non-Enapanelled CFS Factory Destuffing',
				value : 'non_enpanelled_cfs_factory_destuffing',
			},
			{
				label : 'Non-Enapanelled CFS Dock Destuffing',
				value : 'non_enpanelled_cfs_dock_destuffing',
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
		// style       : { width: '300px' },
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
		span        : 12,
		condition   : { services: ['import_transportation'] },
	},
	{
		name      : 'import_transportation_truck_type',
		label     : 'Truck Type',
		type      : 'select',
		caret     : true,
		optionkey  : 'truck_types',
		span      : 8,
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
		span      : 4,
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
		span    : 6,
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
		span    : 6,
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
		span    : 12,
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
		optionkey : 'currencies',
		type      : 'select',
		// style     : { width: '200px' },
		condition : { services: ['export_fcl_cfs'] },
		rules     : { required: 'This is required' },
	},
	{
		name      : 'export_fcl_cfs_cargo_value',
		label     : 'Cargo value',
		type      : 'number',
		span      : 8,
		condition : { services: ['export_fcl_cfs'] },
		rules     : { required: 'This is required' },
	},
	{
		name    : 'import_fcl_cfs_cargo_handling_type',
		label   : 'Select type of stuffing',
		type    : 'chips',
		span    : 12,
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
		optionkey : 'currencies',
		type      : 'select',
		// style     : { width: '200px' },
		condition : { services: ['import_fcl_cfs'] },
		rules     : { required: 'This is required' },
	},
	{
		name      : 'import_fcl_cfs_cargo_value',
		label     : 'Cargo value',
		type      : 'number',
		span      : 8,
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
