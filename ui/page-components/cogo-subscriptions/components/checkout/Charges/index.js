import {
	Button,
	Toast, Checkbox, Datepicker, Tooltip,
} from '@cogoport/components';
import { IcMArrowNext, IcMHelpInCircle, IcCFtick } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import Coupons from '../../../common/Coupons';
import {
	getAmount, MIN_DATE,
	MAX_DATE,
} from '../../../constants/dimensions';
import useUpdateSaasCheckout from '../../../hooks/useUpdateSaasCheckout';
import { getCurrencyDetail } from '../../../utils/getCurrencyDetail';

import DiscountTooltip from './DiscountTooltip';
import styles from './styles.module.css';

import { Image } from '@/packages/next';
import getGeoConstants from '@/ui/commons/constants/geo';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function Description() {
	const { t } = useTranslation(['subscriptions']);
	return (
		<div className={styles.tooltip_ctn}>
			{t('subscriptions:description_text')}
		</div>
	);
}

function Charges({
	plans,
	query,
	checked,
	completeOrder,
	completeOrderLoading,
	checkoutResponse,
	datePickerValue,
	setDatePickerValue,
}) {
	const { plan = {}, pricing = {}, allow_activate_later = false } = plans || {};

	const { t } = useTranslation(['subscriptions']);

	const [check, setCheck] = useState(false);

	const [showCoupons, setShowCoupons] = useState(false);

	const loading = checkoutResponse?.errors || completeOrderLoading;

	const geo = getGeoConstants();
	const { is_tax_included } = geo.others.navigations.subscription;

	const {
		applyPromoCode, promoCodeData, couponCode, setCouponCode,
	} = useUpdateSaasCheckout({
		checkoutResponse,
	});
	const { discount_amount: discountedAmount, total_amount: totalAmount } = promoCodeData || {};

	const {
		amount_currency = '',
		unit = '',
		value: couponValue = '',
	} = couponCode?.promotion_discounts?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const handleClick = ({ value, item }) => {
		applyPromoCode({ value, item });
	};

	const submit = () => {
		if (!isEmpty(checked)) {
			completeOrder({ couponCode });
		} else {
			Toast.error(t('subscriptions:adderss_select_error_message'));
		}
	};

	let periods;
	if (query?.period === 'monthly') {
		periods = 'month';
	} else periods = 'year';
	const { amount, currency, preValue } = getCurrencyDetail({
		pricing,
		periods,
	});

	const crossedAmount = plan?.metadata?.display_pricing?.[`${query?.period}`]?.[preValue];
	return (
		<div>
			<div className={styles.wrapper}>
				<div className={styles.label}>
					{t('subscriptions:summary_text')}
				</div>
			</div>
			<div className={styles.div}>
				<div className={styles.styled_row}>
					{is_tax_included ? (
						<div className={styles.styled_col}>
							<div>
								{plan?.description}
								<div className={styles.gst}>
									(
									{t('subscriptions:gst_included_text')}
									)
								</div>
							</div>
						</div>
					) : null}
					<div className={styles.styled_col2}>
						{plan?.metadata?.display_pricing?.[`${query?.period}`]
							?.prev_value_inr ? (
								<div className={`${styles.crossed_price} ${styles.crossedprice}`}>
									<div className={styles.flex_div}>
										{getAmount({ amount: crossedAmount, currency })}
									</div>
								</div>
							) : null}
						<div className={styles.flex_div}>
							{getAmount({ amount, currency })}
						</div>
					</div>
				</div>
				<div className={styles.line_wrapper}>
					<div className={styles.line} />
				</div>

				{!isEmpty(couponCode) ? (
					<div className={styles.styled_row}>
						<div className={`${styles.styled_col} ${styles.discount_name}`}>
							<Tooltip
								placement="top-start"
								content={<DiscountTooltip discountedAmount={discountedAmount} currency={currency} />}
								animation="scale"
								interactive
								visibility
							>
								<div>
									{t('subscriptions:discount_text')}
									<div className={`${styles.line_wrapper} ${styles.discount_line}`}>
										<div className={`${styles.line} ${styles.discount_dashed_line}`} />
									</div>
								</div>
							</Tooltip>
						</div>
						<div className={`${styles.discount_name} ${styles.price}`}>
							-
							{getAmount({ amount: discountedAmount, currency })}
						</div>
					</div>
				) : null}

				<div className={styles.input_wrapper}>
					{isEmpty(couponCode) ? (
						<div>
							{t('subscriptions:coupon_code_text')}
						</div>
					) : (
						<div className={styles.code_wrapper}>
							<div>
								<IcCFtick />
							</div>
							<div className={styles.applied_coupon}>
								<div>
									{t('subscriptions:code_text')}
									{couponCode?.promocodes?.[GLOBAL_CONSTANTS.zeroth_index]?.promocode?.toUpperCase()}
									{t('subscriptions:applied_text')}
								</div>
								<div className={styles.discount}>

									{unit === 'flat' && amount_currency}

									{couponValue}

									{unit === 'percentage' && '%'}

									{t('subscriptions:off_code_text')}

								</div>
							</div>
						</div>
					)}
					<div>
						{isEmpty(couponCode) ? (
							<div
								className={styles.applycoupon}
								onClick={() => setShowCoupons(true)}
								role="presentation"
							>
								{t('subscriptions:apply_text')}
							</div>
						) : (
							<div
								className={styles.removecoupon}
								onClick={() => {
									setCouponCode({});
									handleClick({ value: 'remove' });
								}}
								role="presentation"
							>
								{t('subscriptions:remove_text')}
							</div>
						)}
					</div>
				</div>
				<div className={styles.line_wrapper}>
					<div className={styles.line} />
				</div>

				<div className={styles.styled_row}>
					<div className={`${styles.styled_col} ${styles.total}`}>
						<div>{t('subscriptions:total_text')}</div>
					</div>
					<div className={`${styles.styled_col} ${styles.price}`}>
						{getAmount({ amount: !isEmpty(couponCode) ? totalAmount : amount, currency })}
					</div>
				</div>

				<div className={styles.activate_later_ctn}>
					<div className={styles.activate_later_text_check_box}>
						<Checkbox
							label={(
								<div className={styles.checkbox_label_content}>
									<div className={styles.activate_later_txt}>
										{t('subscriptions:activate_later_text')}
									</div>
									<Tooltip
										placement="top"
										content={<Description />}
										animation="scale"
										maxWidth={350}
										interactive
									>
										<div className={styles.icon_container}>
											<IcMHelpInCircle />
										</div>
									</Tooltip>
								</div>
							)}
							checked={check}
							onChange={(e) => setCheck(e.target.checked)}
							disabled={!allow_activate_later}
							value={check}
						/>
					</div>
					{check ? (
						<Datepicker
							showTimeSelect={false}
							minDate={MIN_DATE}
							maxDate={MAX_DATE}
							onChange={setDatePickerValue}
							value={datePickerValue}
						/>
					) : null}
				</div>
				<div className={styles.button_wrapper}>
					<Button
						onClick={submit}
						disabled={loading}
					>
						{completeOrderLoading ? (
							<Image
								src={GLOBAL_CONSTANTS.image_url.loading}
								alt={t('subscriptions:loading_text')}
								width={20}
								height={20}
							/>
						) : (
							<>
								{t('subscriptions:proceed_to_pay_text')}
								<IcMArrowNext className={styles.icon} />
							</>
						)}
					</Button>
				</div>
			</div>
			<div
				className={`${styles.coupon_container} ${showCoupons ? styles.show : styles.hide}`}
			>
				{showCoupons ? (
					<Coupons
						showCoupons={showCoupons}
						couponCode={couponCode}
						setCouponCode={setCouponCode}
						amount={amount}
						currency={currency}
						setShowCoupons={setShowCoupons}
						handleClick={handleClick}
					/>
				) : null}
			</div>
		</div>
	);
}

export default Charges;
