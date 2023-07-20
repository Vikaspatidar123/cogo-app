import { Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const getPayload = ({ profile }) => ({
	plan_name       : 'Enterprise Plan',
	organization_id : profile.organization.id,
	user_id         : profile.id,
});

const useGetRequestCallback = ({ userplan, activeTab }) => {
	const { t } = useTranslation(['subscriptions']);
	const { profile } = useSelector((state) => state);
	const { item_plans = [] } = userplan || {};

	const userActivePlan = userplan?.item_plans?.find(
		(obj) => obj?.display_pricing?.annual?.id === userplan?.saas_plan_pricing_id
			|| obj?.display_pricing?.monthly?.id === userplan?.saas_plan_pricing_id,
	);

	const { priority_sequence: priority_sequence_active_plan } = userActivePlan || {};

	const sortedPlan = item_plans?.sort(
		(a, b) => a.priority_sequence - b.priority_sequence,
	);

	const activeCard = (sortedPlan || []).findIndex(
		(item) => item.display_pricing?.[activeTab]?.is_active_plan,
	);
	const activeIndex = activeCard >= 0 ? activeCard : 2;

	const [{ loading }, trigger] = useRequest({
		url    : '/saas_create_callback_for_plan_inquiry',
		method : 'post',
	}, { manual: true });

	const requestCallback = async () => {
		const payload = getPayload({ profile });
		try {
			await trigger({
				data: payload,
			});
			Toast?.success(
				t('subscriptions:request_success_message'),
			);
		} catch (error) {
			Toast.error(error?.message);
		}
	};
	return {
		requestCallback,
		callbackLoading: loading,
		priority_sequence_active_plan,
		sortedPlan,
		activeIndex,
	};
};

export default useGetRequestCallback;
