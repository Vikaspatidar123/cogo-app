/* eslint-disable import/no-unresolved */
import data from '@/.data-store/constants/countries.json';
import patterns from '@/ui/commons/configurations/patterns';

// const GstValidator = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
const country = data?.map((item) => ({
	label: (
		<div style={{ display: 'flex' }}>
			<img
				src={
          item.flag_icon_url
          	? item.flag_icon_url
          	: 'https://via.placeholder.com/24x20'
        }
				alt={item.name}
			/>
			<div style={{ marginLeft: '5px' }}>{item.name}</div>
		</div>
	),
	value: item.id,
}));
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
			name        : 'phoneNumber',
			label       : 'Phone Number *',
			type        : 'mobile_number',
			placeholder : 'Enter Phone Number',
			rules       : {
				required : true,
				pattern  : {
					value   : patterns.MOBILE,
					message : 'Invalid phone number',
				},
			},
		},
		{
			name        : 'country',
			label       : 'Country *',
			type        : 'select',
			placeholder : 'Enter Country',
			className   : 'primary md',
			rules       : { required: true },
			// asyncKey    : 'locations',
			// valueKey    : 'id',
			// // defaultOptions: true,
			// params      : {
			// 	filters: {
			// 		type: 'country',
			// 	},
			// },
			options     : country,
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
		userDetailControl,
		addressDetailsControl,
	};
};
export default createBuyerControls;
