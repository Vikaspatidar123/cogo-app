import {
	IcMFrupee,
	IcAWarehouse,
	IcMCfs,
	IcMAirport, IcMPort, IcMHaulage, IcMLocation,
} from '@cogoport/icons-react';

export default {
	airport: {
		icon     : <IcMAirport />,
		showType : false,
	},
	cfs: {
		icon     : <IcMCfs />,
		showType : true,
	},
	pincode: {
		icon     : <IcMLocation />,
		showType : true,
	},
	railway_terminal: {
		icon     : <IcMHaulage />,
		showType : false,
	},
	seaport: {
		icon     : <IcMPort />,
		showType : false,
	},
	trade: {
		icon     : <IcMFrupee />,
		showType : true,
	},
	warehouse: {
		icon     : <IcAWarehouse />,
		showType : true,
	},
	cluster: {
		icon     : <IcMLocation />,
		showType : true,
	},
	zone: {
		icon     : <IcMLocation />,
		showType : true,
	},
	railway_station: {
		icon: <IcMHaulage />,
	},
};
