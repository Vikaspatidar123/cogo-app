import {
	Button,
	Toast, Checkbox, Datepicker, Tooltip,
} from '@cogoport/components';
import { IcMArrowNext, IcMHelpInCircle, IcCFtick } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import Coupons from '../../../common/Coupons';
import useUpdateSaasCheckout from '../../../hooks/useUpdateSaasCheckout';
import { getCurrencyDetail } from '../../../utils/getCurrencyDetail';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatAmount from '@/ui/commons/utils/formatAmount';

const description = ({ t }) => (
	<div className={styles.tooltip_ctn}>
		{t('subscriptions:description_text')}
	</div>
);

const discountTooltip = ({ discountedAmount, currency, t }) => (
	<div className={styles.discount_content}>
		<div className={styles.heading}>
			{t('subscriptions:total_discount_text')}
			:
		</div>
		<div className={styles.content}>
			<div>{t('subscriptions:coupons_discount_text')}</div>
			<div>
				-
				{formatAmount({
					amount: discountedAmount,
					currency,
					options: {
						notation: 'standard',
						style: 'currency',
					},
				})}
			</div>
		</div>
	</div>
);

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

	const {
		applyPromoCode, promoCodeData, couponCode, setCouponCode,
	} = useUpdateSaasCheckout({
		checkoutResponse,
	});

	const { discount_amount: discountedAmount, total_amount: totalAmount } = promoCodeData || {};

	const couponCodeLength = Object.keys(couponCode)?.length;

	const amountCurrency = couponCode?.promotion_discounts?.[GLOBAL_CONSTANTS.zeroth_index]?.amount_currency;

	const handleClick = ({ value, item }) => {
		applyPromoCode({ value, item });
	};

	const submit = () => {
		if (checked.length !== 0) {
			completeOrder({ couponCode });
		} else {
			Toast.error(t('subscriptions:adderss_select_error_message'), {
				autoClose: 5000,
				style: { background: '#FFD8D8', color: '#000' },
			});
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

	const now = new Date();

	const minDate = new Date(now.setDate(now.getDate() + 1));
	const maxDate = new Date(now.setMonth(now.getMonth() + 2));

	return (
		<div>
			<div className={styles.wrapper}>
				<div className={styles.label}>
					{t('subscriptions:summary_text')}
				</div>
			</div>
			<div className={styles.div}>
				<div className={styles.styled_row}>
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
					<div className={styles.styled_col2}>
						{plan?.metadata?.display_pricing?.[`${query?.period}`]
							?.prev_value_inr && (
								<div className={`${styles.crossed_price} ${styles.crossedprice}`}>
									<div className={styles.flex_div}>
										{formatAmount({
											amount: crossedAmount,
											currency,
											options: {
												notation: 'standard',
												style: 'currency',
											},
										})}
										{
										}
									</div>
								</div>
							)}
						<div className={styles.flex_div}>
							{formatAmount({
								amount,
								currency,
								options: {
									notation: 'standard',
									style: 'currency',
								},
							})}
						</div>
					</div>
				</div>
				<div className={styles.line_wrapper}>
					<div className={styles.line} />
				</div>

				{couponCodeLength > 0 ? (
					<div className={styles.styled_row}>
						<div className={`${styles.styled_col} ${styles.discount_name}`}>
							<Tooltip
								placement="top-start"
								content={discountTooltip({ discountedAmount, currency, t })}
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
							{formatAmount({
								amount: discountedAmount,
								currency,
								options: {
									notation: 'standard',
									style: 'currency',
								},
							})}
						</div>
					</div>
				) : null}

				<div className={styles.input_wrapper}>
					{!Object.keys(couponCode)?.length > 0 ? (
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
									{couponCode?.promocodes?.[0]?.promocode?.toUpperCase()}
									{t('subscriptions:applied_text')}
								</div>
								<div className={styles.discount}>
									{couponCode?.promotion_discounts?.[GLOBAL_CONSTANTS.zeroth_index]?.unit === 'flat'
										&& amountCurrency}
									{couponCode?.promotion_discounts?.[GLOBAL_CONSTANTS.zeroth_index]?.value}
									{couponCode?.promotion_discounts?.[GLOBAL_CONSTANTS.zeroth_index]?.unit
										=== 'percentage' && '%'}
									{t('subscriptions:off_code_text')}
								</div>
							</div>
						</div>
					)}
					<div>
						{!Object.keys(couponCode)?.length > 0 ? (
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
						{formatAmount({
							amount: couponCodeLength > 0 ? totalAmount : amount,
							currency,
							options: {
								notation: 'standard',
								style: 'currency',
							},
						})}
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
										content={description({ t })}
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
							minDate={minDate}
							maxDate={maxDate}
							onChange={setDatePickerValue}
							value={datePickerValue}
						/>
					) : null}
				</div>

				<div className={styles.button_wrapper}>
					<Button
						onClick={submit}
						disabled={loading}
						className={loading ? 'disabled' : ''}
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
								<IcMArrowNext class="icon" />
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
