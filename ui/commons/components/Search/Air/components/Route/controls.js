import { getCountrySpecificData } from '@/ui/commons/constants/CountrySpecificDetail';

const COMMON_OBJ = {
	accessorType  : 'navigations',
	accessor      : 'spot_search_air',
	isDefaultData : true,
};

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
				const { origin_input_trade_type } = getCountrySpecificData({
					country_code: obj?.country_code,
					...COMMON_OBJ,
				});
				if (origin_input_trade_type) return origin_input_trade_type;

				const { origin_input_location_trade_type } = getCountrySpecificData({
					country_code: location?.destination?.country_code,
					...COMMON_OBJ,
				});

				if (origin_input_location_trade_type) return origin_input_location_trade_type;

				return 'export';
			});
		},
		params: {
			filters     : { type: ['airport'] },
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
				const { destination_input_trade_type } = getCountrySpecificData({
					country_code: obj?.country_code,
					...COMMON_OBJ,
				});

				if (destination_input_trade_type) return destination_input_trade_type;

				const { destination_input_location_trade_type } = getCountrySpecificData({
					country_code: location?.destination?.country_code,
					...COMMON_OBJ,
				});

				if (destination_input_location_trade_type) return destination_input_location_trade_type;

				return 'export';
			});
		},
		params: {
			filters     : { type: ['airport'] },
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
