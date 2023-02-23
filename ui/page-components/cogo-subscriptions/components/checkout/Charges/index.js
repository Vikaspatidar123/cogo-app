import {
	Button,
	Toast, Checkbox, Datepicker, Tooltip,
} from '@cogoport/components';
import { IcMArrowNext, IcMHelpInCircle } from '@cogoport/icons-react';
import { useState } from 'react';

import LoadingBtn from '../../../asset/loading.svg';
import { getCurrencyDetail } from '../../../utils/getCurrencyDetail';
import { shortFormatNumber } from '../../../utils/getShortFormatNumber';

import styles from './styles.module.css';
// import {
// 	Label,
// 	Wrapper,
// 	Div,
// 	StyledRow,
// 	StyledCol,
// 	StyledButton,
// 	CrossedPrice,
// 	StyledCol2,
// 	LineWrapper,
// 	ButtonWrapper,
// 	FlexDiv,
// 	Line,
// 	GSt,
// 	ActivateLaterCtn,
// 	ActivateLaterTextCheckBox,
// 	ActivateLaterTxt,
// 	TooltipCtn,
// } from './styles';

const description = () => (
	<div className={styles.tooltip_ctn}>
		You can schedule this plan to activate on a specific day. Once you schedule
		your plan, you can manually activate it before specified day or it will be
		automatically activated on a specified day.
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
	const { plan = {}, pricing = {}, allow_activate_later = false } = plans || {};
	const loading = checkoutResponse?.errors || completeOrderLoading;

	const submit = () => {
		if (checked.length !== 0) {
			completeOrder({});
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
				<div className={styles.label}>Charges</div>
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

				<div className={styles.styled_row}>
					<div className={styles.styled_col}>
						<div>Total</div>
					</div>
					<div className={styles.styled_col}>{shortFormatNumber(amount, currency)}</div>
				</div>

				<div className={styles.activate_later_ctn}>
					<div className={styles.activate_later_text_check_box}>
						<Checkbox
							className="primary lg"
							checked={check}
							onChange={setCheck}
							disabled={!allow_activate_later}
						/>
						<div className={styles.activate_later_txt}>Activate later</div>
						<Tooltip
							placement="top"
							theme="light-border"
							content={description()}
							animation="scale"
							maxWidth={350}
							interactive
						>
							<div className="icon-container">
								<IcMHelpInCircle />
							</div>
						</Tooltip>
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
							<LoadingBtn width="60px" height="23px" />
						) : (
							<>
								Proceed to Pay
								<IcMArrowNext class="icon" />
							</>
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Charges;
