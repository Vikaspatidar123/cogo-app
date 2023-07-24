import React from 'react';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatAmount from '@/ui/commons/utils/formatAmount';

function TotalOutstanding({ statsList = {} }) {
	const { total_outstanding_amount = 0, currency } = statsList;
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<div className={styles.heading_text}>
					Total Outstanding Amount
				</div>
			</div>
			<div className={styles.card}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.orange_image}
					alt="orange rect"
					width={28}
					height={28}
				/>
				<div className={styles.card_box}>
					<div className={styles.card_text}>
						{formatAmount({
							amount: total_outstanding_amount || 0,
							currency,
							options: {
								style: 'currency',
								currencyDisplay: 'code',
								maximumFractionDigits: 0,
							},
						})}
					</div>
					<div className={styles.cash}>
						CASH/BL
					</div>
				</div>
			</div>
		</div>
	);
}

export default TotalOutstanding;
