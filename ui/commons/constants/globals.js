import IMAGE_URLS from './imageUrl';

const GLOBAL_CONSTANTS = {
	country_entity_ids: {
		IN : '6fd98605-9d5d-479d-9fac-cf905d292b88',
		VN : 'b67d40b1-616c-4471-b77b-de52b4c9f2ff',
	},

	hs_code_country_ids: {
		IN: '5f1f94fa-25da-40de-968d-0254abd24ba6',
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

	country_code: {
		IN : 'IN',
		VN : 'VN',
		GB : 'GB',
	},

	cargo_insurance: {
		IN: ['fcl_freight', 'lcl_freight', 'air_freight'],
	},
	formats: {
		date: {
			'dd/MM/yyyy'  : 'dd/MM/yyyy',
			'dd MMM yyyy' : 'dd MMM yyyy',
			'dd-MM-yyyy'  : 'dd-MM-yyyy',
			'yyyy-MM-dd'  : 'yyyy-MM-dd',
			MMM           : 'MMM',
			'dd MMM'      : 'dd MMM',
		},
		time: {
			'hh:mm aaa' : 'hh:mm aaa',
			'HH:mm'     : 'HH:mm',
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

	image_url: IMAGE_URLS,

	onboarding_specialist: {
		name         : 'Kanira Patel',
		phone_number : '+918976851674',
		email_id     : 'kanira.patel@cogoport.com',
	},

	whatsapp_supported_country_locale: ['en-IN'],
};

export default GLOBAL_CONSTANTS;
