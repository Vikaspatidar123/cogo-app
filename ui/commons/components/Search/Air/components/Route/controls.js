import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const INDIA_COUNTRY_CODE = GLOBAL_CONSTANTS.country_code.IN;

const getControls = ({
	setLocation = () => {},
	location = {},
	org_id,
	setToggleState,
}) => [
	{
		name           : 'origin',
		labelShow      : 'ORIGIN',
		defaultOptions : true,
		type           : 'async_select',
		placeholder    : 'Shipping from',
		asyncKey       : 'locations',
		style          : { width: '300px' },
		handleChange   : (obj) => {
			setLocation((pv) => ({
				...pv,
				origin: obj,
			}));
			setToggleState(() => {
				if (obj?.country_code === INDIA_COUNTRY_CODE) {
					return 'export';
				}
				if (location?.destination?.country_code === INDIA_COUNTRY_CODE) {
					return 'import';
				}
				return 'export';
			});
		},
		params: {
			filters     : { type: ['airport', 'city', 'country'] },
			preferences : {
				organization_id : org_id,
				service_type    : 'air_freight',
			},
		},
		searchParams: {
			intent          : 'rate_search',
			organization_id : org_id,
			service_type    : 'air_freight',
		},
		grouped : ['city', 'country'],
		span    : 6,
		value   : location?.origin?.id,
		rules   : {
			required: true,
		},
	},
	{
		name           : 'destination',
		labelShow      : 'DESTINATION',
		defaultOptions : true,
		type           : 'async_select',
		placeholder    : 'Shipping to',
		asyncKey       : 'locations',
		style          : { width: '300px' },
		handleChange   : (obj) => {
			setLocation((pv) => ({ ...pv, destination: obj }));
			setToggleState(() => {
				if (obj?.country_code === INDIA_COUNTRY_CODE) {
					return 'import';
				}
				if (location?.origin?.country_code === INDIA_COUNTRY_CODE) {
					return 'export';
				}
				return 'export';
			});
		},
		params: {
			filters     : { type: ['airport', 'city', 'country'] },
			preferences : {
				organization_id : org_id,
				service_type    : 'air_freight',
			},
		},
		searchParams: {
			intent          : 'rate_search',
			organization_id : org_id,
			service_type    : 'air_freight',
		},
		grouped : ['city', 'country'],
		span    : 6,
		value   : location?.destination?.id,
		rules   : {
			required: true,
		},
	},
	{
		name  : 'pickup_location',
		type  : 'checkbox',
		span  : 6,
		value : false,
		label : 'Door Pickup Required',
		rules : {
			required: true,
		},
	},
	{
		name  : 'delivery_location',
		type  : 'checkbox',
		span  : 6,
		label : 'Doorstep Delivery Required',
		value : false,
		rules : {
			required: true,
		},
	},

	{
		name           : 'origin_address',
		labelShow      : 'ORIGIN PINCODE',
		style          : { width: '300px' },
		defaultOptions : true,
		type           : 'async_select',
		placeholder    : 'Shipping from',
		asyncKey       : 'locations',
		handleChange   : (obj) => {
			setLocation((pv) => ({ ...pv, origin_pincode: obj }));
		},
		params: {
			filters: {
				type       : ['pincode', 'airport', 'seaport', 'cfs'],
				country_id : location?.origin?.country_id,
			},
		},
		value : location?.origin_pincode?.id,
		span  : 6,
		rules : {
			required: true,
		},
	},

	{
		name           : 'destination_address',
		labelShow      : 'DESTINATION PINCODE',
		defaultOptions : true,
		type           : 'async_select',
		placeholder    : 'Shipping to',
		asyncKey       : 'locations',
		style          : { width: '300px' },
		handleChange   : (obj) => {
			setLocation((pv) => ({ ...pv, destination_pincode: obj }));
		},
		params: {
			filters: {
				type       : ['pincode', 'airport', 'seaport', 'cfs'],
				country_id : location?.destination?.country_id,
			},
		},
		value : location?.destination_pincode?.id,
		span  : 6,
		rules : {
			required: true,
		},
	},
];

export default getControls;
