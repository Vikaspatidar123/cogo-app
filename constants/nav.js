import { IcMCampaignTool, IcMDashboard } from '@cogoport/icons-react';
import React from 'react';

export const NAVBAR_CONFIGURATION = {
	nav: [
		{
			icon : <IcMDashboard />,
			name : 'Dashboard',
			href : '/',
		},
		{
			icon    : <IcMCampaignTool />,
			name    : 'Cpq Tools',
			href    : '/cpq-tools',
			options : [
				{
					icon : <IcMCampaignTool />,
					name : 'cpq',
					href : '/cpq-tools',
				},
			],
		},
	],
};
