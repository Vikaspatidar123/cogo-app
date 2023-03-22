export const getUnit = (item) => {
	let label = [];

	label = {
		fcl_freight: 'Container',
		lcl_freight: 'Packages',
		air_freight: 'Packages',
	};

	return label?.[item] || '';
};

export const getSerivceUnit = (item) => {
	let label = [];

	label = {
		fcl_freight: 'CTR',
		lcl_freight: 'CBM',
		air_freight: 'KGS',
	};

	return label?.[item] || '';
};

export const getSubUnit = (item) => {
	let label = [];

	label = {
		fcl_freight: 'Containers',
		lcl_freight: 'Volume',
		air_freight: 'Weight',
	};

	return label?.[item] || '';
};

export const getContractState = {
	active: 'active',
	pending_approval: 'pending',
	expired: 'expired',
	all: 'active',
};
