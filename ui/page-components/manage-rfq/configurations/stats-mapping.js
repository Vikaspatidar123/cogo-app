import { IcMArrowBack } from '@cogoport/icons-react';

export const STATS_MAPPING = [
	{
		title           : 'Total RFQ’s',
		icon            : <IcMArrowBack />,
		value           : 'all',
		backgroundColor : '#FFFCE6',
		color           : 'yellow',
		lineGraph       : <img
			src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/yellow_stats.png"
			alt="cogo"
			className="line-graph-svg"
		/>,
		lineGraphUrl : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/line-graph.svg',
		fill         : '#D6B300',
		stroke       : '#FEF3A6',
	},
	{
		title           : 'Active RFQ’s',
		icon            : <IcMArrowBack />,
		value           : 'live',
		backgroundColor : '#F7FAEF',
		color           : 'green',
		lineGraph       : <img
			src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/line-graph.svg"
			alt="cogo"
			className="line-graph-svg"
		/>,
		lineGraphUrl : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/line-graph.svg',
		fill         : '#12B76A',
		stroke       : '#C9E5E0',
	},
	{
		title           : 'Requested RFQ’s',
		icon            : <IcMArrowBack />,
		value           : 'requested',
		backgroundColor : '#F2F3FA',
		color           : 'purple',
		lineGraph       : <img
			src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/violet_1.png"
			alt="cogo"
			className="line-graph-svg"
		/>,
		lineGraphUrl : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/line-graph.svg',
		fill         : '#7278AD',
		stroke       : '#DCE0FF',
	},
	{
		title           : 'Converted to Contract',
		icon            : <IcMArrowBack />,
		value           : 'contracted',
		backgroundColor : '#FEF3E9',
		color           : 'orange',
		lineGraph       : <img
			src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/orange.png"
			alt="cogo"
			className="line-graph-svg"
		/>,
		lineGraphUrl : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/line-graph.svg',
		fill         : '#C26D1A',
		stroke       : '#FFE0C5',
	},
];
