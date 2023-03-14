import { Text, ToolTip } from '@cogoport/components';

import styles from './styles.module.css';

function RenderTooltip({ value }) {
	return (
		<div className={styles.container}>
			<ToolTip
				content={(
					<div>
						<Text>{value}</Text>
					</div>
				)}
				placement="top"
				theme="light"
			>
				<Text className={styles.text_truncate}>{value}</Text>
			</ToolTip>
		</div>
	);
}

export default RenderTooltip;
