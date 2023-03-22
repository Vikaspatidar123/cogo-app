import globalConstants from '@cogo/commons/constants/global';
import organizationServices from '../configurations/common/organization-services.json';

const reallocateControl = (isReallocates) =>
	isReallocates
		? [
				{
					name: 'agent_cancellation_reason',
					label: 'Please write why you can not allocate service',
					type: 'text',
					span: 12,
					placeholder: 'Type here...',
					validations: [{ type: 'required', message: 'Reason is required' }],
				},
		  ]
		: [];
const extraControls = (shipment_data, isDisabled) => {
	const isReallocate =
		shipment_data.state === 'cancelled' &&
		!shipment_data?.agent_cancellation_reason;

	const controls = {
		fcl_freight_service: [
			{
				name: 'shipping_line_id',
				label: 'Shipping line',
				type: 'select-2',
				optionsListKey: 'shipping-lines',
				defaultOptions: true,
				multiple: false,
				caret: true,
				value:
					shipment_data?.booking_params?.shipping_line_id ||
					shipment_data.shipping_line_id,
				disabled:
					isDisabled ||
					isReallocate ||
					(shipment_data?.booking_params?.shipping_line_id &&
						shipment_data?.booking_params?.shipping_line_id !==
							shipment_data?.shipping_line_id &&
						shipment_data?.can_change_booking_params_status === 'accepted'),
			},
			{
				label: 'Rate Reference Number',
				name: 'rate_reference_number',
				type: 'text',
				span: 4,
			},
			{
				name: 'booking_rate_procurement_proof',
				label: 'Booking rate procurement proof',
				type: 'file',
				themeType: 'secondary',
				drag: true,
				onlyURLOnChange: true,
				uploadIcon: 'ic-upload',
				accept:
					'image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
				uploadType: 'aws',
			},
		],
		air_freight_service: [
			{
				name: 'airline_id',
				label: 'Air Line',
				type: 'select-2',
				optionsListKey: 'air-lines',
				defaultOptions: true,
				multiple: false,
				caret: true,
				value:
					shipment_data?.booking_params?.airline_id || shipment_data.airline_id,
				disabled:
					isDisabled ||
					isReallocate ||
					(shipment_data?.booking_params?.airline_id &&
						shipment_data?.booking_params?.airline_id !==
							shipment_data?.airline_id &&
						shipment_data?.can_change_booking_params_status === 'accepted'),
			},
			{
				label: 'Rate Reference Number',
				name: 'rate_reference_number',
				type: 'text',
				span: 12,
			},
			{
				name: 'booking_rate_procurement_proof',
				label: 'Booking rate procurement proof',
				type: 'file',
				themeType: 'secondary',
				drag: true,
				onlyURLOnChange: true,
				uploadIcon: 'ic-upload',
				accept:
					'image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
				uploadType: 'aws',
			},
		],
		lcl_freight_service: [
			{
				label: 'Rate Reference Number',
				name: 'rate_reference_number',
				type: 'text',
				span: 12,
			},
			{
				name: 'booking_rate_procurement_proof',
				label: 'Booking rate procurement proof',
				type: 'file',
				themeType: 'secondary',
				drag: true,
				onlyURLOnChange: true,
				uploadIcon: 'ic-upload',
				accept:
					'image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
				uploadType: 'aws',
			},
		],
		haulage_freight_service: [
			{
				label: 'Haulage Type',
				name: 'haulage_type',
				type: 'pills',
				options: [
					{ label: 'Carrier', value: 'carrier' },
					{ label: 'Merchant', value: 'merchant' },
				],
				value: shipment_data?.haulage_type,
			},
			{
				name: 'shipping_line_id',
				label: 'Shipping line',
				type: 'select-2',
				optionsListKey: 'shipping-lines',
				defaultOptions: true,
				multiple: false,
				caret: true,
				value: shipment_data.shipping_line_id,
				show: (fields) => fields?.haulage_type?.value === 'carrier',
			},
		],
	};
	// if (shipment_data?.can_change_booking_params_status === 'accepted' || shipment_data?.state !== 'init') {
	// } return [];
	let service = shipment_data?.service_type;
	if (
		shipment_data?.service_type === 'haulage_freight_service' &&
		shipment_data?.display_service_type === 'trailer_freight_service'
	) {
		service = '';
	}

	return service ? controls[service] : [];
};
const controls = (
	shipment_data,
	service_charges,
	isAllocatable = true,
	isReallocates = false,
) => {
	const statuses = service_charges.map(
		(charge) => charge?.margin_approval_status,
	);
	const isDisabled =
		shipment_data?.state === 'init' && statuses.includes('approved');
	const exculdeIds = [
		globalConstants.COGO_FREIGHT_SUPPLIER,
		globalConstants.COGO_FREIGHT_PVT_LTD_PR_SUPPLIER,
	];

	let service_provider_id = shipment_data?.booking_params?.service_provider_id;
	if (!service_provider_id) {
		service_provider_id = exculdeIds.includes(
			shipment_data?.service_provider_id,
		)
			? ''
			: shipment_data?.service_provider_id;
	}

	return [
		{
			name: 'service_provider_id',
			type: 'select-2',
			label: 'Service Provider',
			optionsListKey: 'verified-service-providers',
			placeholder: 'Select Service Provider',
			defaultOptions: true,
			multiple: false,
			showForScope: ['partner'],
			isClearable: true,
			caret: true,
			disabled: isDisabled || !isAllocatable,
			validations:
				isDisabled || !isAllocatable
					? null
					: [{ type: 'required', message: 'Service Provider is required' }],
			value: service_provider_id,
			params: {
				filters: {
					booking_services: organizationServices[shipment_data.service_type],
					exclude_ids: exculdeIds,
				},
			},
		},
		...(extraControls(shipment_data, isDisabled) || []),
		...reallocateControl(isReallocates),
	];
};

export default controls;
