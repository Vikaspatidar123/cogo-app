import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import getCountryDetails from '@/ui/commons/utils/getCountryDetails';

const get = (formObject = {}, key = '') => formObject[key] || null;

const controls = [
	{
		name        : 'insuredFirstName',
		placeholder : 'Insured First Name',
		type        : 'text',
		span        : 4,
		profileKey  : 'name',
	},
	{
		name        : 'insuredLastName',
		placeholder : 'Insured Last Name',
		type        : 'text',
		span        : 4,
	},
	{
		name        : 'email',
		placeholder : 'Email',
		type        : 'text',
		span        : 4,
		profileKey  : 'email',
	},
	{
		name        : 'phoneNo',
		placeholder : 'Phone Number',
		type        : 'text',
		span        : 4,
		rules       : {
			length: {
				value   : 10,
				message : 'Phone Number should be of 10 digits',
			},
		},
		profileKey: 'mobile_number',
	},
	{
		name        : 'gstin',
		placeholder : 'GST No.',
		type        : 'text',
		span        : 4,
		rules       : {
			pattern: {
				value   : GLOBAL_CONSTANTS.patterns.GST_NUMBER,
				message : 'Invalid GST',
			},
		},
	},
	{
		name        : 'aadharNumber',
		placeholder : 'Aadhar No.',
		type        : 'number',
		span        : 4,
	},
	{
		name        : 'partyName',
		placeholder : 'Billing Name',
		type        : 'text',
		span        : 4,
	},
	{
		name        : 'billingAddress',
		placeholder : 'Address',
		type        : 'text',
		span        : 4,
	},
	{
		name        : 'billingPincode',
		placeholder : 'Pincode',
		type        : 'async_select',
		asyncKey    : 'locations',
		stepper     : false,
		span        : 4,
		valueKey    : 'postal_code',
		labelKey    : 'postal_code',
		params      : {
			// filters: {
			// 	type       : 'pincode',
			// 	country_id : SUPPORTED_COUNTRY_ID,
			// },
			includes: {
				country                 : '',
				region                  : '',
				city                    : '',
				district                : '',
				default_params_required : true,
			},
		},
	},
	{
		name        : 'billingState',
		placeholder : 'State',
		type        : 'text',
		span        : 4,
		disabled    : true,
	},
	{
		name        : 'billingCity',
		placeholder : 'City',
		type        : 'text',
		disabled    : true,
		span        : 4,
	},
	{
		name        : 'panNumber',
		placeholder : 'PAN Number',
		type        : 'text',
		span        : 4,
		rules       : {
			pattern: {
				value   : /^[A-Z]{5}[0-9]{4}[A-Z]{1}/g,
				message : 'Invalid PAN Number',
			},
		},
	},
];

const getControls = (formDetails = {}, profile = {}, setCityState = () => {}) => {
	const SUPPORTED_COUNTRY_CODE = GLOBAL_CONSTANTS.feature_supported_service.cargo_insurance.supported_countries;

	const SUPPORTED_COUNTRY_ID = SUPPORTED_COUNTRY_CODE.map((code) => {
		const countryInfo = getCountryDetails({ country_code: code });
		return countryInfo.id;
	});

	return controls.map((control) => {
		if (control.name === 'billingPincode') {
			return {
				...control,
				handleChange: (e) => {
					setCityState({
						city  : e?.display_name || e?.district?.name || e?.city?.name,
						state : e?.region?.name,
					});
				},
				params: {
					...control.params,
					filters: {
						type       : 'pincode',
						country_id : SUPPORTED_COUNTRY_ID,
					},
				},
			};
		}

		return {
			...control,
			value: get(formDetails, control.name) || profile[control?.profileKey],
		};
	});
};

export default getControls;
