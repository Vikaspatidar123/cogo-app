import React from 'react';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import getGeoConstants from '@/ui/commons/constants/geo';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatAmount from '@/ui/commons/utils/formatAmount';

function TotalOutstanding({ statsList = {} }) {
	const geo = getGeoConstants();

	const {
		totalOutstanding,
	} = statsList || {};

	const { ledgerAmount, ledgerCurrency } = totalOutstanding || {};

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
							amount   : ledgerAmount || 0,
							currency : ledgerCurrency || geo.country.currency.code,
							options  : {
								style           : 'currency',
								currencyDisplay : 'code',
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
