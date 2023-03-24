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
				<Button onClick={applyCoupon}>
					<IcMPromotions />
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
