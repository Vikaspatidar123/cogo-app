const getExtraControls = {
	air_booking_note: [
		{
			label       : 'Booking Number',
			name        : 'document_number',
			type        : 'text',
			span        : 6,
			validations : [
				{ type: 'required', message: 'Booking Note Number is required' },
			],
		},
	],
	igm_document: [
		{
			label       : 'IGM Number',
			name        : 'igm_number',
			type        : 'text',
			span        : 6,
			validations : [{ type: 'required', message: 'IGM Number is required' }],
		},
	],
	draft_bill_of_lading: [
		{
			label       : 'Bill of lading Number',
			name        : 'document_number',
			type        : 'text',
			span        : 6,
			validations : [{ type: 'required', message: 'BL Number is required' }],
		},
	],
	draft_house_bill_of_lading: [
		{
			label       : 'Bill of lading Number',
			name        : 'document_number',
			type        : 'text',
			span        : 6,
			validations : [{ type: 'required', message: 'BL Number is required' }],
		},
	],
	bill_of_lading: [
		{
			label       : 'Bill of lading Number',
			name        : 'document_number',
			type        : 'text',
			span        : 6,
			disabled    : true,
			validations : [{ type: 'required', message: 'BL Number  is required' }],
		},
		{
			label : '',
			name  : 'bl_detail_id',
			type  : 'text',
			show  : false,
		},
	],
	house_bill_of_lading: [
		{
			label       : 'Bill of lading Number',
			name        : 'document_number',
			type        : 'text',
			span        : 6,
			disabled    : true,
			validations : [{ type: 'required', message: 'BL Number  is required' }],
		},
		{
			label : '',
			name  : 'bl_detail_id',
			type  : 'text',
			show  : false,
		},
	],
	shipping_bill: [
		{
			label       : 'Shipping bill Number',
			name        : 'document_number',
			type        : 'text',
			span        : 6,
			validations : [
				{ type: 'required', message: 'Shipping bill Number  is required' },
			],
		},
		{
			name        : 'fob_currency',
			label       : 'FOB Currency',
			type        : 'select',
			optionKey   : 'currencies',
			value       : 'USD',
			span        : 6,
			validations : [{ type: 'required', message: 'FOB Currency is required' }],
		},
		{
			name          : 'shipment_fob_value',
			label         : 'FOB Amount',
			type          : 'number',
			span          : 6,
			isShowStepprr : false,
			validations   : [{ type: 'required', message: 'FOB Amount is required' }],
		},
	],
	delivery_order: [
		{
			label       : 'Delivery order number',
			name        : 'delivery_number',
			type        : 'text',
			span        : 6,
			validations : [
				{ type: 'required', message: 'Delivery Number  is required' },
			],
		},
		{
			label                 : 'Docment Issue Date',
			name                  : 'document_issue_date',
			type                  : 'datepicker',
			withTimePicker        : true,
			isPreviousDaysAllowed : true,
			span                  : 6,
			validations           : [{ type: 'required', message: 'Issue Date  is required' }],
		},
		{
			label          : 'Docment Expiry Date',
			name           : 'document_expiry_date',
			type           : 'datepicker',
			withTimePicker : true,
			span           : 6,
			validations    : [{ type: 'required', message: 'Expiry Date  is required' }],
		},
	],
	booking_note: [
		{
			label       : 'Booking Number',
			name        : 'document_number',
			type        : 'text',
			span        : 6,
			validations : [
				{ type: 'required', message: 'Booking Number  is required' },
			],
		},
		{
			label          : 'Yard Details',
			name           : 'yard_details',
			type           : 'async_select',
			asyncKey       : 'locations',
			params         : { filters: { type: ['yard'] } },
			caret          : true,
			popoverWidth   : '500px',
			defaultOptions : true,
			span           : 6,
			validations    : [{ type: 'required', message: 'Yard Details is required' }],
		},
		{
			label       : 'Container Quantity',
			name        : 'container_quantity',
			type        : 'number',
			span        : 6,
			validations : [
				{ type: 'required', message: 'Container Quantity is required' },
			],
		},
	],
	bill_of_entry: [
		{
			label       : 'Bill of entry Number',
			name        : 'document_number',
			type        : 'text',
			span        : 6,
			validations : [
				{ type: 'required', message: 'Bill of entry Number  is required' },
			],
		},
		{
			name        : 'fob_currency',
			label       : 'FOB Currency',
			type        : 'select',
			optionKey   : 'currencies',
			value       : 'USD',
			span        : 6,
			validations : [{ type: 'required', message: 'FOB Currency is required' }],
		},
		{
			name          : 'fob_value',
			label         : 'FOB Amount',
			type          : 'number',
			span          : 6,
			isShowStepprr : false,
			validations   : [{ type: 'required', message: 'FOB Amount is required' }],
		},
	],
	house_airway_bill: [
		{
			label       : 'Airway bill Number',
			name        : 'document_number',
			type        : 'text',
			span        : 6,
			disabled    : true,
			validations : [{ type: 'required', message: 'Airway bill  is required' }],
		},
	],
	airway_bill: [
		{
			label       : 'Airway bill Number',
			name        : 'document_number',
			type        : 'text',
			span        : 6,
			disabled    : true,
			validations : [{ type: 'required', message: 'Airway bill  is required' }],
		},
	],
	draft_house_airway_bill: [
		{
			label       : 'Draft Airway bill Number',
			name        : 'document_number',
			type        : 'text',
			span        : 6,
			validations : [
				{ type: 'required', message: 'Draft Airway bill  is required' },
			],
		},
	],
	draft_airway_bill: [
		{
			label       : 'Draft Airway bill Number',
			name        : 'document_number',
			type        : 'text',
			span        : 6,
			validations : [
				{ type: 'required', message: 'Draft Airway bill  is required' },
			],
		},
	],
	export_customs_entry: [
		{
			label       : 'Export customs entry number',
			name        : 'document_number',
			type        : 'text',
			span        : 6,
			validations : [
				{ type: 'required', message: 'Export customs entry  is required' },
			],
		},
	],
	import_customs_entry: [
		{
			label       : 'Import customs entry number',
			name        : 'document_number',
			type        : 'text',
			span        : 6,
			validations : [
				{ type: 'required', message: 'Import customs entry is required' },
			],
		},
	],
	invoice: [
		{
			name        : 'cargo_currency',
			label       : 'Cargo currency',
			optionKey   : 'currencies',
			type        : 'select',
			span        : 6,
			validations : [{ type: 'required', message: 'Currency is required' }],
		},
		{
			label       : 'Cargo Value',
			name        : 'cargo_value',
			type        : 'number',
			span        : 6,
			min         : 1,
			validations : [
				{ type: 'required', message: 'Cargo Value is required' },
				{
					type    : 'min',
					message : 'Container Quantity cannot be less than 1',
					min     : 1,
				},
			],
		},
	],
};

export const getControls = (data, type = null) => {
	const containers_count = [
		{
			label       : 'Container Quantity',
			name        : 'containers_count',
			type        : 'number',
			span        : 6,
			min         : 1,
			validations : [
				{ type: 'required', message: 'Container Quantity is required' },
				{
					type    : 'min',
					message : 'Container Quantity cannot be less than 1',
					min     : 1,
				},
			],
		},
	];

	const controls =		getExtraControls[type] || getExtraControls[data.document_type] || [];
	const bls = ['draft_bill_of_lading', 'draft_house_bill_of_lading'];
	if (
		data.shipment_type === 'fcl_freight'
		&& bls.includes(data.document_type)
	) {
		return [...controls, ...containers_count];
	}
	return controls;
};

export default getExtraControls;
