import styles from './styles.module.css';

function PromocodeThumbnail({ promotion = {}, promotion_discount = [] }) {
	return (
		<div className={styles.container}>
			<div className={styles.banner_image} img={promotion.thumbnail_image}>
				<div className={styles.promo_code_name}>{promotion.promocodes[0]?.promocode}</div>
			</div>

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
		</div>
	);
}

export default PromocodeThumbnail;
