import { IcMShip, IcCLcl, IcCAir, IcCFftl } from '@cogoport/icons-react';

function FCL() {
	return <IcMShip fill="#356EFD" height={20} width={20} />;
}
function LCL() {
	return <IcCLcl height={20} width={20} />;
}
function AIR() {
	return <IcCAir height={20} width={20} />;
}
function FTL() {
	return <IcCFftl height={20} width={20} />;
}

const SEARCH_MAPPING = {
	air_freight: {
		tag      : 'Air',
		icon     : <AIR />,
		type     : 'air',
		iconType : 'air',
		cssLabel : 'air',
	},
	fcl_freight: {
		tag      : 'FCL',
		icon     : <FCL />,
		type     : 'sea',
		iconType : 'ship',
		cssLabel : 'fcl',

	},
	lcl_freight: {
		tag      : 'LCL',
		icon     : <LCL />,
		type     : 'sea',
		iconType : 'ship',
		cssLabel : 'lcl',

	},
	ftl_freight: {
		tag      : 'FTL',
		icon     : <FTL />,
		type     : 'ftl',
		iconType : 'ft',
		cssLabel : 'ftl',
	},
};

export default SEARCH_MAPPING;
