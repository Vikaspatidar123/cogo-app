const GLOBAL_CONSTANTS = {
	country_entity_ids: {
		IN: '6fd98605-9d5d-479d-9fac-cf905d292b88',
	},
	country_ids: {
		IN : '541d1232-58ce-4d64-83d6-556a42209eb7',
		VN : '177fcbad-8ef7-4324-871c-6c31745f4411',
		GB : '222d4b9d-56a8-4580-b761-a71c653263fb',
	},
	COUNTRY_IDS: {
		IN: '541d1232-58ce-4d64-83d6-556a42209eb7',
	},
	currency_code: {
		INR : 'INR',
		USD : 'USD',
		EUR : 'EUR',
		GBP : 'GBP',
		AED : 'AED',
	},
	currency_locale: {
		INR : 'en-IN',
		USD : 'en-US',
		VND : 'vi-VN',
	},
	cargo_insurance: {
		IN: ['fcl_freight'],
	},
	formats: {
		date: {
			'dd/MM/yyyy'  : 'dd/MM/yyyy',
			'dd MMM yyyy' : 'dd MMM yyyy',
			MMM           : 'MMM',
		},
		time: {
			'hh:mm aaa' : 'hh:mm aaa',
			'HH:mm'     : 'HH:mm',
		},
		date_time: {
			'dd MMM yyyy hh:mm aa': 'dd MMM yyyy hh:mm aa',
		},
	},

	container_type_size: {
		ft20: {
			standard : '20ft Standard',
			refer    : '20ft Reefer',
		},
		ft40: {
			standard : '40ft Standard',
			refer    : '40ft Reefer',
		},
		hc40: {
			standard: '40HC Standard',
		},
		hc45: {
			standard: '45HC Standard',
		},
	},
	units: {
		weight: {
			single   : 'kg',
			multiple : 'kgs',
			inMt     : 'MT',
		},
		volume: {
			gross : 'cc',
			total : 'cbm',
		},
		length: {
			m  : 'm',
			ft : 'FT',
		},
	},
	country_specific_data: {
		IN: {
			registration_number: {
				label: 'GST',
				pattern:
					/\d{2}[A-Za-z]{5}\d{4}[A-Za-z]{1}[A-Za-z\d]{1}[Zz]{1}[A-Za-z\d]{1}/g,
				max_length: 15,
			},
			economic_zone: {
				label: 'SEZ',
			},
		},
		VN: {
			registration_number: {
				label      : 'VAT',
				pattern    : /^[0-9]{1}[0-9]{9}$|^[0-3]{1}[0-9]{9}-?[0-9]{3}$/,
				max_length : 15,
			},
			economic_zone: {
				label: 'Non-Tariff Zone',
			},
		},
	},
	cogoport_gst_numbers: {
		GURUGRAM : '06AAICC8838P1ZV',
		MUMBAI   : '27AAICC8838P1ZR',
	},

	servicable_country_list: [
		'IN',
		'NL',
		'UK',
		'US',
		'CZ',
		'MK',
		'FR',
		'JP',
		'KR',
		'TH',
		'IE',
		'IS',
		'BY',
		'NI',
		'AT',
		'CH',
		'HU',
		'SE',
		'US',
		'CN',
		'ID',
		'RU',
		'DK',
		'FO',
		'FI',
		'BE',
		'MD',
		'LT',
		'AM',
		'LV',
		'PT',
		'NO',
		'SK',
		'RS',
		'DE',
		'EE',
		'AD',
		'LI',
		'PL',
		'MC',
		'GB',
		'LU',
		'VN',
	],
};

export default GLOBAL_CONSTANTS;
