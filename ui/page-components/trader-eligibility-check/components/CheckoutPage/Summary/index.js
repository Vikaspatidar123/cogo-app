import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import {
	LoadingIcon,
	NoDataIcon,
} from '../../../configuration/icon-configuration';
import redirectUrl from '../../../constants/redirectUrl';
import style from '../styles.module.css';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function Summary({
	serviceRates = {},
	createDraft = () => {},
	loading = false,
	formDetails,
	quotaAvailableStats = {},
	payment,
	address,
	setAddress,
}) {
	const { subscriptionsUrl } = redirectUrl();
	const { left_quota = 0, addon_quota = 0 } = quotaAvailableStats;
	const {
		buySubscription = false,
		paymentThroughAddon = false,
		paymentThroughQuota = false,
		directPayment = false,
	} = payment || {};

	const { services = {}, currency = 'INR' } = serviceRates || {};
	const { buyer_eligibility_check = {} } = services || {};
	const { price } = buyer_eligibility_check || {};
	const pricePerUnit = +price || 0;
	const gstAmount = (+pricePerUnit * 0.18).toFixed(2);
	const totalAmount = (+pricePerUnit * 1.18).toFixed(2);

	const renderButton = () => {
		if (buySubscription) {
			return 'Buy Subscription';
		}
		if (paymentThroughAddon) {
			return 'Buy Addons';
		}
		return null;
	};
	const redirectingButtonsFunc = () => {
		if (buySubscription) {
			const url = `${subscriptionsUrl}/manage-subscription`;
			window.open(url, '_blank');
		}
		if (paymentThroughAddon) {
			const url = `${subscriptionsUrl}/balance-history`;
			window.open(url, '_blank');
		}
	};
	const submit = () => {
		if (!isEmpty(address) || paymentThroughQuota) {
			createDraft({
				formDetails,
				value: paymentThroughQuota
					? 'paymentThroughQuota'
					: 'directPayment',
				services: directPayment ? serviceRates : null,
				address,
			});
		} else {
			setAddress(null);
		}
	};
	const renderBtn = () => {
		if (loading) {
			return (
				<div className={style.loading_style}>
					<img src={LoadingIcon} alt="" />
				</div>
			);
		}
		if (directPayment) {
			return `Pay ${(pricePerUnit * 1.18).toFixed(2)} /-`;
		}
		if (paymentThroughQuota) {
			return 'Pay with quota';
		}

		return null;
	};
	return (
		<div className={styles.wrapper}>
			{Object.keys(serviceRates).length === 0 && (
				<div className={styles.card}>
					<div className={styles.flex_div}>
						<img
							src={NoDataIcon}
							alt=""
							className={styles.icon_style}
						/>
						Sorry!! We could not fetch details.Please try again
						later!
					</div>
				</div>
			)}
			{Object.keys(serviceRates || {}).length > 0 && (
				<div className={styles.card}>
					<div className={styles.heading}>Summary</div>
					<div className={styles.line} />
					{paymentThroughQuota && (
						<>
							<div className={styles.styled_row}>
								<div>
									<div className={styles.text}>
										Left Quota
									</div>
								</div>
								<div className={styles.text_column}>
									<div className={styles.text}>
										{+left_quota + +addon_quota}
									</div>
								</div>
							</div>
							<div className={styles.styled_row}>
								<div>
									<div className={styles.text}>
										Quota that will be deducted
									</div>
								</div>
								<div className={styles.text_column}>
									<div className={styles.text}>1</div>
								</div>
							</div>
							<div className={styles.line2} />
							<div className={styles.styled_row}>
								<div>
									<div className={styles.total_text}>
										Remaining Quota
									</div>
								</div>
								<div className={styles.text_column}>
									<div className={styles.total_text}>
										{+left_quota + +addon_quota - 1}
									</div>
								</div>
							</div>
						</>
					)}
					{!paymentThroughQuota && (
						<>
							<div className={styles.styled_row}>
								<div>
									<div className={styles.text}>
										Eligibility check charges
									</div>
								</div>
								<div className={styles.text_column}>
									<div className={styles.text}>
										{formatAmount({
											amount  : pricePerUnit,
											currency,
											options : {
												notation : 'standard',
												style    : 'currency',
											},
										})}
									</div>
								</div>
							</div>
							<div className={styles.styled_row}>
								<div>
									<div className={styles.text}>
										Convenience fee
									</div>
								</div>
								<div className={styles.text_column}>
									<div className={styles.text}>
										{formatAmount({
											amount  : gstAmount,
											currency,
											options : {
												notation : 'standard',
												style    : 'currency',
											},
										})}
									</div>
								</div>
							</div>
							<div className={styles.line2} />
							<div className={styles.styled_row}>
								<div>
									<div className={styles.total_text}>
										Total Amount
									</div>
								</div>
								<div className={styles.text_column}>
									<div className={styles.total_text}>
										{formatAmount({
											amount  : totalAmount,
											currency,
											options : {
												notation : 'standard',
												style    : 'currency',
											},
										})}
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			)}
			{Object.keys(serviceRates).length > 0 && (
				<div className={styles.button_wrapper}>
					{!paymentThroughQuota && (
						<Button
							className={styles.redirect_button}
							onClick={() => redirectingButtonsFunc()}
						>
							{renderButton()}
						</Button>
					)}
					<Button className={styles.submit_button} onClick={submit}>
						{renderBtn()}
					</Button>
				</div>
			)}
		</div>
	);
}
export default Summary;
