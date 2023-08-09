import { Button } from '@cogoport/components';
import { useState } from 'react';

import useGetListCoupons from '../../../hooks/useGetListCoupons';
import useUpdateCreditRequestPromotion from '../../../hooks/useupdateCreditRequestPromotion';

import styles from './styles.module.css';

import { Image } from '@/packages/next';

function Coupons({ getCreditRequestResponse = {} }) {
	const { data, loading } = useGetListCoupons({ getCreditRequestResponse });

	const [action, setAction] = useState({});

	const { list = [] } = data || {};

	const { updateCreditPromotion = () => {} } = useUpdateCreditRequestPromotion({
		setAction,
		getCreditRequestResponse,
	});
	const handleUpdateAction = ({ type, coupon }) => {
		const req = { type, coupon };
		const resp = updateCreditPromotion(req);
		if (resp) {
			setAction({ type, id: type === 'removed' ? '' : coupon.id });
		}
	};

	return (
		<div className={styles.coupons}>
			{(list || []).map((coupon) => (
				<div className={styles.coupon_box} key={coupon.name}>
					<Image
						src={coupon?.thumbnail_image}
						width={50}
						height={80}
						className={styles.coupon_image}
					/>
					<div className={styles.coupon_text}>
						{coupon?.name}
					</div>
					{action.type !== 'applied' && action.id !== coupon.id
						&& (
							<Button
								type="button"
								onClick={() => handleUpdateAction({ type: 'applied', coupon })}
								loading={loading}
							>
								Apply Coupon
							</Button>
						)}
					{action.type === 'applied' && action.id === coupon.id && (
						<Button
							type="button"
							onClick={() => handleUpdateAction({ type: 'removed', coupon })}
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
