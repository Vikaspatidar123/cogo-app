import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function ToolTipComponent({ point, data }) {
	const date = point?.data?.xFormatted;

	const newData = (data || []).map((item) => ({
		[item.id]: item.data.filter((info) => info.x === date)?.[0]?.y.toFixed(2),
	}));

	return (
		<div className={styles.styled_tip}>
			<div className={styles.text}>{date}</div>

			<div className={styles.data}>
				{newData.map((info, index) => {
					const keys = Object.keys(info);
					const className = `horizontal${index + 1}`;
					return (
						<div className={styles.line}>
							<div className={`${styles?.[className]}`} />
							<div>{info?.[keys]}</div>
							<div className={styles.text}>{startCase(keys)}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default ToolTipComponent;
