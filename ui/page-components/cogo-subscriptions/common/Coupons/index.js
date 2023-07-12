import { Tooltip, Button, Input } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useGetListCoupons from '../../hooks/useGetListCoupons';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function Coupons({
	couponCode = {},
	setCouponCode = () => { },
	amount = 0,
	currency = '',
	setShowCoupons = () => { },
	handleClick = {},
}) {
	const { t } = useTranslation(['subscriptions']);

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
				<div className={styles.header_text}>{t('subscriptions:promo_codes_text')}</div>
				<IcMCross height={20} width={20} className={styles.cross_icon} onClick={() => setShowCoupons(false)} />
			</div>

			<div className={styles.search_div}>
				<Input
					size="md"
					value={couponCode?.name}
					placeholder={t('subscriptions:promo_code_placeholder')}
					onChange={(e) => setQuery(e)}
					className={styles.search_coupon}
				/>

				<Button
					size="lg"
					className={styles.apply_btn}
					onClick={handleApplyCoupon}
					type="button"
				>
					{t('subscriptions:apply_text')}
				</Button>
			</div>
			<div className={styles.coupons_wrapper}>
				{fetchCouponsLoading ? (
					<div className={styles.empty_state}>
						<Image
							src={GLOBAL_CONSTANTS.image_url.loading}
							alt={t('subscriptions:loading_text')}
							width={50}
							height={50}
						/>
					</div>
				) : (couponsList || []).map((item) => {
					const { promotion_discounts = {}, thumbnail_image = '' } = item || {};

					const amountCurrency = promotion_discounts?.[GLOBAL_CONSTANTS.zeroth_index]?.amount_currency;

					return (
						<div className={styles.background_image} key={item?.id}>
							<div className={styles.wrapper}>
								<div className={styles.coupons}>
									<div className={styles.coupon_offer}>
										<div className={styles.coupon_image_container}>
											<img
												src={thumbnail_image}
												alt={t('subscriptions:cogo_text')}
												className={styles.coupon_image}
											/>
										</div>
										<div className={styles.coupon_text}>
											<div className={styles.coupon}>
												<div className={styles.flat}>{t('subscriptions:flat_text')}</div>
												<div className={styles.offer}>
													{promotion_discounts?.[GLOBAL_CONSTANTS.zeroth_index]?.unit
														=== 'flat'
														&& `${amountCurrency} `}
													{promotion_discounts?.[GLOBAL_CONSTANTS.zeroth_index]?.value}
													{promotion_discounts?.[GLOBAL_CONSTANTS.zeroth_index]?.unit
														=== 'percentage'
														&& ' %'}
													<div className={styles.off}>

														{t('subscriptions:off_code_text')}

													</div>
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
														{t('subscriptions:terms_conditions_text')}
													</div>
												</div>
											</Tooltip>
										</div>
									</div>
								</div>
								<div className={styles.holes_lower} />
								<div className={styles.button}>
									<div>
										<span className={styles.lable}>
											{t('subscriptions:code_text')}
											:
											{' '}
										</span>
										<span className={styles.code}>
											{item?.promocodes[GLOBAL_CONSTANTS.zeroth_index]?.promocode}
										</span>
									</div>
									<Button
										size="md"
										type="button"
										themeType="accent"
										role="presentation"
										className="couponButton"
										onClick={() => {
											setShowCoupons(false);
											setCouponCode(item);
											handleClick({ value: 'apply', item });
										}}
									>
										{t('subscriptions:apply_text')}
									</Button>
								</div>
							</div>
						</div>
					);
				})}
				{!fetchCouponsLoading && isEmpty(couponsList) ? (
					<div className={styles.empty_state}>
						<Image
							src={GLOBAL_CONSTANTS.image_url.empty_sub_image}
							alt={t('subscriptions:loading_text')}
							height={200}
							width={200}
						/>
						{t('subscriptions:no_coupons_text')}
					</div>
				) : null}
			</div>
		</>
	);
}

export default Coupons;
