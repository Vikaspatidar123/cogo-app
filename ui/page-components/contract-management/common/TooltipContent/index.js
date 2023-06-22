import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function TooltipContent({
	portName = '',
	portCode = '',
	portDisplayName = '',
}) {
	return (
		<Tooltip
			theme="light-border"
			interactive
			animation="scale"
			placement="top"
			content={<div className={styles.tool_tip_name}>{portDisplayName}</div>}
		>
			<div className={styles.name}>
				<div className={styles.port}>{portName}</div>
				<div className={styles.code}>
					(
					{portCode}
					)
				</div>
			</div>
		</Tooltip>
	);
}

export default TooltipContent;
