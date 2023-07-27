import { format } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatAmount from '@/ui/commons/utils/formatAmount';

const ONE_INDEX = 1;
const TWO_INDEX = 2;

function ToolTipComponent({ point, data, currency }) {
	const { t } = useTranslation(['frt']);
	const date = format(point?.data?.x, 'yyyy-MM-dd');
	const newData = (data || []).map((item) => ({
		[item.id]: item.data.filter((y) => y?.x === date)?.[GLOBAL_CONSTANTS.zeroth_index]?.y.toFixed(TWO_INDEX),
	}));

	return (
		<div className={styles.styled_tip}>
			<div className={styles.date}>{date}</div>
			<div className={styles.data}>
				<div className={styles.line}>
					<div className={styles.horizontal1} />
					<div className={styles.value}>
						{formatAmount({
							amount  : newData[GLOBAL_CONSTANTS.zeroth_index]?.Max,
							currency,
							options : {
								notation              : 'standard',
								style                 : 'currency',
								maximumFractionDigits : 1,
							},
						})}
					</div>
					<div className={styles.text}>{t('frt:chart_max')}</div>
				</div>
				<div className={styles.line}>
					<div className={styles.horizontal2} />
					<div className={styles.value}>
						{formatAmount({
							amount  : newData[ONE_INDEX]?.Min,
							currency,
							options : {
								notation              : 'standard',
								style                 : 'currency',
								maximumFractionDigits : 1,
							},
						})}
					</div>
					<div className={styles.text}>{t('frt:chart_min')}</div>
				</div>
				<div className={styles.line}>
					<div className={styles.horizontal3} />
					<div className={styles.value}>
						{formatAmount({
							amount  : newData[TWO_INDEX]?.Avg,
							currency,
							options : {
								notation              : 'standard',
								style                 : 'currency',
								maximumFractionDigits : 1,
							},
						})}
					</div>
					<div className={styles.text}>{t('frt:chart_avg')}</div>
				</div>
			</div>
		</div>
	);
}

export default ToolTipComponent;
