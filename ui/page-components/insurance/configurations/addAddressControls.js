import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import getCountryDetails from '@/ui/commons/utils/getCountryDetails';

const SUPPORTED_COUNTRY_CODE = GLOBAL_CONSTANTS.feature_supported_service.cargo_insurance.supported_countries;

const getCountryIds = ({ countryCodeArr }) => countryCodeArr.map((code) => {
	const countryInfo = getCountryDetails({ country_code: code });
	return countryInfo.id;
});

export const addAddressControls = [
	{
		label       : 'Billing Party Name',
		name        : 'name',
		type        : 'text',
		placeholder : 'Enter Billing Party Name',
		rules       : { required: 'required *' },
		span        : 6,
	},
	{
		label       : 'Address',
		name        : 'address',
		type        : 'text',
		placeholder : 'Enter Address',
		rules       : {
			required: 'required *',
		},
		span: 6,
	},
	{
		label       : 'Pincode',
		name        : 'pincode',
		placeholder : 'Enter Pincode',
		rules       : { required: 'required *' },
		type        : 'async_select',
		asyncKey    : 'locations',
		stepper     : false,
		span        : 6,
		valueKey    : 'postal_code',
		labelKey    : 'postal_code',
		params      : {
			filters: {
				type       : 'pincode',
				country_id : getCountryIds({ countryCodeArr: SUPPORTED_COUNTRY_CODE }),
			},
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
		label       : 'Country',
		name        : 'country_id',
		placeholder : 'Enter Country',
		rules       : { required: 'required *' },
		type        : 'async_select',
		asyncKey    : 'locations',
		valueKey    : 'id',
		params      : {
			filters: {
				type: 'country',
			},
		},
		span: 6,
	},
	{
		label       : 'State',
		name        : 'state',
		type        : 'text',
		placeholder : 'Enter State',
		span        : 6,
		disabled    : true,
	},
	{
		label       : 'City',
		name        : 'city',
		type        : 'text',
		placeholder : 'Enter City',
		span        : 6,
		disabled    : true,
	},
	{
		label       : 'Tax Number',
		name        : 'tax_number',
		type        : 'text',
		placeholder : 'Enter Tax Number',
		span        : 6,
	},

	{
		label       : 'POC Name',
		name        : 'poc_name',
		type        : 'text',
		placeholder : 'Enter POC Name',
		valueKey    : 'business_name',
		span        : 6,
	},
	{
		label       : 'Email Id',
		name        : 'email',
		type        : 'text',
		placeholder : 'Enter Email Id',
		span        : 6,
	},
	{
		label       : 'Phone Number',
		name        : 'phoneNumber',
		type        : 'mobile_number',
		placeholder : 'Enter Phone Number',
		span        : 12,
	},
];

const useGetControls = ({ setCityState = () => {} }) => (addAddressControls || []).map((control) => {
	if (control.name === 'pincode') {
		return {
			...control,
			handleChange: (e) => {
				setCityState({
					city  : e?.display_name || e?.district?.name,
					state : e?.region?.name,
				});
			},
		};
	}
	return {
		...control,
	};
});

export default useGetControls;
