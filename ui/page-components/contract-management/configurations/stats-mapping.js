import { IcMArrowBack, IcMMoney } from '@cogoport/icons-react';

export const STATS_MAPPING = [
	{
		title: 'Live Contracts',
		count: 'active',
		icon: <IcMMoney />,
		percentage: '0%',
		backgroundColor: '#F7FAEF',
		lineGraph: <img
			src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/Line.png"
			alt=""
			width="80px"
			height="46px"
		/>,
		fill: '#12B76A',
		stroke: '#C9E5E0',
		className: 'live',
	},
	{
		title: 'Requested Contracts',
		count: 'pending_approval',
		icon: <IcMArrowBack />,
		percentage: '0%',
		backgroundColor: '#F2F3FA',
		lineGraph: <img
			src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/request-line.png"
			alt=""
		/>,
		fill: '#5481F1',
		stroke: '#AFC8E4',
		className: 'request',
	},
	{
		title: 'Expired Contracts',
		count: 'expired',
		icon: <IcMArrowBack />,
		percentage: '$0',
		backgroundColor: '#FDEBE9',
		lineGraph: <img
			src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/expired-line.png"
			alt=""
		/>,
		fill: '#FB8467',
		stroke: '#F7CDC3',
		className: 'expired',
	},
];
