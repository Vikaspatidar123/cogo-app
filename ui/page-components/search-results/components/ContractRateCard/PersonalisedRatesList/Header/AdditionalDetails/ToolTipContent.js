import React from 'react';

import styles from './styles.module.css';

function ToolTipContent({ leftPincodes }) {
	return (
		<>
			{(leftPincodes || []).map((item = {}) => (
				<div className={styles.location_div}>
					<div className={styles.dot} />
					{item.display_name}
				</div>
			))}
		</>
	);
}

export default ToolTipContent;
