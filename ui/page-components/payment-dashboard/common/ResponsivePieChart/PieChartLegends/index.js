import { Tooltip, cl } from '@cogoport/components';

import styles from './styles.module.css';

import getGeoConstants from '@/ui/commons/constants/geo';
import formatAmount from '@/ui/commons/utils/formatAmount';

function PieChartLegends({ data, isKamWise, colors }) {
	const geo = getGeoConstants();
	return (
		<div className={styles.over_flow_wrapper}>
			{(data || []).map((item, index) => (
				<Tooltip
					placement="left"
					content={(
						<div className={styles.title}>
							{isKamWise
								? 'Total Outstanding Amount'
								: 'Total Open Invoice Amount'}
							:
							<div className={styles.amount}>
								{formatAmount({
									amount   : item.value || 0,
									currency : geo.country.currency.code,
									options  : {
										style                 : 'currency',
										currencyDisplay       : 'symbol',
										maximumFractionDigits : 0,
									},
								})}
							</div>
						</div>
					)}
				>
					<div className={cl`${styles.title} ${styles.space_bottom}`}>
						<div
							className={styles.color_dot}
							style={{ background: `${colors[index] || '#5936f0'}` }}
						/>
						{item.label}
					</div>
				</Tooltip>
			))}
		</div>
	);
}

export default PieChartLegends;
