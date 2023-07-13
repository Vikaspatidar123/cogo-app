const GLOBAL_CONSTANTS = {
	country_entity_ids: {
		IN: '6fd98605-9d5d-479d-9fac-cf905d292b88',
	},
	country_ids: {
		IN : '541d1232-58ce-4d64-83d6-556a42209eb7',
		VN : '177fcbad-8ef7-4324-871c-6c31745f4411',
		GB : '222d4b9d-56a8-4580-b761-a71c653263fb',
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
	cargo_insurance: {
		IN: ['fcl_freight', 'lcl_freight', 'air_freight'],
	},
	formats: {
		date: {
			'dd/MM/yyyy'        : 'dd/MM/yyyy',
			'dd MMM yyyy'       : 'dd MMM yyyy',
			'dd-MM-yyyy'        : 'dd-MM-yyyy',
			'yyyy-MM-dd'        : 'yyyy-MM-dd',
			'MMM dd, yy'        : 'MMM dd, yy',
			MMM                 : 'MMM',
			'dd MMM'            : 'dd MMM',
			'MMM, yyyy'         : 'MMM, yyyy',
			'MMM dd, yyyy'      : 'MMM dd, yyyy',
			PP                  : 'PP',
			'PP hh:mm a'        : 'PP hh:mm a',
			'MM-yyyy'           : 'MM-yyyy',
			'd MMM yyyy, eeee'  : 'd MMM yyyy, eeee',
			'MM-dd-yyyy'        : 'MM-dd-yyyy',
			'EEE-dd'            : 'EEE-dd',
			yyyy                : 'yyyy',
			'dd/MMM/yyyy'       : 'dd/MMM/yyyy',
			'eee, dd MMM, yyyy' : " 'eee, dd MMM, yyyy'",
			EEEE                : 'eeee',
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
	image_url: {
		cogoport_logo:
			'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/cogoport.svg',
		iec_red_flag:
			'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/redFlag.svg',
		iec_green_flag:
			'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/greenflag.svg',
		iec_yellow_flag:
			'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/yellwflag.svg',
		coin_bag_image:
			'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/CogoBag.png',
		cart_image:
			'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/Cart-Outline (1).png',
		succes_image:
			'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/exclamation.svg',
		empty_image:
			'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/undraw_empty_cart_co35.svg',
		category_image:
			'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/cogo_logo_white_bg.svg',
		empty_category_image:
			'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/no category',
		empty_details_image:
			'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/shipmentEmptyState.png',
		send_gift_image:
			'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/send.gif',
		banner_image:
			'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/Banner 1.png',
		signatory_image:
			'https://cdn.cogoport.io/cms-prod/cogo_partner/vault/original/Vector.png',
		edit_image:
			'https://cdn.cogoport.io/cms-prod/cogo_partner/vault/original/animation_500_lhvo6uhx1.png',
		yellow_vessel      : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/shipYellow.png',
		red_vessel         : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/shipRed.png',
		black_vessel       : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/shipArrow.png',
		loading            : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading.svg',
		loading_banner     : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading-banner.svg',
		air_empty_state    : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/air-connect.svg',
		ocean_empty_state  : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/ship-cargo.jpg',
		origin_map_pointer : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/map_origin.svg',
		destination_map_pointer:
			'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/map_destination.svg',
		map_loading           : 'https://cogoport-maps.s3.ap-south-1.amazonaws.com/world+(2).svg',
		empty_state_finder    : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/ic-empty-doc_app.svg',
		ship_icon             : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/shipIcon.jpg',
		truck_icon            : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/truckIcon.png',
		air_icon2             : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/airplane.png',
		tracking_loader       : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/cogo-animation.gif',
		extract_data          : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/Data-extraction.jpg',
		container_icon        : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/icdport.svg',
		air_icon              : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/airicon.svg',
		unsubscription_cargo  : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/page_cargo.png',
		unsubscription_bottle : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/Bottle.png',
		unsubscription_plane  : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/page_plane.png',
		insurance_empty_image : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/Insurance.png',
		cogoport_image:
			'https://cogoport-production.sgp1.digitaloceanspaces.com/e845419ea5eacebda858bad8b20d2797/cogoport-logo.svg',
		kyc_dialog_image         : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/nogstIcon.svg',
		secure_icon              : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/secure-icon.svg',
		heading_icon             : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/heading.svg',
		sub_heading_icon         : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/subheading.svg',
		loading_icon             : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading.svg',
		no_data_icon             : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/nodata.svg',
		payment_icon             : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/payment.svg',
		secure_profile_icon      : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/secure-profile-icon.svg',
		no_schedules_found_image : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/empty_icon 1.svg',
		globe                    : 'https://cdn.cogoport.io/cms-prod/cogo_partner/vault/original/globe-language.png',
		archive_icon             : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/archive.svg',
	},
	onboarding_specialist: {
		name         : 'Kanira Patel',
		phone_number : '+918976851674',
		email_id     : 'kanira.patel@cogoport.com',
	},
	user_specific_email_id: {
		ajeet: 'ajeet@cogoport.com',
	},
	zeroth_index : 0,
	patterns     : {
		PAN_NUMBER       : /[A-Za-z]{5}\d{4}[A-Za-z]{1}/g,
		EMAIL            : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
		CONTAINER_NUMBER : /^[A-Z]{3}U[0-9]{6,7}$/,
		MOBILE           : /^[0-9]{10}$/,
		GST_NUMBER:
			/\d{2}[A-Za-z]{5}\d{4}[A-Za-z]{1}[A-Za-z\d]{1}[Zz]{1}[A-Za-z\d]{1}/g,
		VIETNAM_TAX : /^0[1-3]{1}[0-9]{8}$|^0[1-3]{1}[0-9]{8}-?[0-9]{3}$/,
		PASSWORD    : {
			PASSWORD_PATTERN : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/gm,
			lowercase        : /[a-z]/gm,
			uppercase        : /[A-Z]/gm,
			digit            : /[0-9]/gm,
			special          : /[!@#$%^&*]/gm,
			minLength        : /[a-zA-Z0-9!@#$%^&*]{8,}/gm,
		},
		AIRWAY_BILL_NO: /^\d{3}-\d{8}$/,
	},
};

export default GLOBAL_CONSTANTS;
