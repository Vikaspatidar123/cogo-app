const getConfig = {
	lcl_freight: ['seaport', 'country', 'icd_port'],
	fcl_freight: ['seaport', 'country', 'icd_port'],
	air_freight: ['airport', 'country'],
	ftl_freight: ['cluster', 'seaport', 'airport', 'pincode', 'country'],
	trailer_freight: ['cluster', 'seaport', 'airport', 'pincode', 'country'],
	haulage_freight: [
		'icd_port',
		'seaport',
		'pincode',
		'cluster',
		'city',
		'country',
	],
	ltl_freight: ['cluster', 'pincode', 'city', 'country'],
	fcl_customs: ['seaport', 'country', 'trade', 'continent'],
	fcl_cfs: ['seaport', 'country', 'trade', 'continent'],
	lcl_customs: ['seaport', 'country', 'trade', 'continent'],
	air_customs: ['airport', 'country', 'continent'],
};

const getLocationConfig = (activeTab) => {
	return getConfig?.[activeTab];
};

export default getLocationConfig;
