// import { StyledLoading } from '../components/TraderDetails/styles';

export const quotaAvailabilityfunction = ({
	setQuotaAvailableStats,
	quotaDetails,
	setPayment,
}) => {
	const quotaAvailable =		quotaDetails?.plan_details?.find(
		(obj) => obj?.product_name_slug === 'premium_services',
	) || {};
	setQuotaAvailableStats(quotaAvailable);
	if (Object.keys(quotaAvailable)?.length > 0) {
		if (
			quotaAvailable?.total_quota === -1
			|| +quotaAvailable?.left_quota + +quotaAvailable?.addon_quota > 0
		) {
			setPayment((prev) => ({
				...prev,
				paymentThroughQuota: true,
			}));
		} else if (+quotaAvailable?.left_quota + +quotaAvailable?.addon_quota === 0) {
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

export const renderBtn = ({ quotaLoading, serviceRatesLoading }) => {
	if (quotaLoading || serviceRatesLoading) {
		return <div />;
	}
	return 'Continue';
};
