import patterns from '@/ui/commons/configurations/patterns';

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
					value   : patterns.EMAIL,
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
			name            : 'phoneNumber',
			label           : 'Phone Number *',
			type            : 'mobile_number',
			isInputGroup    : true,
			showCountryName : false,
			placeholder     : 'Enter Phone Number',
			rules           : {
				required : true,
				pattern  : {
					value   : patterns.MOBILE,
					message : 'Invalid phone number',
				},
			},
		},
		{
			name           : 'country',
			label          : 'Country *',
			type           : 'async_select',
			placeholder    : 'Enter Country',
			asyncKey       : 'locations',
			defaultOptions : true,
			initialCall    : true,
			labelKey       : 'label',
			rules          : { required: true },
			params         : {
				filters: {
					type: 'country',
				},
			},
			getModifiedOptions: (options = []) => (options || []).map((x) => ({
				...x,
				value : x.id,
				label : (
					<div style={{ display: 'flex' }}>
						<img src={x.flag_icon_url} alt="" />
						<div style={{ marginLeft: '5px' }}>{x.name}</div>
					</div>
				),
			})),
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
			type        : 'async_select',
			initialCall : true,
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
			type        : 'async_select',
			initialCall : true,
			placeholder : 'Enter City',
			asyncKey    : 'locations',
			disabled    : !stateInfo?.id,
			params      : {
				filters: { type: 'city', region_id: stateInfo?.id },
			},
		},
	];

	return {
		userDetailControl,
		addressDetailsControl,
	};
};
export default createBuyerControls;
