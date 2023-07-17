const getUserActivePlan = ({ item_plans, activeTab }) => {
	const active_plan = item_plans.filter((item) => {
		const { display_pricing = '' } = item || {};

		const { is_active_plan } = display_pricing[activeTab];
		return is_active_plan === true;
	});
	return active_plan?.[0];
};

export default getUserActivePlan;
