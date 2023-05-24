import useUpdateCheckoutPromotion from '../../../../../../../hooks/useUpdateCheckoutPromotion';

import styles from './styles.module.css';

function PromocodeThumbnail({
	promotion = {},
	setShowCoupons,
	setCouponApplied,
	refetch,
}) {
	const { updateCheckoutPromotion } = useUpdateCheckoutPromotion();

	const applyPromocode = async () => {
		const applyRes = await updateCheckoutPromotion(promotion.id);
		if (applyRes) {
			await refetch();
			setShowCoupons(false);
			setCouponApplied(true);
		}
	};

	return (
		<div
			role="presentation"
			className={styles.container}
			onClick={applyPromocode}
		>
			<div className={`${styles.banner_image}`} />
			{/* img={promotion.thumbnail_image} */}
			{promotion.promotion_discounts[0].unit === 'percentage' ? (
				<div className={styles.circle_iCon}>
					<div className={styles.discount}>
						{Math.round(promotion.promotion_discounts[0].value)}
						%
						{' '}
						<br />
						<div className={styles.off_text}>Off</div>
					</div>
				</div>
			) : (
				<div className={styles.badge}>
					<div className={styles.discount_amount}>
						{promotion.promotion_discounts[0].amount_currency}
						<div className={`${styles.discount_amount} ${styles.align_left}`}>
							{Math.round(promotion.promotion_discounts[0].value)}
						</div>
						<div className={`${styles.ff_text} ${styles.space_left}`}>Off</div>
					</div>
				</div>
			)}

			<div className={styles.promo_code_description}>
				<div className={styles.offer_desc}>{promotion.thumbnail_description}</div>
			</div>
			<div
				className={styles.text}
			>
				Terms and Conditions Apply
			</div>
			<div
				className={styles.holes_lower}
				// dashedColor={dashedColor}
			/>
			<div className={styles.promo_code}>
				<div className={styles.promo_code_name}>
					{promotion.promocodes[0]?.promocode}
				</div>
			</div>
		</div>
	);
}

export default PromocodeThumbnail;
