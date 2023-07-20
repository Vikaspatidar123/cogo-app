import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const getUserActivePlan = ({ item_plans = [], activeTab = '' }) => {
	const active_plan = item_plans.filter((item) => {
		const { display_pricing = '' } = item || {};

		const { is_active_plan } = display_pricing[activeTab];
		return is_active_plan;
	});
	return active_plan?.[GLOBAL_CONSTANTS.zeroth_index];
};

export default getUserActivePlan;
