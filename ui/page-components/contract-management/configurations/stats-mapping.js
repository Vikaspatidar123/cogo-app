import { IcMArrowBack, IcMMoney } from '@cogoport/icons-react';
import LineGraph from '../assets/line-graph.svg';

export const STATS_MAPPING = [
	{
		title: 'Live Contracts',
		count: 'active',
		icon: <IcMMoney />,
		percentage: '0%',
		backgroundColor: '#F7FAEF',
		lineGraph: <LineGraph className="line-graph-svg" />,
		fill: '#12B76A',
		stroke: '#C9E5E0',
	},
	{
		title: 'Requested Contracts',
		count: 'pending_approval',
		icon: <IcMArrowBack />,
		percentage: '0%',
		backgroundColor: '#F2F3FA',
		lineGraph: <LineGraph className="line-graph-svg" />,
		fill: '#5481F1',
		stroke: '#AFC8E4',
	},
	{
		title: 'Expired Contracts',
		count: 'expired',
		icon: <IcMArrowBack />,
		percentage: '$0',
		backgroundColor: '#FDEBE9',
		lineGraph: <LineGraph className="line-graph-svg" />,
		fill: '#FB8467',
		stroke: '#F7CDC3',
	},
];
