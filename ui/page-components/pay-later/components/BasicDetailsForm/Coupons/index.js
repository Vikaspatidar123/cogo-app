import { Button } from '@cogoport/components';
import { useState } from 'react';

import useGetListCoupons from '../../../hooks/useGetListCoupons';
import useUpdateCreditRequestPromotion from '../../../hooks/useupdateCreditRequestPromotion';

import styles from './styles.module.css';

function Coupons({ getCreditRequestResponse = {} }) {
	const { data, loading } = useGetListCoupons();
	const [action, setAction] = useState('');

	const { list = [] } = data || {};

	const { updateCreditPromotion = () => {} } = useUpdateCreditRequestPromotion({
		setAction,
		getCreditRequestResponse,
	});

	const manageCoupon = ({ type, coupon }) => {
		updateCreditPromotion({ type, coupon });
	};

	return (
		<div className={styles.coupons}>
			{(list || []).map((coupon) => (
				<div className={styles.coupon}>
					<img src={coupon.thumbnail_image} width="auto" height="auto" alt="coupon" />
					<div className={styles.name}>{coupon.name}</div>
					{action !== 'applied'
						? (
							<Button
								onClick={() => manageCoupon({ type: 'applied', coupon })}
								loading={loading}
							>
								Apply Coupon
							</Button>
						)
						: (
							<Button
								onClick={() => manageCoupon({ type: 'removed', coupon })}
								loading={loading}
								themeType="accent"
							>
								Remove Coupon
							</Button>
						)}
				</div>
			))}
		</div>
	);
}

export default Coupons;
