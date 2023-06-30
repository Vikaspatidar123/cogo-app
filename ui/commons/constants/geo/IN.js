export default {
	parent_entity_id : '6fd98605-9d5d-479d-9fac-cf905d292b88',
	country          : {
		id   : '541d1232-58ce-4d64-83d6-556a42209eb7',
		name : 'India',
		code : 'IN',
		flag_icon_url:
      'https://prod-cogoport.s3.ap-south-1.amazonaws.com/India_24.png',
		currency: {
			code   : 'INR',
			symbol : '₹',
		},
		mobile_country_code : '+91',
		mobile_length       : 10,
	},
	formats: {
		amount: {
			scope: {
				admin: {
					locale: 'en-US',
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
		PAN           : /^([A-Z]{3}[PCHFATBLJG]{1}[A-Z]{1}[0-9]{4}[A-Z]{1})+$/g,
		// eslint-disable-next-line max-len
		GST           : /^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([A-Z]{3}[PCHFATBLJG]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1})+$/g,
		MOBILE_NUMBER : /^[+][0-9]{1,3}[0-9]{10}$/,
		EMAIL         : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
		password_pattern:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/gm,
	},
	notification_polling_interval : 300000,
	lcw_timer                     : 10000,
	customer_support              : 'support@cogoport.com',
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
		parent_entity_id            : '6fd98605-9d5d-479d-9fac-cf905d292b88',
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
		cogoxpress_id             : '536abfe7-eab8-4a43-a4c3-6ff318ce01b5',
		any_carrier_airline_id    : '30798ff1-992c-48f0-aabd-eb92e98df747',
		customer_service_role_ids : ['0461c31b-4761-40b6-ac2a-59a4e9d4e23f'],
		sales_role_ids            : [
			'fdf55227-a433-4450-aab0-5e4c215ea72c',
			'95113dbb-43bf-4434-958c-3fe8063657e7',
			'0461c31b-4761-40b6-ac2a-59a4e9d4e23f',
		],
		cogo_demo_account_shipper_user: '7f6f97fd-c17b-4760-a09f-d70b6ad963e8',
		cogo_demo_account_shipper_user_branch:
      '2c72817c-c663-48ea-b8ef-cd92397842a1',
		business_owner_ids : ['0f9ddc9b-e2d7-4fee-83f6-08fb8bed6d11'],
		supply_role_ids    : [
			'eb292d80-a05f-4a56-a0f7-ef51255583aa',
			'e31c6d7b-e62e-4fd5-a2e1-106e037ac03c',
			'70710ab2-0f80-4e12-a4f5-d75660c05315',
			'a1ddec39-48a5-4ab5-8db4-16fa02cdf720',
			'b0ccb9d9-84a7-47b3-97ea-136424129ab7',
			'b6612571-bb02-4e5c-b6d4-131259667f29',
			'd9c490f9-afcc-467e-a86d-2a02edf81959',
			'568c5939-3721-4444-a0ff-4c0298bc948d',
			'e0aa356c-2e4c-4cfd-b279-a6d3cdfa4edb', // Vietnam Supply
		],
		cogo_freight_supplier      : '5dc403b3-c1bd-4871-b8bd-35543aaadb36',
		prod_process_owner         : 'ae80297f-e30d-45fb-845c-61c302523476',
		corporate_owner_id         : '89184155-1f77-4265-826a-e997d140002f',
		corporate_owner_finance_id : '5063d25a-7312-4eb6-93fd-41020ba62e17',
		operation_manager          : 'ed3e6418-6013-4710-83cf-5b0b117aa8a1',
		kam_ids                    : [
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
		],
		cogo_freight_pvt_ltd_pr_supplier : '6cc6b696-60f6-480b-bcbe-92cc8e642531',
		shipping_line_supply_agents      : [
			'1e3ee025-88a2-43ea-abd5-08017f61f2d2',
			'4248e4d4-59cf-441e-a4a8-83bb29c86bcf',
			'c1d73577-f0c0-463e-ba26-6ea5b01e5f21',
			'b69344b8-f00c-4870-be0f-3233413edccf',
			'0a8c5535-8248-4866-af98-349529d89f56',
			'0f8e19a7-bb90-4a93-bdf7-2bf7e5cf1be3',
			'6094379f-ae1e-414e-8c76-9ebd58668d39',
			'3071219c-357d-4f5b-9d0b-8e537b180cfc',
			'57a11fa0-d7be-4181-b81a-374c9b78ac85',
			'881ec1af-7e7a-445c-bc8c-8c70b5832ce4',
			'2ea5fcf6-e853-4eb5-8362-a57b4b6730c5',
			'b8c242ac-b6a8-4da0-939b-c0f8def6ef05',
			'8a22e7ac-e04b-4b64-88a2-14e03fc90b40',
			'0046214c-2f43-4317-9224-45ca47c8c97f',
			'737bdd26-5c1c-4d31-8e84-20c3a1103e40',
			'489dfbeb-a0d6-4abc-89e4-45c6c6c24c91',
			'f7acc099-506e-47e0-9d10-450e88df3635',
			'b6b21d0f-6675-4877-9ac3-991374390500',
			'b856f919-e8a8-41a0-88c2-d88395e43b68',
			'd2bb9fc6-7cef-41c5-b53f-82525a847797',
		],
		coe_finance_head             : '7000ed27-f649-4e00-9c20-8c20c9eccf78',
		account_receivable_executive : 'ede05be5-8e8b-4f5a-8954-ae1b53c3cdc3',
		prod_settlement_executive    : 'b11f5c3e-4608-4f1d-b2dd-a59b92da1e2a',
		credit_controller_id         : 'b2af88f9-84e4-44fd-92f8-12f74c55e5ae',
		business_manager_ids         : [
			'65ddf583-2786-4fd3-85b3-971094395e2b',
			'e31c6d7b-e62e-4fd5-a2e1-106e037ac03c',
		],
		prod_coe_finance_head            : '7b1fc916-6984-4179-aee5-c23f9871085d',
		service_operation_role_ids       : ['f23a6a68-394b-4f92-a0d2-22e009b05f26'],
		procurement_and_fullfillment_ids : ['b0ccb9d9-84a7-47b3-97ea-136424129ab7'],
		logistics_agent_ids              : ['b6612571-bb02-4e5c-b6d4-131259667f29'],
		finance_head_id                  : 'a8a175c5-fec2-4c08-8e6b-0fb5c7951c86',
		corporate_owner                  : '5063d25a-7312-4eb6-93fd-41020ba62e17',
		okam_role_ids                    : [
			'45662f18-8090-450a-9e0d-5805788af4fb',
			'b5dd96b2-11a2-4655-8319-040614262f3d',
			'844a859d-bca4-40a0-a534-53f5405fa754',
		],
		tech_support_role_id                : '63208c69-06aa-4bd4-a598-bbf141d1b5ed',
		temp_coe_id                         : '5ea6b9fa-25e1-4328-ac20-74e01aab1902',
		trade_expert_team_lead_long_tail_id : 'ad12ce9e-2cc9-4a14-8e36-d3ee2df0cf63',
		credit_controller_role_id           : '8ab56d1b-b6c1-41e3-9c83-63278380aec7',
		generic_kam_role_id                 : 'e9fca698-1b66-4ea7-b03c-1e47706c7249',
		prod_so_2_manager                   : 'eff02645-cb9c-44bf-8f5a-4d273b36e52d',
		so_2_manager_ams_desk               : '5465b7eb-dd4d-4247-9a92-d3a3c5ed7de0',
		so_1_manager                        : '17885538-e746-4650-a5bc-7d4d81247c7d',
		prod_kam_es_manager                 : '0ad0034e-da18-49d2-b35c-36e08e8bcdcd',
		credit_controller_ids               : [
			'8d8a9009-9a1e-40e6-b6c0-2bb40aba0918',
			'59559d86-853d-41b5-a613-a1fd7b3eb76e',
			'2acd7cb8-a986-45f3-8e14-391075d50daf',
			'b2af88f9-84e4-44fd-92f8-12f74c55e5ae',
		],
		mail_template_id_wis       : '2297299e-f846-4913-96c9-91956a3bd2ed',
		mail_template_id_soa       : '25486363-15fe-4be7-b0bc-44d1b7cea90b',
		prod_kam_cp                : 'e0e2f83b-9e5b-41a3-948e-ab1ec9b0f3ad',
		prod_es_sales              : 'c71dd2db-9c8d-4d0c-84c6-beece1b3af42',
		portfolio_manager_id       : '46f33843-8f73-45c0-89c8-248aa1698bb0',
		entity_manager_id          : '9d1d10dd-06c0-489d-92f8-272c6a40e9bb',
		prod_kam_ie                : '0bc8c199-09ed-4a85-b3a3-a855f05a2716',
		prod_kam_ie_manager        : 'f9905d33-24d7-48ca-99cd-eeca13a90d5a',
		pre_sales_agent            : 'ad12ce9e-2cc9-4a14-8e36-d3ee2df0cf63',
		credit_controller_user_ids : [
			'ad5dd683-77d6-4443-a628-86e5fbac4e03',
			'd15a6237-7332-4627-a18f-28db6fcbecc7',
			'59559d86-853d-41b5-a613-a1fd7b3eb76e',
			'2acd7cb8-a986-45f3-8e14-391075d50daf',
			'8d8a9009-9a1e-40e6-b6c0-2bb40aba0918',
			'91fc265d-b043-48a0-874e-268181dd0206',
		],
		sales_role: [
			'c71dd2db-9c8d-4d0c-84c6-beece1b3af42',
			'0bc8c199-09ed-4a85-b3a3-a855f05a2716',
			'e0e2f83b-9e5b-41a3-948e-ab1ec9b0f3ad',
			'9d1d10dd-06c0-489d-92f8-272c6a40e9bb',
			'46f33843-8f73-45c0-89c8-248aa1698bb0',
			'eab24509-187e-42b4-ae51-b77c74d82ad9',
		],
		finops_manager       : 'bdd39a3c-6f01-4228-905f-7d61acc66860',
		freight_force_org_id : '36cee6fb-eeaf-4643-9db5-397544339635',
		ie_owner_sme_demand  : '594be53f-e39a-45d1-a705-57660a4a4a00',
		cp_kam_owner         : '37557738-13bb-4db8-96ef-6eac4549a5ac',
		business_heads       : [
			'7c6c1fe7-4a4d-4f3a-b432-b05ffdec3b44', // Hrishikesh Kulkarni
			'95d62549-8ab6-4ee5-a655-9edd0ec46dac', // Purnendu Shekhar
			'cd8dde11-678c-4467-85b2-2e2d6055bef4', // Amitabh Shankar
		],
		vietnam_business_heads: [
			'7f6f97fd-c17b-4760-a09f-d70b6ad963e8', // Rishi Agarwal
		],
		service_ops1_role_ids: [
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
		cogo_fx_settings_allowed_role_ids: [
			'a5c83696-0248-4846-a558-1a054360f130', // Overseas CP KAM Manager
			'b665819a-745f-443c-a5e3-55e3f7ffcc60', // Oveseas CP Owner
			'8e0c7f28-f77c-44ae-9fef-901ca85fada5', // Portfolio Team Lead
			'37557738-13bb-4db8-96ef-6eac4549a5ac', // CP KAM Owner
			'4f7ba0b4-304b-4d5d-98e5-fb61a7c823da', // CP KAM Manager
		],
		email_mobile_verification_allowed_ids: [
			'961cc7d4-53f0-4319-96e9-2a90217bdc4e',
			'7f6f97fd-c17b-4760-a09f-d70b6ad963e8',
			'8c22817f-4246-43ef-a7f5-fdf77e37ca72',
		],
		export_supply_relation_manager  : '1e3ee025-88a2-43ea-abd5-08017f61f2d2',
		import_supply_relation_manager  : '4012accb-d515-46e1-957e-ddfd7a921522',
		extra_supply_roles_for_shipment : [
			'a7c15a6b-8b07-4d48-b421-2f1e317ae00d',
			'8ecf37e5-4605-4c4c-9f8f-771831013177',
		],
		cogoverse_executive_id    : 'f23810d3-c6c0-4937-bf2e-2ad301dd708d',
		cogoverse_kam_id          : 'f041b303-3239-42c5-a386-03e787900bcd',
		cogoverse_admin_id        : '84dcd923-89cb-4bc6-baf7-7f23d93d6951',
		financial_service_manager : [
			'a9433b9b-3f3a-4799-a605-27cae90d540c',
			'26385f72-3836-41fd-85e4-b0afc6f31ab4',
		],
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
		country_truck_type : 'open_body_pickup_1ton',
		open_truck         : [
			{
				label : 'PICKUP 1TON',
				value : 'open_body_pickup_1ton',
			},
			{
				label : 'TATA ACE 750 800KGS',
				value : 'open_body_tata_ace_750_800kgs',
			},
			{
				label : 'TATA 407 2.5TON',
				value : 'open_body_tata_407_2.5ton',
			},
			{
				label : 'LCV 14FT 4TON',
				value : 'open_body_LCV_14ft_4ton',
			},
			{
				label : 'LCV 17FT 5TON',
				value : 'open_body_LCV_17ft_5ton',
			},
			{
				label : 'LCV 19FT 7TON',
				value : 'open_body_LCV_19ft_7ton',
			},
			{
				label : '6TYRE 19 24FT 9TON',
				value : 'open_body_6tyre_19_24ft_9ton',
			},
			{
				label : '10TYRE TAURUS 22FT 16TON',
				value : 'open_body_10tyre_taurus_22ft_16ton',
			},
			{
				label : '12TYRE TAURUS 22FT 22TON',
				value : 'open_body_12tyre_taurus_22ft_22ton',
			},
			{
				label : '12TYRE TAURUS 24FT 25TON',
				value : 'open_body_12tyre_taurus_24ft_25ton',
			},
			{
				label : '14TYRE TAURUS 22FT 26TON',
				value : 'open_body_14tyre_taurus_22ft_26ton',
			},
			{
				label : '14TYRE TAURUS 25FT 26TON',
				value : 'open_body_14tyre_taurus_25ft_26ton',
			},
			{
				label : '14TYRE 30TON',
				value : 'open_body_14tyre_30ton',
			},
			{
				label : '18TYRE 28TON',
				value : 'open_body_18tyre_28ton',
			},
			{
				label : '22TYRE 35TON',
				value : 'open_body_22tyre_35ton',
			},
			{
				label : '40FT FLAT BED TRAILOR 20 25TON',
				value : 'open_40ft_flat_bed_trailor_20_25ton',
			},
			{
				label : '40FT SEMI LOW BED TRAILOR 20 25TON',
				value : 'open_40ft_semi_low_bed_trailor_20_25ton',
			},
			{
				label : '40FT LOW BED TRAILOR 20 25 30TON',
				value : 'open_40ft_low_bed_trailor_20_25_30ton',
			},
		],
		closed_truck: [
			{
				label : 'LCV 14FT 3.5TON',
				value : 'closed_body_LCV_14ft_3.5ton',
			},
			{
				label : 'LCV 17FT 5TON',
				value : 'closed_body_LCV_17ft_5ton',
			},
			{
				label : 'LCV 19FT 7TON',
				value : 'closed_body_LCV_19ft_7ton',
			},
			{
				label : '32FT SINGLE AXLE 7TON',
				value : 'closed_body_32ft_single_axle_7ton',
			},
			{
				label : '32FT SINGLE AXLE HQ 7TON',
				value : 'closed_body_32ft_single_axle_HQ_7ton',
			},
			{
				label : '19 22FT SINGLE AXLE 7TON',
				value : 'closed_body_19_22ft_single_axle_7ton',
			},
			{
				label : '24FT SINGLE AXLE 7TON',
				value : 'closed_body_24ft_single_axle_7ton',
			},
			{
				label : '24FT MULTI AXLE 14 15 TON',
				value : 'closed_body_24ft_multi_axle_14_15_ton',
			},
			{
				label : '32FT MULTI AXLE HQ 14 15 TON',
				value : 'closed_body_32ft_multi_axle_HQ_14_15_ton',
			},
			{
				label : '32FT MULTI AXLE 14 15 TON',
				value : 'closed_body_32ft_multi_axle_14_15_ton',
			},
			{
				label : '32FT TRIPLE AXLE 20 21 TON',
				value : 'closed_body_32ft_triple_axle_20_21_ton',
			},
			{
				label : '32FT TRIPLE AXLE HQ 20 21 TON',
				value : 'closed_body_32ft_triple_axle_HQ_20_21_ton',
			},
		],
	},

	live_booking_indicative_price_constant: 25,

	others: {
		registration_number: {
			label: 'GST',
			pattern:
				/\d{2}[A-Za-z]{5}\d{4}[A-Za-z]{1}[A-Za-z\d]{1}[Zz]{1}[A-Za-z\d]{1}/g,
			max_length: 15,
		},
		identification_number: {
			label: 'PAN Number',
		},
		address: {
			label: 'Address Proof',
		},
		economic_zone: {
			label: 'SEZ',
		},

		pan_number: {
			label   : 'PAN',
			pattern : /[A-Za-z]{5}\d{4}[A-Za-z]{1}/g,
		},
		navigations: {
			common: {
				validate_registration_number: true,
			},

			onboarding: {
				billing_address_details: {
					is_suggestion_container_visible: true,
				},
			},

			kyc: {
				is_pan_included: true,
			},

			search_form: {
				default_icoterm_cif                : true,
				filter_drop_haulage_option_carrier : true,
				is_export_tradeType                : true,
			},

			subscription: {
				is_tax_included: true,
			},
		},
	},
};
