import React from 'react';

import styles from './styles.module.css';

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
		<div className={styles.container}>
			{/* <BreadCrumbs
				breadcrumbs={breadcrumbs.array}
				activeColor={breadcrumbs.activeColor}
				descendentColor={breadcrumbs.descendentColor}
				style={breadcrumbs.style}
			/> */}

			<div className={styles.title}>{`Search: ${serial_id} of ${total}`}</div>
		</div>
	);
}

export default Header;
