import { Tooltip, Button, Input } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import { urls } from '../../constants/dimensions';
import useGetListCoupons from '../../hooks/useGetListCoupons';

import styles from './styles.module.css';

function Coupons({
	couponCode = {},
	setCouponCode = () => {},
	amount = 0,
	currency = '',
	setShowCoupons = () => {},
	handleClick = {},
}) {
	const { loadingUrl, emptyUrl } = urls || {};

	const {
		fetchCouponsLoading = false,
		couponsList,
		setFilters,
	} = useGetListCoupons({
		amount,
		currency,
	});
	const [query, setQuery] = useState('');
	const termsConditionsContent = ({ item = {} }) => (
		<ul className={styles.list_wrapper}>
			{(item?.terms_and_conditions || []).map((tc) => (
				<li className={styles.list}>{startCase(tc)}</li>
			))}
		</ul>
	);

	const handleApplyCoupon = () => {
		if (query !== '') {
			setFilters({ q: query });
		}
	};

	return (
		<>
			<div className={styles.header_container}>
				<div className={styles.header_text}>Promo codes</div>
				<IcMCross height={20} width={20} className={styles.cross_icon} onClick={() => setShowCoupons(false)} />
			</div>

			<div className={styles.search_div}>
				<Input
					size="md"
					value={couponCode?.name}
					placeholder="Enter Promo code here...."
					onChange={(e) => setQuery(e)}
					className={styles.search_coupon}
				/>

				<Button
					size="lg"
					className={styles.apply_btn}
					onClick={handleApplyCoupon}
				>
					Apply
				</Button>
			</div>
			<div className={styles.coupons_wrapper}>
				{fetchCouponsLoading && (
					<div className={styles.empty_state}>
						<img src={loadingUrl} alt="" width={50} height={50} />
					</div>
				)}
				{!fetchCouponsLoading
					&& (couponsList || []).map((item) => (
						<div className={styles.background_image}>
							<div className={styles.wrapper}>
								<div className={styles.coupons}>
									<div className={styles.coupon_offer}>
										<div className={styles.coupon_image_container}>
											<img
												src={item?.thumbnail_image}
												alt="coupon"
												className={styles.coupon_image}
											/>
										</div>
										<div className={styles.coupon_text}>
											<div className={styles.coupon}>
												<div className={styles.flat}>FLAT</div>
												<div className={styles.offer}>
													{item?.promotion_discounts?.[0]?.unit === 'flat'
															&& `${item?.promotion_discounts?.[0]?.amount_currency} ` }
													{item?.promotion_discounts?.[0]?.value}
													{item?.promotion_discounts?.[0]?.unit === 'percentage'
																&& ' %'}
													<div className={styles.off}>OFF</div>
												</div>
											</div>
											<div
												className={styles.description}
											>
												{item?.description?.toUpperCase()}
											</div>

											<Tooltip
												placement="right"
												interactive={false}
												content={termsConditionsContent({ item })}
											>
												<div>
													<div
														className={styles.conditions}
													>
														Terms and conditions apply
													</div>
												</div>
											</Tooltip>
										</div>
									</div>
								</div>
								<div className={styles.holes_lower} />
								<div className={styles.button}>
									<div>
										<span className={styles.lable}>Code: </span>
										<span className={styles.code}>{item?.promocodes[0]?.promocode}</span>
									</div>
									<Button
										size="md"
										themeType="accent"
										role="presentation"
										className="couponButton"
										onClick={() => {
											setShowCoupons(false);
											setCouponCode(item);
											handleClick({ value: 'apply', item });
										}}
									>
										Apply
									</Button>
								</div>
							</div>
						</div>
					))}
				{!fetchCouponsLoading && (couponsList?.length === 0 || !couponsList) && (
					<div className={styles.empty_state}>
						<img src={emptyUrl} alt="" height="200px" width="200px" />
						No coupons available
					</div>
				)}
			</div>
		</>
	);
}

export default Coupons;
