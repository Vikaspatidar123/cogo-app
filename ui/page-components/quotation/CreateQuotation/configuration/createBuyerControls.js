// eslint-disable-next-line max-len
const emailValidator =	/^[^<>()[\]\\,;:%#^\s@"$&!@]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/;

const mobileValidator = /^[0-9]{10}$/;
// const GstValidator = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

const createBuyerControls = ({ countryInfo = {}, stateInfo = {} }) => {
	const userDetailControl = [
		{
			label            : 'Billing Party Name',
			name             : 'partyName',
			type             : 'text',
			placeholder      : 'Enter Billing Party Name',
			valueKey         : 'business_name',
			noOptionsMessage : 'Type to search...',
		},
		{
			name        : 'pocName',
			label       : 'POC Name *',
			type        : 'text',
			placeholder : 'Enter POC Name',
			rules       : { required: true },
		},
		{
			name        : 'email',
			label       : 'Email Id *',
			type        : 'text',
			placeholder : 'Enter Email Id',
			// style       : { height: '42px' },
			rules       : {
				required : true,
				pattern  : {
					value   : emailValidator,
					message : 'Invalid email address',
				},
			},
		},
		{
			name        : 'taxNumber',
			label       : 'Tax Number',
			type        : 'text',
			placeholder : 'Enter Tax Number',
		},
		{
			name        : 'phoneNumber',
			label       : 'Phone Number *',
			type        : 'mobile_number',
			placeholder : 'Enter Phone Number',
			rules       : {
				required : true,
				pattern  : {
					value   : mobileValidator,
					message : 'Invalid phone number',
				},
			},
		},
		{
			name        : 'country',
			label       : 'Country *',
			type        : 'async_select',
			placeholder : 'Enter Country',
			className   : 'primary md',
			rules       : { required: true },
			asyncKey    : 'locations',
			valueKey    : 'id',
			// defaultOptions: true,
			params      : {
				filters: {
					type: 'country',
				},
			},
		},
	];

	const addressDetailsControl = [
		{
			name        : 'address',
			label       : 'Address line *',
			type        : 'text',
			placeholder : 'Enter Address',
			rules       : { required: true },
		},
		{
			name        : 'pincode',
			label       : 'Pincode',
			type        : 'text',
			placeholder : 'Enter Pincode',
			// style       : { height: '40px' },
		},
		{
			name        : 'state',
			label       : 'State (optional)',
			type        : 'select',
			placeholder : 'Enter State',
			asyncKey    : 'locations',
			disabled    : !countryInfo?.id,
			params      : {
				filters: { type: 'region', country_id: countryInfo?.id },
			},
		},
		{
			name        : 'city',
			label       : 'City (optional)',
			type        : 'text',
			placeholder : 'Enter City',
			asyncKey    : 'locations',
			disabled    : !stateInfo?.id,
			params      : {
				filters: { type: 'city', region_id: stateInfo?.id },
			},
		},
	];

	return {
		userDetailControl, addressDetailsControl,
	};
};
export default createBuyerControls;
