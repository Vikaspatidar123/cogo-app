export default {
	parent_entity_id : 'ef9a7145-b1b6-46ff-8de7-a348de635574',
	country          : {
		id   : '2693fa76-6539-410d-a0b0-551d9e620ba3',
		name : 'Indonesia',
		code : 'ID',
		flag_icon_url:
		'https://prod-cogoport.s3.ap-south-1.amazonaws.com/Indonesia_24.png',
		currency: {
			code   : 'IDR',
			symbol : 'Rp',
		},
		mobile_country_code : '+62',
		mobile_length       : 10,
	},
	formats: {
		amount: {
			scope: {
				admin: {
					locale: 'id-ID',
				},
			},
			options: {},
		},
		date: {
			default: 'dd/MM/yyyy',
		},
		time: {
			'12hrs' : 'hh:mm aaa',
			'24hrs' : 'HH:mm',
		},
	},
	regex: {
		TAX              : /^\d{13}$/,
		MOBILE_NUMBER    : /^[+][0-9]{1,3}[0-9]{10}$/,
		EMAIL            : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
		password_pattern : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/gm,
	},
	notification_polling_interval : 300000,
	lcw_timer                     : 10000,
	customer_support              : 'support.id@cogoport.com',
	default_agent                 : {
		name                  : 'Kanira Patel',
		email                 : 'support@cogoport.com',
		mobile_country_code   : '+91',
		mobile_number         : '8976851674',
		mobile_number_eformat : '918976851674',
	},
	uuid: {
		super_admin_id              : '5de782f6-f59d-41fc-84f4-8425dc1fa670',
		admin_id                    : 'ebafce31-75ef-4865-9060-775574e9606f',
		tech_super_admin_id         : '381b9d1d-e005-4cc0-9844-a5f1636e71b1',
		parent_entity_id            : 'b67d40b1-616c-4471-b77b-de52b4c9f2ff',
		cogo_demo_account_shipper   : '302bdc56-e807-4c71-a27c-92f83640f140',
		spot_booking_shipping_lines : [
			'c3649537-0c4b-4614-b313-98540cffcf40',
			'b2f92d49-6180-43bd-93a5-4d64f5819a9b',
			'fb1aa2f1-d136-4f26-ad8f-2e1545cc772a',
			'2d477bb2-8956-4dbe-bd8b-71144b60374c',
			'3c5d996c-4d4e-4a2b-bce7-1024b46f7300',
			'9ee49704-f5a7-4f17-9e25-c5c3b5ec3d1d',
			'be57f277-0c81-47b4-9322-bf06ccc5314c',
		],
		cogoxpress_id                  : '536abfe7-eab8-4a43-a4c3-6ff318ce01b5',
		cogo_demo_account_shipper_user : '7f6f97fd-c17b-4760-a09f-d70b6ad963e8',
		cogo_freight_supplier          : '5dc403b3-c1bd-4871-b8bd-35543aaadb36',
		prod_process_owner             : 'ae80297f-e30d-45fb-845c-61c302523476',
		kam_ids                        : [
			'9ead41d4-ced8-45c2-b370-4399cbfcf478', // Prod_KAM Location Sales
			'0bc8c199-09ed-4a85-b3a3-a855f05a2716', // Prod_KAM IE
			'f9905d33-24d7-48ca-99cd-eeca13a90d5a', // Prod_KAM IE Manager
			'0ad0034e-da18-49d2-b35c-36e08e8bcdcd', // Prod_KAM ES Manager
			'a35fbbbe-38ea-4ee8-82a8-06d1245a23a4', // Prod_KAM ES
			'4f7ba0b4-304b-4d5d-98e5-fb61a7c823da', // Prod_KAM CP Manager
			'e0e2f83b-9e5b-41a3-948e-ab1ec9b0f3ad', // Prod_KAM CP
			'eab24509-187e-42b4-ae51-b77c74d82ad9', // Overseas CP KAM
			'a5c83696-0248-4846-a558-1a054360f130', // Overseas CP KAM Manager
			'650e1fe4-2e34-43c1-abfe-ce0a443aa4a6', // Prod_KAM Trasnport Sales
			'f041b303-3239-42c5-a386-03e787900bcd', // Cogoverse KAM
			'6bd7a08c-974c-4dd0-b163-d4c31e794fba', // Vietnam KAM
		],
		cogo_freight_pvt_ltd_pr_supplier : '6cc6b696-60f6-480b-bcbe-92cc8e642531',
		business_manager_ids             : [
			'65ddf583-2786-4fd3-85b3-971094395e2b',
			'e31c6d7b-e62e-4fd5-a2e1-106e037ac03c',
		],
		tech_support_role_id  : '63208c69-06aa-4bd4-a598-bbf141d1b5ed',
		prod_so_2_manager     : 'eff02645-cb9c-44bf-8f5a-4d273b36e52d',
		so_2_manager_ams_desk : '5465b7eb-dd4d-4247-9a92-d3a3c5ed7de0',
		so_1_manager          : '17885538-e746-4650-a5bc-7d4d81247c7d',
		prod_kam_es_manager   : '0ad0034e-da18-49d2-b35c-36e08e8bcdcd',
		sales_role            : [
			'c71dd2db-9c8d-4d0c-84c6-beece1b3af42',
			'0bc8c199-09ed-4a85-b3a3-a855f05a2716',
			'e0e2f83b-9e5b-41a3-948e-ab1ec9b0f3ad',
			'9d1d10dd-06c0-489d-92f8-272c6a40e9bb',
			'46f33843-8f73-45c0-89c8-248aa1698bb0',
			'eab24509-187e-42b4-ae51-b77c74d82ad9',
		],
		ie_owner_sme_demand   : '594be53f-e39a-45d1-a705-57660a4a4a00',
		cp_kam_owner          : '37557738-13bb-4db8-96ef-6eac4549a5ac',
		service_ops1_role_ids : [
			'348bc262-64c3-4667-a23c-908ceca80233', // SO1 + Revenue Desk
			'5b5ee698-ec53-47fe-9584-737c9a174f8c', // Prod_SO1
			'f0af57b0-34eb-46e8-86a6-38abafcfc072', // SO1
			'12dd0f6f-7256-403f-bfd1-913bc466c775', // SO1
			'e18774d7-54b3-41e8-af04-3b44bd3a3fe2', // SO1 Executive
			'0285645b-0d06-42a2-9968-67d544626300', // Vietnam SO1 + S02
		],
		service_ops2_role_id: [
			'017856dc-b424-4145-9181-5680732cb33b',
			'8b04b2b9-baa1-4913-bf4c-b11effecef0b', // SO2 executive
			'281d52f4-096f-4c92-a629-57719c716ac6', // Cost booking desk executive
			'12dd0f6f-7256-403f-bfd1-913bc466c775', // LCL So2
			'0285645b-0d06-42a2-9968-67d544626300', // Vietnam SO1 + S02
		],
		service_ops3_role_ids: [
			'60869bd4-5f18-4400-a003-411eb49dcd4a', // Prod_COE_Finance_Executive
			'7000ed27-f649-4e00-9c20-8c20c9eccf78', // Prod_COE_Finance_Head
			'2644ceb0-ebd4-4c51-af71-45067f27d78b', // Finance Controller Head
			'ede05be5-8e8b-4f5a-8954-ae1b53c3cdc3', // Account Receivable Executive
			'726e644b-9dfa-4a6f-ac9c-f830d26e33e5', // Vietnam SO3
		],
		cogoverse_executive_id : 'f23810d3-c6c0-4937-bf2e-2ad301dd708d',
		cogoverse_kam_id       : 'f041b303-3239-42c5-a386-03e787900bcd',
		cogoverse_admin_id     : '84dcd923-89cb-4bc6-baf7-7f23d93d6951',
		hs_code_country_id     : '9df8dd81-b330-4e70-9ff2-ae850b2af2a4',
	},
	options: {
		registration_types: [
			{
				label : 'Private Limited Company',
				value : 'private_limited',
			},
			{
				label : 'Public Limited Company',
				value : 'public_limited',
			},
			{
				label : 'Partnership',
				value : 'partnership',
			},
			{
				label : 'Proprietorship',
				value : 'proprietorship',
			},
			{
				label : 'Limited Liability Partnership',
				value : 'limited_liability_partnership',
			},
		],
		country_truck_type : 'open_body_1_ton',
		open_truck         : [
			{
				label : '1 Ton',
				value : 'open_body_1_ton',
			},
			{
				label : '1.5 Ton',
				value : 'open_body_1.5_ton',
			},
			{
				label : '2 Ton',
				value : 'open_body_2_ton',
			},
			{
				label : '2.5 Ton',
				value : 'open_body_2.5_ton',
			},
			{
				label : '3.5 Ton',
				value : 'open_body_3.5_ton',
			},
			{
				label : '5 Ton',
				value : 'open_body_5_ton',
			},
			{
				label : '7 Ton',
				value : 'open_body_7_ton',
			},
			{
				label : '9 Ton',
				value : 'open_body_9_ton',
			},
			{
				label : '11 Ton',
				value : 'open_body_11_ton',
			},
			{
				label : '15 Ton',
				value : 'open_body_15_ton',
			},
			{
				label : '18 Ton',
				value : 'open_body_18_ton',
			},
		],
		closed_truck: [
			{
				label : '1 Ton',
				value : 'close_body_1_ton',
			},
			{
				label : '1.5 Ton',
				value : 'close_body_1.5_ton',
			},
			{
				label : '2 Ton',
				value : 'close_body_2_ton',
			},
			{
				label : '2.5 Ton',
				value : 'close_body_2.5_ton',
			},
			{
				label : '3.5 Ton',
				value : 'close_body_3.5_ton',
			},
			{
				label : '5 Ton',
				value : 'close_body_5_ton',
			},
			{
				label : '7 Ton',
				value : 'close_body_7_ton',
			},
			{
				label : '9 Ton',
				value : 'close_body_9_ton',
			},
			{
				label : '11 Ton',
				value : 'close_body_11_ton',
			},
			{
				label : '15 Ton',
				value : 'close_body_15_ton',
			},
			{
				label : '18 Ton',
				value : 'close_body_18_ton',
			},
		],
	},

	live_booking_indicative_price_constant: 25,

	others: {
		registration_number: {
			label      : 'NPWP',
			pattern    : /^\d{15,16}$/,
			max_length : 16,
		},

		identification: {
			label: 'NPWP',
		},

		identification_number: {
			label: {
				en : 'NPWP Number',
				vi : 'Số NPWP',
				id : 'NPWP Number',
				th : 'NPWP Number',
				zh : 'NPWP Number',
			},
		},

		address: {
			label: 'Registration Extract',
		},

		economic_zone: {
			label: {
				en : 'Non-Tariff Zone',
				vi : 'Khu Phi Thuế Quan',
				id : 'Non-Tariff Zone',
				th : 'Non-Tariff Zone',
				zh : 'Non-Tariff Zone',
			},
		},

		pan_number: {
			label   : 'PAN',
			pattern : '',
		},
		navigations: {
			common: {
				validate_registration_number : false,
				invoicing_party_validate_gst : false,
			},

			onboarding: {
				billing_address_details: {
					is_suggestion_container_visible: false,
				},
			},

			kyc: {
				is_pan_included: false,
			},

			search_form: {
				default_icoterm_cif                : false,
				filter_drop_haulage_option_carrier : false,
				is_export_tradeType                : false,
			},

			search_results: {
				enquiry_card: {
					show_enquiry: false,
				},
			},

			subscription: {
				is_tax_included: false,
			},

			profile_details: {
				show_whatsapp: false,
			},

			spot_search_air: {
				origin_input_trade_type               : null,
				origin_input_location_trade_type      : null,
				destination_input_trade_type          : null,
				destination_input_location_trade_type : null,
				is_origin_country_code                : false,
				is_destination_country_code           : false,
			},

			manage_rfq: {
				use_domestic_transport: false,
			},

			format_create_search: {
				fcl_customs: {
					is_origin_country_vn      : true,
					is_destination_country_vn : true,
				},
			},
		},
	},
};
