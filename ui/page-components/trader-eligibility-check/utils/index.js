import styles from '../components/TraderDetails/styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

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
		return (
			<Image
				className={styles.style_loading}
				src={GLOBAL_CONSTANTS.image_url.loading_icon}
				alt=""
				height={30}
				width={30}
			/>
		);
	}
	return t('traderEligibilityCheck:tec_form_continue_button_label');
};
