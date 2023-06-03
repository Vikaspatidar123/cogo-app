import { IcMAlert, IcMFdetention, IcMFhighCubeContainer } from '@cogoport/icons-react';

const STATS_MAPPING = [
	{
		label : 'On Track',
		value : 'on_track',
		icon  : <IcMFhighCubeContainer width={25} height={25} />,
	},
	{
		label : 'Delay',
		value : 'delay',
		icon  : <IcMFdetention width={25} height={25} />,
	},
	{
		label : 'Action Required',
		value : 'action_required',
		icon  : <IcMAlert width={20} height={20} fill="#F9AE64" />,
	},
];

export default STATS_MAPPING;
