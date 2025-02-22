const FILTER_KEYS = {
	ALL_SHIPMENTS             : 'total_subscriptions',
	TRACKED_CONTAINERS        : 'container_tracked',
	ON_TRACK                  : 'on_track_shipments',
	CONTAINERS_AT_ORIGIN      : 'containers_At_origin',
	CONTAINERS_AT_DESTINATION : 'containers_At_destination',
	IN_OCEAN_TRANSIT          : 'containers_in_transit',

	// wide filter
	ALL_BL_BOOKING_SHIPMENTS       : 'bl_booking_no',
	ALL_CONTAINER_NUMBER_SHIPMENTS : 'container_no',
	ARRIVAL_IN_FOURTEEN_DAYS       : 'arrival_in_fourteen_days',
	ARRIVAL_IN_SEVEN_DAYS          : 'arrival_in_seven_days',
	DELAYED_BETWEEN_MORE_THAN_FIVE : 'delayed_between_more_than_five',
	DELAYED_BETWEEN_ONE_TO_FOUR    : 'delayed_between_one_to_four',
	DEMURRAGE_IN_SEVEN_DAYS        : 'demurrage_in_seven_days',
	DETENTION_IN_SEVEN_DAYS        : 'detention_in_seven_days',
	DEPARTING_IN_FOURTEEN_DAYS     : 'departing_in_fourteen_days',
	DEPARTING_IN_SEVEN_DAYS        : 'departing_in_seven_days',

	// filters
	SHIPPING_LINES     : 'shipping_lines',
	ATTENTION_REQUIRED : 'attention_required',
	SHIPMENT_DELAYED   : 'shipment_delayed',
	CONSIGNEE          : 'consignee',
	SHIPPER            : 'shipper',
	BOOKED_COGOPORT    : 'booked_with_cogoport',
};

const FILTER_KEY_TO_ID = {
	[FILTER_KEYS.ALL_SHIPMENTS]             : 'total_subscriptions',
	[FILTER_KEYS.TRACKED_CONTAINERS]        : 'total_subscriptions',
	[FILTER_KEYS.ON_TRACK]                  : 'on_track_id',
	[FILTER_KEYS.ATTENTION_REQUIRED]        : 'attention_required_id',
	[FILTER_KEYS.SHIPMENT_DELAYED]          : 'shipments_delayed',
	[FILTER_KEYS.CONTAINERS_AT_ORIGIN]      : 'containers_At_origin_id',
	[FILTER_KEYS.IN_OCEAN_TRANSIT]          : 'containers_in_transit_ids',
	[FILTER_KEYS.CONTAINERS_AT_DESTINATION] : 'containers_At_destination_id',

	// wide filter key to id
	[FILTER_KEYS.ALL_BL_BOOKING_SHIPMENTS]       : 'bl_booking_id',
	[FILTER_KEYS.ALL_CONTAINER_NUMBER_SHIPMENTS] : 'container_no_id',
	[FILTER_KEYS.ARRIVAL_IN_FOURTEEN_DAYS]       : 'arrival_in_fourteen_day_id',
	[FILTER_KEYS.ARRIVAL_IN_SEVEN_DAYS]          : 'arrival_in_seven_day_id',
	[FILTER_KEYS.DELAYED_BETWEEN_MORE_THAN_FIVE] : 'delayed_between_more_than_five_id',
	[FILTER_KEYS.DELAYED_BETWEEN_ONE_TO_FOUR]    : 'delayed_between_one_to_four_id',
	[FILTER_KEYS.DEMURRAGE_IN_SEVEN_DAYS]        : 'demurrage_in_seven_day_id',
	[FILTER_KEYS.DETENTION_IN_SEVEN_DAYS]        : 'detention_in_seven_day_id',
	[FILTER_KEYS.DEPARTING_IN_FOURTEEN_DAYS]     : 'departing_in_fourteen_day_id',
	[FILTER_KEYS.DEPARTING_IN_SEVEN_DAYS]        : 'departing_in_seven_day_id',

	// filters
	[FILTER_KEYS.SHIPPING_LINES]     : 'shipping_line_id',
	[FILTER_KEYS.SHIPPER]            : 'shipper',
	[FILTER_KEYS.CONSIGNEE]          : 'consignee',
	[FILTER_KEYS.BOOKED_COGOPORT]    : 'booked_with_cogoport',
	[FILTER_KEYS.ATTENTION_REQUIRED] : 'attention_required',
	[FILTER_KEYS.SHIPMENT_DELAYED]   : 'shipments_delayed_id',
};

const FILTER_KEY_TO_LABEL = {
	[FILTER_KEYS.ALL_SHIPMENTS]             : 'ALL SHIPMENTS',
	[FILTER_KEYS.TRACKED_CONTAINER]         : 'TRACKED CONTAINERS',
	[FILTER_KEYS.ON_TRACK]                  : 'ON TRACK SHIPMENTS',
	[FILTER_KEYS.ATTENTION_REQUIRED]        : 'ATTENTION REQUIRED',
	[FILTER_KEYS.SHIPMENT_DELAYED]          : 'DELAYED SHIPMENTS',
	[FILTER_KEYS.CONTAINERS_AT_ORIGIN]      : 'AT ORIGIN',
	[FILTER_KEYS.IN_OCEAN_TRANSIT]          : 'IN OCEAN TRANSIT',
	[FILTER_KEYS.CONTAINERS_AT_DESTINATION] : 'AT DESTINATION',

	// wide filters subheadings
	[FILTER_KEYS.ALL_BL_BOOKING_SHIPMENTS]       : 'TRACKED BY BL/BOOKING',
	[FILTER_KEYS.ALL_CONTAINER_NUMBER_SHIPMENTS] : 'TRACKED BY CONTAINER',
	[FILTER_KEYS.ARRIVAL_IN_FOURTEEN_DAYS]       : 'ARRIVING IN NEXT 7 DAYS',
	[FILTER_KEYS.ARRIVAL_IN_SEVEN_DAYS]          : 'AT TRANS-SHIPMENT HUB',
	[FILTER_KEYS.DELAYED_BETWEEN_MORE_THAN_FIVE] : 'DELAYED BY 5+ DAYS',
	[FILTER_KEYS.DELAYED_BETWEEN_ONE_TO_FOUR]    : 'DELAYED BY 1-4 DAYS',
	[FILTER_KEYS.DEMURRAGE_IN_SEVEN_DAYS]        : 'DEMURRAGE ENDING IN 7 DAYS',
	[FILTER_KEYS.DETENTION_IN_SEVEN_DAYS]        : 'DETENTION ENDING IN 7 DAYS',
	[FILTER_KEYS.DEPARTING_IN_FOURTEEN_DAYS]     : 'DEPARTING IN NEXT 14 DAYS',
	[FILTER_KEYS.DEPARTING_IN_SEVEN_DAYS]        : 'DEPARTING IN NEXT 7 DAYS',
};

const WIDE_FILTER_KEY = {
	[FILTER_KEYS.ALL_SHIPMENTS]: {
		subheading1 : FILTER_KEYS.ALL_BL_BOOKING_SHIPMENTS,
		subheading2 : FILTER_KEYS.ALL_CONTAINER_NUMBER_SHIPMENTS,
	},
	[FILTER_KEYS.SHIPMENT_DELAYED]: {
		subheading1 : FILTER_KEYS.DELAYED_BETWEEN_ONE_TO_FOUR,
		subheading2 : FILTER_KEYS.DELAYED_BETWEEN_MORE_THAN_FIVE,
	},
	[FILTER_KEYS.CONTAINERS_AT_ORIGIN]: {
		subheading1 : FILTER_KEYS.DEPARTING_IN_SEVEN_DAYS,
		subheading2 : FILTER_KEYS.DEPARTING_IN_FOURTEEN_DAYS,
	},
	[FILTER_KEYS.IN_OCEAN_TRANSIT]: {
		subheading1 : FILTER_KEYS.ARRIVAL_IN_SEVEN_DAYS,
		subheading2 : FILTER_KEYS.ARRIVAL_IN_FOURTEEN_DAYS,
	},
	[FILTER_KEYS.CONTAINERS_AT_DESTINATION]: {
		subheading1 : FILTER_KEYS.DETENTION_IN_SEVEN_DAYS,
		subheading2 : FILTER_KEYS.DEMURRAGE_IN_SEVEN_DAYS,
	},
};

const FILTER_WIDTH = {
	[FILTER_KEYS.ALL_SHIPMENTS]             : 2,
	[FILTER_KEYS.CONTAINERS_AT_ORIGIN]      : 1,
	[FILTER_KEYS.CONTAINERS_AT_DESTINATION] : 1,
	[FILTER_KEYS.ATTENTION_REQUIRED]        : 0,
	[FILTER_KEYS.SHIPMENT_DELAYED]          : 1,
	[FILTER_KEYS.IN_OCEAN_TRANSIT]          : 1,
};
const FILTER_CARDS_LIST = [
	FILTER_KEYS.ALL_SHIPMENTS,
	FILTER_KEYS.ON_TRACK,
	FILTER_KEYS.ATTENTION_REQUIRED,
	FILTER_KEYS.SHIPMENT_DELAYED,
	FILTER_KEYS.CONTAINERS_AT_ORIGIN,
	FILTER_KEYS.IN_OCEAN_TRANSIT,
	FILTER_KEYS.CONTAINERS_AT_DESTINATION,
];

const PAGE_LIMIT = 10;

export {
	PAGE_LIMIT,
	FILTER_CARDS_LIST,
	FILTER_KEYS,
	FILTER_KEY_TO_ID,
	FILTER_KEY_TO_LABEL,
	FILTER_WIDTH,
	WIDE_FILTER_KEY,
};
