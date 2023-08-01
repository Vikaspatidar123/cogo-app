import { format, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatAmount from '@/ui/commons/utils/formatAmount';

const TWO_INDEX = 2;

function ToolTipComponent({ point, data, currency }) {
	const date = format(point?.data?.x, 'yyyy-MM-dd');

	const newData = (data || []).map((item) => ({
		[item.id]: item.data.filter((y) => y?.x === date)?.[GLOBAL_CONSTANTS.zeroth_index]?.y.toFixed(TWO_INDEX),
	}));

	return (
		<div className={styles.styled_tip}>
			<div className={styles.date}>{date}</div>

			<div className={styles.data}>
				{newData.map((info, index) => {
					const keys = Object.keys(info);
					const className = `horizontal${index + 1}`;

					return (
						<div className={styles.line} key={className}>
							<div className={`${styles?.[className]}`} />
							<div className={styles.value}>
								{formatAmount({
									amount  : info?.[keys],
									currency,
									options : {
										notation              : 'standard',
										style                 : 'currency',
										maximumFractionDigits : 1,
									},
								})}
							</div>
							<div className={styles.text}>{startCase(keys)}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default ToolTipComponent;
