import { format } from '@cogoport/utils';

import styles from './styles.module.css';

function ToolTipComponent({ point, data }) {
	const date = format(point?.data?.x, 'yyyy-MM-dd');
	const newData = (data || []).map((x) => ({
		[x.id]: x.data.filter((y) => y.x === date)?.[0]?.y.toFixed(2),
	}));

	return (
		<div className={styles.styled_tip}>
			<div className={styles.text}>{date}</div>
			<div className={styles.data}>
				<div className={styles.line}>
					<div className={styles.horizontal1} />
					<div>{newData[0]?.Max}</div>
					<div className={styles.text}>Max</div>
				</div>
				<div className={styles.line}>
					<div className={styles.horizontal2} />
					<div>{newData[1]?.Min}</div>
					<div className={styles.text}>Min</div>
				</div>
				<div className={styles.line}>
					<div className={styles.horizontal3} />
					<div>{newData[2]?.Avg}</div>
					<div className={styles.text}>Avg</div>
				</div>
			</div>
		</div>
	);
}

export default ToolTipComponent;
