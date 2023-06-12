import { useState } from 'react';

import ApplyCoupon from './ApplyCoupon';
import Coupon from './Coupon';
import styles from './styles.module.css';

function Promocodes({ refetch, promotions = [] }) {
	const [showCoupons, setShowCoupons] = useState(false);
	const appliedPromotion = (promotions || []).find(
		(x) => x.consumption_mode === 'manual',
	);

	const [isCouponApplied, setCouponApplied] = useState(
		appliedPromotion?.id !== undefined,
	);

	return (
		<div className={styles.container}>
			<Coupon
				isCouponApplied={isCouponApplied}
				setCouponApplied={setCouponApplied}
				refetch={refetch}
				promotion={appliedPromotion}
				setShowCoupons={setShowCoupons}
			/>

			<ApplyCoupon
				isCouponApplied={isCouponApplied}
				setCouponApplied={setCouponApplied}
				refetch={refetch}
				showCoupons={showCoupons}
				setShowCoupons={setShowCoupons}
				appliedPromotion={appliedPromotion}
			/>
		</div>
	);
}

export default Promocodes;
