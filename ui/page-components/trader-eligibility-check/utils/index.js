import styles from '../components/TraderDetails/styles.module.css';
import { LoadingIcon } from '../configuration/icon-configuration';

export const quotaAvailabilityfunction = ({
	setQuotaAvailableStats,
	quotaDetails,
	setPayment,
}) => {
	const quotaAvailable = quotaDetails?.plan_details?.find(
		(obj) => obj?.product_name_slug === 'premium_services',
	) || {};
	setQuotaAvailableStats(quotaAvailable);
	const check = Object.keys(quotaAvailable)?.length > 0;
	if (check) {
		const val1 = quotaAvailable?.left_quota;
		const val2 = quotaAvailable?.addon_quota;
		if (quotaAvailable?.total_quota === -1 || +val1 + +val2 > 0) {
			setPayment((prev) => ({
				...prev,
				paymentThroughQuota: true,
			}));
		} else if (+val1 + +val2 === 0) {
			setPayment((prev) => ({
				...prev,
				paymentThroughAddon : true,
				directPayment       : true,
			}));
		}
	} else {
		setPayment((prev) => ({
			...prev,
			directPayment   : true,
			buySubscription : true,
		}));
	}
};

export const renderBtn = ({ quotaLoading, serviceRatesLoading, t }) => {
	if (quotaLoading || serviceRatesLoading) {
		return <img className={styles.style_loading} src={LoadingIcon} alt="" />;
	}
	return t('traderEligibilityCheck:tec_form_continue_button_label');
};
