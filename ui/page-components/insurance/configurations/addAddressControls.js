import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

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
		type        : 'async_select',
		asyncKey    : 'locations',
		stepper     : false,
		placeholder : 'Enter Pincode',
		rules       : { required: 'required *' },
		span        : 6,
		valueKey    : 'postal_code',
		labelKey    : 'postal_code',
		params      : {
			filters: {
				type       : 'pincode',
				country_id : GLOBAL_CONSTANTS.COUNTRY_IDS.IN,
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
		type        : 'async_select',
		placeholder : 'Enter Country',
		rules       : { required: 'required *' },
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
		type        : 'mobile-select',
		placeholder : 'Enter Phone Number',
		span        : 6,
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
