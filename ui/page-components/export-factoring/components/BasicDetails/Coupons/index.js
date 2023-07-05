import { Button } from '@cogoport/components';
import { useState } from 'react';

import useGetListCoupons from '../../../hooks/useGetListCoupons';
import useUpdateCreditRequestPromotion from '../../../hooks/useupdateCreditRequestPromotion';

import styles from './styles.module.css';

function Coupons({ getCreditRequestResponse = {} }) {
	const { data, loading } = useGetListCoupons({ getCreditRequestResponse });

	const [action, setAction] = useState('');

	const { list = [] } = data || {};

	const { updateCreditPromotion = () => {} } = useUpdateCreditRequestPromotion({
		setAction,
		getCreditRequestResponse,
	});

	return (
		<div className={styles.coupons}>
			{(list || []).map((coupon) => (
				<div className={styles.coupon}>
					<img src={coupon.thumbnail_image} width="auto" height="auto" alt="coupon" />
					<div className={styles.name}>{coupon.name}</div>
					{action !== 'applied'
						? (
							<Button
								onClick={() => updateCreditPromotion({ type: 'applied', coupon })}
								loading={loading}
							>
								Apply Coupon
							</Button>
						)
						: (
							<Button
								onClick={() => updateCreditPromotion({ type: 'removed', coupon })}
								loading={loading}
								themeType="secondary"
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
