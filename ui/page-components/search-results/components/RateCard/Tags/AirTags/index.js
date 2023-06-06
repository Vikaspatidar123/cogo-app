import { Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function AirTags({ data }) {
	return (
		<div className={styles.container}>
			{data?.rate_type && data?.rate_type !== 'general' ? (
				<div className={styles.rate_type}>{startCase(data?.rate_type)}</div>
			) : null}

			<Tooltip
				placement="top-end"
				theme="light"
				animation="shift-away"
				content={(
					<li>
						{`Basic freight is ${
							data?.price_type === 'all_in' ? 'inclusive' : 'exclusive'
						} of surcharges`}
					</li>
				)}
			>
				{data?.price_type === 'all_in' ? (
					<div className={styles.alert_message}>All Inclusive</div>
				) : (
					<div className={styles.alert_message}>Net - Net</div>
				)}
			</Tooltip>
		</div>
	);
}

export default AirTags;
