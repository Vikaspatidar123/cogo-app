import getGeoConstants from '@/ui/commons/constants/geo';

const geo = getGeoConstants();
const REGISTRATION_PATTERN = geo.others.registration_number.pattern;

export const contactInfoControls = ({ t }) => {
	const addressControls = [
		{
			label       : `${t('cogoStore:enter_poc_name_label')}`,
			name        : 'name',
			type        : 'text',
			placeholder : `${t('cogoStore:enter_poc_name')}`,
			rules       : { required: `${t('cogoStore:enter_poc_name')}` },
		},
		{
			label       : `${t('cogoStore:enter_billing_name_label')}`,
			name        : 'billingPartyName',
			type        : 'text',
			placeholder : `${t('cogoStore:enter_billing_name')}`,
			rules       : { required: `${t('cogoStore:enter_billing_name')}` },
		},
		{
			label       : `${t('cogoStore:email_id_label')}`,
			name        : 'email',
			type        : 'text',
			placeholder : `${t('cogoStore:enter_email_id')}`,
			style       : { height: '42px' },
			rules       : {
				required : `${t('cogoStore:enter_email_id')}`,
				pattern  : {
					value   : geo.regex.EMAIL,
					message : `${t('cogoStore:invalid_email_id')}`,
				},
			},
		},
		{
			name        : 'mobileNumber',
			label       : `${t('cogoStore:mobile_number_label')}`,
			placeholder : `${t('cogoStore:enter_mobile_number')}`,
			type        : 'mobile-number-select',
			rules       : {
				required : `${t('cogoStore:enter_mobile_number')}`,
				pattern  : {
					value   : geo.regex.MOBILE_NUMBER,
					message : `${t('cogoStore:invalid_mobile_number')}`,
				},
			},
		},
		{
			label       : `${t('cogoStore:tax_number_label')}`,
			name        : 'taxNumber',
			type        : 'text',
			placeholder : `${t('cogoStore:enter_tax_number')}`,
			rules       : {
				required : `${t('cogoStore:enter_tax_number')}`,
				pattern  : {
					value   : REGISTRATION_PATTERN,
					message : `${t('cogoStore:invalid_gst_number')}`,
				},
			},
		},
		{
			label          : `${t('cogoStore:country_label')}`,
			name           : 'country',
			type           : 'location-select',
			placeholder    : `${t('cogoStore:select_country')}`,
			className      : 'primary md',
			rules          : { required: `${t('cogoStore:select_country')}` },
			optionsListKey : 'countries',
			isClearable    : true,
			valueKey       : 'id',
			params         : {
				filters: {
					type: ['country'],
				},
			},
		},
		{
			label          : `${t('cogoStore:state_label')}`,
			name           : 'state',
			type           : 'location-select',
			placeholder    : `${t('cogoStore:select_state')}`,
			optionsListKey : 'locations',
			isClearable    : true,
			params         : {
				filters: { type: ['region'] },
			},
		},
		{
			label          : `${t('cogoStore:city_label')}`,
			name           : 'city',
			type           : 'location-select',
			placeholder    : `${t('cogoStore:select_city')}`,
			optionsListKey : 'locations',
			isClearable    : true,
			params         : {
				filters: { type: ['city'] },
			},
		},
		{
			label       : `${t('cogoStore:pincode_label')}`,
			name        : 'pincode',
			type        : 'text',
			placeholder : `${t('cogoStore:enter_pincode')}`,
			style       : { height: '40px' },
			rules       : { required: `${t('cogoStore:enter_pincode')}` },
		},
		{
			name        : 'address',
			label       : `${t('cogoStore:address_label')}`,
			placeholder : `${t('cogoStore:enter_address')}`,
			type        : 'textarea',
			rules       : { required: `${t('cogoStore:enter_address')}` },
		},
		{
			name      : 'address_type',
			label     : `${t('cogoStore:address_type_label')}`,
			type      : 'radio',
			showLabel : false,
			options   : [
				{
					label : `${t('cogoStore:home_label')}`,
					value : 'home',
				},
				{
					label : `${t('cogoStore:work_label')}`,
					value : 'work',
				},
				{
					label : `${t('cogoStore:others_label')}`,
					value : 'others',
				},
			],
			rules: { required: `${t('cogoStore:select_address_type')}` },
		},
	];
	return { addressControls };
};
