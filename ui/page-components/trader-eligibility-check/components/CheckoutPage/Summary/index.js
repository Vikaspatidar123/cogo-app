import { Button } from '@cogoport/components';
import { useState, useEffect } from 'react';

import {
	LoadingIcon,
	NoDataIcon,
} from '../../../configuration/icon-configuration';
import redirectUrl from '../../../constants/redirectUrl';
import { quotaAvailabilityfunction } from '../../../utils';
import style from '../styles.module.css';

import styles from './styles.module.css';

function Summary({
	serviceRates = {},
	quotaDetails = {},
	createDraft = () => {},
	loading = false,
	formDetails,
}) {
	const { subscriptionsUrl } = redirectUrl();
	const [quotaAvailableStats, setQuotaAvailableStats] = useState({});
	const { left_quota = 0, addon_quota = 0 } = quotaAvailableStats;
	const [payment, setPayment] = useState({
		paymentThroughQuota : false,
		paymentThroughAddon : false,
		directPayment       : false,
		buySubscription     : false,
	});
	const {
		buySubscription = false,
		paymentThroughAddon = false,
		paymentThroughQuota = false,
		directPayment = false,
	} = payment || {};

	useEffect(() => {
		if (Object.keys(quotaDetails)?.length > 0) {
			quotaAvailabilityfunction({
				setQuotaAvailableStats,
				quotaDetails,
				setPayment,
			});
		}
	}, [quotaDetails]);
	const { services } = serviceRates || {};
	const { buyer_eligibility_check } = services || {};
	const pricePerUnit = Number(buyer_eligibility_check?.price);
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
		if (directPayment) {
			createDraft({ formDetails, value: 'directPayment', services });
		}
		if (paymentThroughQuota) {
			createDraft({
				formDetails,
				value: 'paymentThroughQuota',
			});
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
						<img src={NoDataIcon} alt="" className={styles.icon_style} />
						Sorry!! We could not fetch details.Please try again later!
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
									<div className={styles.text}>Left Quota</div>
								</div>
								<div className={styles.text_column}>
									<div className={styles.text}>
										{+left_quota + +addon_quota}
									</div>
								</div>
							</div>
							<div className={styles.styled_row}>
								<div>
									<div className={styles.text}>Quota that will be deducted</div>
								</div>
								<div className={styles.text_column}>
									<div className={styles.text}>1</div>
								</div>
							</div>
							<div className={styles.line2} />
							<div className={styles.styled_row}>
								<div>
									<div className={styles.total_text}>Remaining Quota</div>
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
									<div className={styles.text}>Eligibility check charges</div>
								</div>
								<div className={styles.text_column}>
									<div className={styles.text}>
										INR
										{+pricePerUnit}
									</div>
								</div>
							</div>
							<div className={styles.styled_row}>
								<div>
									<div className={styles.text}>Convenience fee</div>
								</div>
								<div className={styles.text_column}>
									<div className={styles.text}>
										INR
										{(+pricePerUnit * 0.18).toFixed(2)}
									</div>
								</div>
							</div>
							<div className={styles.line2} />
							<div className={styles.styled_row}>
								<div>
									<div className={styles.total_text}>Total Amount</div>
								</div>
								<div className={styles.text_column}>
									<div className={styles.total_text}>
										INR
										{(+pricePerUnit * 1.18).toFixed(2)}
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
