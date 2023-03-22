const detailsToShow = () => ({
	fcl_freight: [
		{
			key: 'free_days_detention',
			label: 'Free days at destination',
		},
		{
			key: 'cargo_readiness_date',
			label: 'Exp. Sailing Dt.',
			type: 'date',
		},
		{
			currencyKey: 'preferred_freight_rate_currency',
			pricKey: 'preferred_freight_rate',
			label: 'Indicative (BAS) Rate',
			type: 'price',
		},
		{
			key: 'negotiation_status',
			label: 'Negotiation status',
		},
	],
	ftl_freight: [
		{
			key: 'expected_cargo_date',
			label: 'Exp. Cargo Dt.',
			type: 'date',
		},
		{
			key: 'negotiation_status',
			label: 'Negotiation status',
		},
		{
			label: 'Cargo handling type',
			key: 'cargo_handling_type',
		},
		{
			label: 'Transport mode',
			key: 'transport_mode',
		},
		{
			label: 'Haulage type',
			key: 'haulage_type',
		},
		{
			label: 'Truck Type',
			key: 'truck_type',
		},
		{
			label: 'Truck count',
			key: 'trucks_count',
		},
	],
	ltl_freight: [
		{
			key: 'expected_cargo_date',
			label: 'Exp. Cargo Dt.',
			type: 'date',
		},
		{
			key: 'negotiation_status',
			label: 'Negotiation status',
		},
		{
			label: 'Cargo handling type',
			key: 'cargo_handling_type',
		},
		{
			label: 'Transport mode',
			key: 'transport_mode',
		},
		{
			label: 'Haulage type',
			key: 'haulage_type',
		},
		{
			label: 'Truck Type',
			key: 'truck_type',
		},
		{
			label: 'Truck count',
			key: 'trucks_count',
		},
	],
	fcl_customs: [
		{
			label: 'Cargo handling type',
			key: 'cargo_handling_type',
		},
		{
			label: 'AD code',
			key: 'ad_code',
		},
		{
			label: 'Hs code',
			key: 'hs_code',
		},
		{
			key: 'negotiation_status',
			label: 'Negotiation status',
		},
	],
	haulage_freight: [
		{
			key: 'negotiation_status',
			label: 'Negotiation status',
		},
		{
			label: 'Transport mode',
			key: 'transport_mode',
		},
		{
			label: 'Haulage type',
			key: 'haulage_type',
		},
		{
			label: 'Haulage type',
			key: 'haulage_type',
		},
		{
			label: 'Preferred Main Port',
			key: 'preferred_main_port.name',
		},
	],
	fcl_cfs: [
		{
			label: 'Cargo handling type',
			key: 'cargo_handling_type',
		},
		{
			label: 'AD code',
			key: 'ad_code',
		},
		{
			label: 'Hs code',
			key: 'hs_code',
		},
		{
			key: 'negotiation_status',
			label: 'Negotiation status',
		},
		{
			label: 'Enpanelled cfs',
			key: 'enpanelled_cfs',
		},
		{
			label: 'Commodity Description',
			key: 'commodity_description',
		},
	],
	trailer_freight: [
		{
			label: 'Containers count',
			value: 'containers_count',
		},
		{
			label: 'Haulage type',
			value: 'haulage_type',
		},
		{
			label: 'Transport modes',
			value: 'transport_modes',
		},
		{
			label: 'Cargo Wt/cont.',
			value: 'cargo_weight_per_container',
		},
	],
	lcl_freight: [
		{
			label: 'Commodity',
			key: 'commodity',
		},
		{
			key: 'packages_count',
			label: 'Packages',
		},
		{
			key: 'weight',
			label: 'Weight',
			type: 'weight',
		},
		{
			key: 'volume',
			label: 'Volume',
			type: 'volume',
		},
		{
			key: 'departure',
			label: 'Sailing date',
			type: 'date',
		},
		{
			key: 'transit_time',
			label: 'Transit time',
			type: 'transit_time',
		},
	],
	lcl_customs: [
		{
			label: 'Location',
			key: 'port',
			sub: 'name',
		},
		{
			label: 'Commodity',
			key: 'commodity',
		},
		{
			key: 'packages_count',
			label: 'Packages',
		},
		{
			key: 'weight',
			label: 'Weight',
			type: 'weight',
		},
		{
			key: 'volume',
			label: 'Volume',
			type: 'volume',
		},
	],
	air_freight: [
		{
			label: 'Airline',
			key: 'airline',
			sub: 'business_name',
		},
		{
			label: 'Commodity',
			key: 'commodity',
		},
		{
			key: 'packages_count',
			label: 'Packages',
		},
		{
			key: 'weight',
			label: 'Weight',
			type: 'weight',
		},
		{
			key: 'volume',
			label: 'Volume',
			type: 'volume',
		},
		{
			key: 'departure',
			label: 'Sailing date',
			type: 'date',
		},
		{
			key: 'transit_time',
			label: 'Transit time',
		},
	],
	air_customs: [
		{
			label: 'Location',
			key: 'airport',
			sub: 'name',
		},
		{
			label: 'Commodity',
			key: 'commodity',
		},
		{
			key: 'packages_count',
			label: 'Packages',
		},
		{
			key: 'weight',
			label: 'Weight',
			type: 'weight',
		},
		{
			key: 'volume',
			label: 'Volume',
			type: 'volume',
		},
	],
});

export default detailsToShow;
