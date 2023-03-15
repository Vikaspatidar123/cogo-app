import {
	Button,
	Toast, Checkbox, Datepicker, Tooltip,
} from '@cogoport/components';
import { IcMArrowNext, IcMHelpInCircle, IcCFtick } from '@cogoport/icons-react';
import { useState } from 'react';

import Coupons from '../../../common/Coupons';
import useUpdateSaasCheckout from '../../../hooks/useUpdateSaasCheckout';
import { getCurrencyDetail } from '../../../utils/getCurrencyDetail';
import { shortFormatNumber } from '../../../utils/getShortFormatNumber';

import styles from './styles.module.css';

const description = () => (
	<div className={styles.tooltip_ctn}>
		You can schedule this plan to activate on a specific day. Once you schedule
		your plan, you can manually activate it before specified day or it will be
		automatically activated on a specified day.
	</div>
);

const discountTooltip = ({ discountedAmount, currency }) => (
	<div className={styles.discount_content}>
		<div className={styles.heading}>Total discount breakup:</div>
		<div className={styles.content}>
			<div>Coupons Discount</div>
			<div>
				-
				{shortFormatNumber(discountedAmount || 0, currency, true)}
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
	const [check, setCheck] = useState(false);
	const [showCoupons, setShowCoupons] = useState(false);
	const { plan = {}, pricing = {}, allow_activate_later = false } = plans || {};
	const loading = checkoutResponse?.errors || completeOrderLoading;

	const {
		applyPromoCode, promoCodeData, couponCode, setCouponCode,
	} =		useUpdateSaasCheckout({
		checkoutResponse,
	});

	const { discount_amount: discountedAmount, total_amount: totalAmount } =		promoCodeData || {};

	const couponCodeLength = Object.keys(couponCode)?.length;
	const handleClick = ({ value, item }) => {
		applyPromoCode({ value, item });
	};

	const submit = () => {
		if (checked.length !== 0) {
			completeOrder({ couponCode });
		} else {
			Toast.error('Error! Please Select an Address', {
				autoClose : 5000,
				style     : { background: '#FFD8D8', color: '#000' },
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
					Summary
				</div>
			</div>
			<div className={styles.div}>
				<div className={styles.styled_row}>
					<div className={styles.styled_col}>
						<div>
							{plan?.description}
							<div className={styles.gst}>(Gst Included)</div>
						</div>
					</div>
					<div className={styles.styled_col2}>
						{plan?.metadata?.display_pricing?.[`${query?.period}`]
							?.prev_value_inr && (
								<div className={`${styles.crossed_price} ${styles.crossedprice}`}>
									<div className={styles.flex_div}>{shortFormatNumber(crossedAmount, currency)}</div>
								</div>
						)}
						<div className={styles.flex_div}>{shortFormatNumber(amount, currency)}</div>
					</div>
				</div>
				<div className={styles.line_wrapper}>
					<div className={styles.line} />
				</div>

				{/* <div className={styles.styled_row}>
					<div className={styles.styled_col}>
						<div>Total</div>
					</div>
					<div className={styles.styled_col}>{shortFormatNumber(amount, currency)}</div>
				</div> */}

				{couponCodeLength > 0 && (
					<div className={styles.styled_row}>
						<div className={`${styles.styled_col} ${styles.discount_name}`}>
							<Tooltip
								placement="top-start"
								theme="light-border"
								// content={couponCode?.description}
								content={discountTooltip({ discountedAmount, currency })}
								animation="scale"
								interactive
								visibility
							>
								<div>
									{/* {startCase(couponCode?.name)} */}
									Discount
									<div className={`${styles.line_wrapper} ${styles.discount_line}`}>
										<div className={`${styles.line} ${styles.discount_dashed_line}`} />
									</div>
								</div>
							</Tooltip>
						</div>
						<div className={`${styles.discount_name} ${styles.price}`}>
							-
							{' '}
							{shortFormatNumber(discountedAmount || 0, currency, true)}
						</div>
					</div>
				)}

				<div className={styles.input_wrapper}>
					{!Object.keys(couponCode)?.length > 0 ? (
						<div>Have a coupon code?</div>
					) : (
						<div className={styles.code_wrapper}>
							<div>
								<IcCFtick />
							</div>
							<div className={styles.applied_coupon}>
								<div>
									Code
									{' '}
									{couponCode?.promocodes?.[0]?.promocode?.toUpperCase()}
									{' '}
									applied
								</div>
								<div className={styles.discount}>
									{couponCode?.promotion_discounts?.[0]?.unit === 'flat'
										&& couponCode?.promotion_discounts?.[0]?.amount_currency}
									{' '}
									{couponCode?.promotion_discounts?.[0]?.value}
									{couponCode?.promotion_discounts?.[0]?.unit === 'percentage' && '%'}
									OFF
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
								Apply
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
								Remove
							</div>
						)}
					</div>
				</div>
				<div className={styles.line_wrapper}>
					<div className={styles.line} />
				</div>

				<div className={styles.styled_row}>
					<div className={`${styles.styled_col} ${styles.total}`}>
						<div>Total</div>
					</div>
					<div className={`${styles.styled_col} ${styles.price}`}>
						{shortFormatNumber(
							couponCodeLength > 0 ? totalAmount : amount,
							currency,
							true,
						)}
					</div>
				</div>

				<div className={styles.activate_later_ctn}>
					<div className={styles.activate_later_text_check_box}>
						<Checkbox
							label={(
								<div className={styles.checkbox_label_content}>
									<div className={styles.activate_later_txt}>Activate later</div>
									<Tooltip
										placement="top"
										content={description()}
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
						{/* <div className={styles.activate_later_txt}>Activate later</div>
						<Tooltip
							placement="top"
							content={description()}
							animation="scale"
							maxWidth={350}
							interactive
						>
							<div className="icon-container">
								<IcMHelpInCircle />
							</div>
						</Tooltip> */}
					</div>
					{check && (
						<Datepicker
							showTimeSelect={false}
							minDate={minDate}
							maxDate={maxDate}
							onChange={setDatePickerValue}
							value={datePickerValue}
						/>
					)}
				</div>

				<div className={styles.button_wrapper}>
					<Button
						onClick={submit}
						disabled={loading}
						className={loading ? 'disabled' : ''}
					>
						{completeOrderLoading ? (
							<img
								src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading.svg"
								alt="cogo"
							/>
						) : (
							<>
								Proceed to Pay
								<IcMArrowNext class="icon" />
							</>
						)}
					</Button>
				</div>
			</div>
			{/* {showCoupons && ( */}

			<div
				className={`${styles.coupon_container} ${showCoupons ? styles.show : styles.hide}`}
			>
				{showCoupons && (
					<Coupons
						showCoupons={showCoupons}
						couponCode={couponCode}
						setCouponCode={setCouponCode}
						amount={amount}
						currency={currency}
						setShowCoupons={setShowCoupons}
						handleClick={handleClick}
					/>
				)}
			</div>
			{/* )} */}
		</div>
	);
}

export default Charges;
