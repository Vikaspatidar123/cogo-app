import React from 'react';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatAmount from '@/ui/commons/utils/formatAmount';

function PaidOnAccount({ statsList }) {
	const { on_account_amount = 0, currency } = statsList;
	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div className={styles.head_text}>
					Paid On Account
				</div>
			</div>
			<div className={styles.card}>
				<div className={styles.box}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.green_image}
						alt="green bar"
						width={28}
						height={28}
					/>
					<div className={styles.paid_card}>
						<div className={styles.paid_card_text}>
							{formatAmount({
								amount: on_account_amount || 0,
								currency,
								options: {
									style: 'currency',
									currencyDisplay: 'code',
									maximumFractionDigits: 0,
								},
							})}
						</div>
						<div className={styles.paid_text}>
							PAID
						</div>
					</div>
				</div>
				<Image
					src={GLOBAL_CONSTANTS.image_url.dollar_url}
					alt="dollar"
					width={42}
					height={42}
				/>
			</div>
		</div>
	);
}

export default PaidOnAccount;
