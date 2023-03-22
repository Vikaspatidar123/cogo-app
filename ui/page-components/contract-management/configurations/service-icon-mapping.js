import {
	IcCLcl,
	IcCAir,
	IcMFftl,
	IcMFltl,
	IcMShip,
} from '@cogoport/icons-react';

const commonProps = {
	width: 18,
	height: 18,
};
export const SERVICE_ICON_MAPPING = {
	fcl_freight: <IcMShip {...commonProps} fill="#436DF4" />,
	lcl_freight: <IcCLcl {...commonProps} />,
	air_freight: <IcCAir {...commonProps} />,
	ftl_freight: <IcMFftl {...commonProps} />,
	ltl_freight: <IcMFltl {...commonProps} />,
};
