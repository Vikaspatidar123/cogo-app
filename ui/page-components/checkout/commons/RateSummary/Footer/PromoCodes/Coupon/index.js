import { IcMPromotions } from '@cogoport/icons-react';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function ApplyCoupon({ isCouponApplied, promotion = {}, setShowCoupons }) {
	if (!isCouponApplied || promotion.codes === undefined) {
		return null;
	}

	return (
		<div className={styles.container}>
			<IcMPromotions />
			<div className={styles.promo_code_content}>
				<div className={styles.card_div}>
					<div className={styles.promo_code_title}>{promotion.codes[0]?.promocode}</div>
					<div className={styles.flex_div}>
						<div
							className={styles.change_link}
							role="presentation"
							onClick={() => setShowCoupons(true)}
						>
							Change

						</div>
					</div>
				</div>

				<div className={styles.promo_code_caption}>

					{formatAmount({
						amount   : promotion.total_discount,
						currency : promotion.currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 0,
						},
					})}
					off applied with this promocode successfully
				</div>
			</div>
		</div>
	);
}
export default ApplyCoupon;
