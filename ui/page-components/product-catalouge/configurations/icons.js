const customs = {
	type     : 'customs',
	iconType : 'customs',
	size     : 1,
};
const transport = {
	type     : 'land',
	iconType : 'truck',
	size     : 1,
};
const train = {
	type     : 'land',
	iconType : 'train',
	size     : 1,
};
const sea = {
	type     : 'sea',
	iconType : 'ship',
	size     : 1,
};

const air = {
	type     : 'sea',
	iconType : 'air',
	size     : 1,
};
const iconsJson = {
	fcl_freight_service                 : { old: 'ic-fcl', new: sea },
	origin_fcl_customs_service          : { old: 'ic-customs', new: customs },
	destination_fcl_customs_service     : { old: 'ic-customs', new: customs },
	haulage_freight_service             : { old: 'ic-fcl', new: train },
	origin_haulage_freight_service      : { old: 'ic-fcl', new: train },
	destination_haulage_freight_service : { old: 'ic-fcl', new: train },
	origin_trailer_freight_service      : { old: 'ic-domestic', new: transport },
	destination_trailer_freight_service : { old: 'ic-domestic', new: transport },
	origin_ftl_freight_service          : { old: 'ic-domestic', new: transport },
	destination_ftl_freight_service     : { old: 'ic-domestic', new: transport },
	lcl_freight_service                 : { old: 'ic-lcl', new: sea },
	origin_lcl_customs_service          : { old: 'ic-customs', new: customs },
	destination_lcl_customs_service     : { old: 'ic-customs', new: customs },
	origin_ltl_freight_service          : { old: 'ic-domestic', new: transport },
	destination_ltl_freight_service     : { old: 'ic-domestic', new: transport },
	lcl_freight                         : { old: 'ic-lcl', new: sea },
	fcl_freight                         : { old: 'ic-fcl', new: sea },
	air_freight                         : { old: 'ic-air', new: air },
	lcl_customs                         : { old: 'ic-customs', new: customs },
	fcl_customs                         : { old: 'ic-customs', new: customs },
	air_customs                         : { old: 'ic-customs', new: customs },
	ltl_freight                         : { old: 'ic-domestic', new: transport },
	ftl_freight                         : { old: 'ic-domestic', new: transport },
	trailer_freight                     : { old: 'ic-domestic', new: transport },
	haulage_freight                     : { old: 'ic-fcl', new: train },
	origin_air_customs_service          : { old: 'ic-customs', new: customs },
	destination_air_customs_service     : { old: 'ic-customs', new: customs },
	air_freight_service                 : { old: 'ic-air', new: air },
	trailer_freight_service             : { old: 'ic-domestic', new: transport },
	ftl_freight_service                 : { old: 'ic-domestic', new: transport },
	ltl_freight_service                 : { old: 'ic-domestic', new: transport },
	fclfreight                          : { old: 'ic-fcl', new: sea },
	pickup                              : { old: 'ic-trailer', new: transport },
	origin_customs                      : { old: 'ic-customs', new: customs },
	destination_customs                 : { old: 'ic-customs', new: customs },
	origin_haulage                      : { old: 'ic-dryport', new: train },
	drop                                : { old: 'ic-trailer', new: transport },
	fcl_cfs_service                     : { old: 'ic-customs', new: customs },
	fcl_freight_local_service           : { old: 'ic-fcl', new: sea },
	lcl_customs_service                 : { old: 'ic-customs', new: customs },
	fcl_customs_service                 : { old: 'ic-customs', new: customs },
	air_customs_service                 : { old: 'ic-customs', new: customs },
	lcl_freight_local_service           : { old: 'ic-lcl', new: sea },
	air_freight_local_service           : { old: 'ic-air', new: air },
};
export default iconsJson;
