import { IcMShip, IcCLcl, IcCAir } from '@cogoport/icons-react';

function FCL() {
	return <IcMShip fill="#356EFD" height={20} width={20} />;
}
function LCL() {
	return <IcCLcl height={20} width={20} />;
}
function AIR() {
	return <IcCAir height={20} width={20} />;
}

const SEARCH_MAPPING = {
	air_freight: {
		tag      : 'Air',
		icon     : <AIR />,
		type     : 'air',
		iconType : 'air',
	},
	fcl_freight: {
		tag      : 'FCL',
		icon     : <FCL />,
		type     : 'sea',
		iconType : 'ship',
	},
	lcl_freight: {
		tag      : 'LCL',
		icon     : <LCL />,
		type     : 'sea',
		iconType : 'ship',
	},
};

export default SEARCH_MAPPING;
