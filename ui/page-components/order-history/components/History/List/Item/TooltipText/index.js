import { Tooltip } from '@cogoport/components';

import styles from './styles.module.css';

function RenderTooltip({ value }) {
	return (
		<div className={styles.container}>
			<Tooltip
				content={(
					<div>
						<div className={styles.text}>{value}</div>
					</div>
				)}
				placement="top"
				theme="light"
			>
				<div className={`${styles.text} ${styles.text_truncate}`}>{value}</div>
			</Tooltip>
		</div>
	);
}

export default RenderTooltip;
