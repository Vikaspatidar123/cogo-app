import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import redirectUrl from '../../../constants/redirectUrl';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatAmount from '@/ui/commons/utils/formatAmount';

function Summary({
	serviceRates = {},
	createDraft = () => { },
	loading = false,
	formDetails,
	quotaAvailableStats = {},
	payment,
	address,
	setAddress,
}) {
	const { t } = useTranslation(['traderEligibilityCheck']);
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
			return t('traderEligibilityCheck:tec_buy_through_subscription_button_label');
		}
		if (paymentThroughAddon) {
			return t('traderEligibilityCheck:tec_buy_through_addons_button_label');
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
		if (directPayment) {
			return `${t('traderEligibilityCheck:tec_pay_button_label')} ${(pricePerUnit * 1.18).toFixed(2)} /-`;
		}
		if (paymentThroughQuota) {
			return t('traderEligibilityCheck:tec_pay_with_quota_button_label');
		}

		return null;
	};
	return (
		<div className={styles.wrapper}>
			{Object.keys(serviceRates).length === 0 && (
				<div className={styles.card}>
					<div className={styles.flex_div}>
						<Image
							src={GLOBAL_CONSTANTS.image_url.no_data_icon}
							alt=""
							className={styles.icon_style}
							width={100}
							height={200}
						/>
						{t('traderEligibilityCheck:tec_sorry_could_not_fetch_details')}
					</div>
				</div>
			)}
			{Object.keys(serviceRates || {}).length > 0 && (
				<div className={styles.card}>
					<div className={styles.heading}>{t('traderEligibilityCheck:tec_summary_label')}</div>
					<div className={styles.line} />
					{paymentThroughQuota && (
						<>
							<div className={styles.styled_row}>
								<div>
									<div className={styles.text}>
										{t('traderEligibilityCheck:tec_left_quota_label')}
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
										{t('traderEligibilityCheck:tec_quota_deducted_label')}
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
										{t('traderEligibilityCheck:tec_remaining_quota_label')}
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
										{t('traderEligibilityCheck:tec_eligibility_check_charges_label')}
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
										{t('traderEligibilityCheck:tec_convinience_fee_label')}
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
										{t('traderEligibilityCheck:tec_total_amount_label')}
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
							disabled={loading}
						>
							{renderButton()}
						</Button>
					)}
					<Button
						className={styles.submit_button}
						loading={loading}
						onClick={submit}
						disabled={loading}
					>
						{renderBtn()}
					</Button>
				</div>
			)}
		</div>
	);
}
export default Summary;
