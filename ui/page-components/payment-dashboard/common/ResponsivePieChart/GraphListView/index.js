import { cl } from '@cogoport/components';
import { IcMArrowRotateUp } from '@cogoport/icons-react';

import styles from './styles.module.css';

import getGeoConstants from '@/ui/commons/constants/geo';
import formatAmount from '@/ui/commons/utils/formatAmount';

const geo = getGeoConstants();

function GraphListView({ isKamWise, isSortBy, setIsSortBy, sortedData }) {
	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<div className={cl`${styles.row} ${styles.styled_row}`}>
					<div className={styles.styled_col}>
						<div className={styles.heading}>{isKamWise ? 'Due In' : 'Shipment Type'}</div>
					</div>
					<div className={styles.styled_col}>
						<div
							role="presentation"
							className={styles.show_cursor}
							onClick={() => setIsSortBy((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
						>
							<IcMArrowRotateUp
								className={styles.arrow_icon}
								style={{ transform: `${isSortBy === 'asc' ? 'rotate(180deg)' : 'rotate(0)'}` }}
							/>
							{isKamWise ? 'Total Outstanding Amt' : 'Total Open Invoice Amt'}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.wrapper}>
				{(sortedData || []).map((item) => (
					<div className={styles.styled_row}>
						<div className={styles.styled_row}>
							<div className={styles.title}>{item.sub_label}</div>
						</div>
						<div className={styles.styled_row}>
							<div className={styles.amount}>
								{formatAmount({
									amount   : item.value || 0,
									currency : geo.country.currency.code,
									options  : {
										style                 : 'currency',
										currencyDisplay       : 'code',
										maximumFractionDigits : 0,
									},
								})}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default GraphListView;
