import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function PromocodeThumbnail({ promotion = {}, promotion_discount = [] }) {
	return (
		<div className={styles.container}>
			<img className={styles.banner_image} src={promotion.thumbnail_image} alt="" />

			{promotion_discount.unit === 'percentage' ? (
				<div className={styles.circle_icon}>
					<div className={styles.discount}>
						{Math.round(promotion_discount.value)}
						%
					</div>
				</div>
			) : (
				<div className={styles.badge}>
					<div className={styles.discount_amount}>
						{Math.round(promotion_discount.value)}
						{' '}
						{promotion_discount.amount_currency}
					</div>
				</div>
			)}
			<div className={styles.promo_code_description}>
				{promotion.thumbnail_description}
			</div>

			<div className={styles.promo_code_name}>{promotion.codes?.[GLOBAL_CONSTANTS.zeroth_index]?.promocode}</div>

		</div>
	);
}

export default PromocodeThumbnail;
