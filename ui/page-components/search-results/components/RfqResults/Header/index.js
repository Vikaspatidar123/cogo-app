import { BreadCrumbs } from '@cogo/smart-components';
import React from 'react';

import { Container, Title } from './styles';

const breadcrumbs = {
	activeColor     : '#333333',
	descendentColor : '#034AFD',
	array           : [
		{
			name : 'Sales Dashboard',
			href : '/sales/dashboards',
		},
		{
			name : 'RFQ Search',
			href : '/rfq',
		},
		{ name: 'Results' },
	],
	style: {
		fontWeight : 400,
		fontSize   : '12px',
	},
};

function Header({ serial_id = 1, total = 1 }) {
	return (
		<Container>
			<BreadCrumbs
				breadcrumbs={breadcrumbs.array}
				activeColor={breadcrumbs.activeColor}
				descendentColor={breadcrumbs.descendentColor}
				style={breadcrumbs.style}
			/>

			<Title>{`Search: ${serial_id} of ${total}`}</Title>
		</Container>
	);
}

export default Header;
