import { Button } from '@cogoport/components';
import { useState } from 'react';

import useGetListCoupons from '../../../hooks/useGetListCoupons';
import useUpdateCreditRequestPromotion from '../../../hooks/useupdateCreditRequestPromotion';

import styles from './styles.module.css';

import { Image } from '@/packages/next';

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
				<div className={styles.coupon} key={coupon.name}>
					<img src={coupon.thumbnail_image} width="30px" height="30px" alt="coupon" />
					<div className={styles.name}>{coupon.name}</div>
					{action !== 'applied'
						? (
							<Button
								type="button"
								onClick={() => updateCreditPromotion({ type: 'applied', coupon })}
								loading={loading}
							>
								Apply Coupon
							</Button>
						)
						: (
							<Button
								type="button"
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
