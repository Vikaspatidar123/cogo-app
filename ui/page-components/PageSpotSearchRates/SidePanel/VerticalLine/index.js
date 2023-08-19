import { IcMLocation, IcM0, IcMOrigin } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const getIcon = (idx, n) => {
	if (!idx) return <IcMOrigin />;
	return idx === n - 1 ? <IcMLocation style={{ transform: 'scale(1.2)' }} /> : <IcM0 />;
};
function VerticalLine({ count }) {
	return (
		<div className={styles.line_container}>
			{[...Array(count).keys()].map((i) => <div key={i} className={styles.nav_icons}>{getIcon(i, count)}</div>)}
			<div className={styles.vertical_line} />
		</div>
	);
}

export default VerticalLine;
