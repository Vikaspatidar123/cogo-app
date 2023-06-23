import { Tooltip } from '@cogoport/components';

import styles from './styles.module.css';

function RenderTooltip({ value }) {
	return (
		<div className={styles.container}>
			<Tooltip
				content={(
					<div>
						<text>{value}</text>
					</div>
				)}
				placement="top"
				theme="light"
			>
				<text className={styles.text_truncate}>{value}</text>
			</Tooltip>
		</div>
	);
}

export default RenderTooltip;
