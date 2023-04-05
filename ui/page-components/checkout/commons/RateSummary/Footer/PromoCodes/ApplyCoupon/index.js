import { Button } from '@cogoport/components';
import { IcMPromotions } from '@cogoport/icons-react';

import PromocodesModal from './PromocodesModal';
import styles from './styles.module.css';

function ApplyCoupon({
	isCouponApplied,
	setCouponApplied,
	refetch,
	showCoupons,
	setShowCoupons,
	appliedPromotion,
}) {
	const applyCoupon = () => {
		setShowCoupons(true);
	};

	return (
		<>
			{!isCouponApplied && (
				<Button className={styles.button} size="md" themeType="secondary" onClick={applyCoupon}>
					<IcMPromotions width={20} height={20} />
					<div className={styles.text} role="presentation" onClick={applyCoupon}>Apply Coupon</div>
				</Button>
			)}

			{showCoupons && (
				<PromocodesModal
					showCoupons={showCoupons}
					refetch={refetch}
					setShowCoupons={setShowCoupons}
					setCouponApplied={setCouponApplied}
					isCouponApplied={isCouponApplied}
					appliedPromotion={appliedPromotion}
				/>
			)}
		</>
	);
}
export default ApplyCoupon;
