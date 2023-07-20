export default {
	registration_number: {
		label                       : 'Registration Number/Tax Number',
		pattern                     : '^.*$',
		max_length                  : 20,
		tax_number_document_url_key : 'tax_proof',
		tax_number_key              : 'tax',
	},

	banking_code: {
		financial_system_code: 'swift',
	},

	registration_document_proof: {
		label: 'VAT',
	},

	identification_number: {
		label: 'Registration Number',
	},

	address: {
		label: 'Registration Extract',
	},

	economic_zone: {
		label: 'Non-Tariff Zone',
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
				is_origin_country_vn      : false,
				is_destination_country_vn : false,
			},
		},
	},
};
