export default {
	others: {
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
				validate_registration_number: false,
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

			subscription: {
				is_tax_included: false,
			},
		},
	},
};
