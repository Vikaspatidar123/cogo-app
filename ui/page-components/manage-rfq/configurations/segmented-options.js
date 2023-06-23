import { IcCFcl, IcCLcl, IcCAir } from '@cogoport/icons-react';

const options = [
	{
		label           : 'FCL',
		backgroundColor : '#DB4634',
		value           : 'fcl_freight',
		color           : '#000',
		icon            : <IcCFcl height={20} width={20} />,
	},
	{
		label           : 'LCL',
		backgroundColor : '#DB4634',
		value           : 'lcl_freight',
		color           : '#000',
		icon            : <IcCLcl height={20} width={20} />,
	},
	{
		label           : 'AIR',
		backgroundColor : '#DB4634',
		value           : 'air_freight',
		color           : '#000',
		icon            : <IcCAir height={20} width={20} />,
	},
];

export default options;
