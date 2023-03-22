import incotermsArray from '@cogo/smart-components/constants/inco-terms.json';

const blTypeOptions = (services = []) => {
	let rfs = true;
	let sob = true;
	const fclService = services.find(({ service_type, main_service_id }) => service_type === 'fcl_freight_service' && !main_service_id);
	if (fclService) {
		const { inco_term = '', possible_service_pending_tasks = [] } = fclService;
		const { tradeType } = incotermsArray.find((incoterm) => incoterm.value === inco_term);
		if (tradeType === 'export') {
			const containerPickedUpTask = possible_service_pending_tasks.find((task) => task.task === 'mark_container_picked_up') || {};
			const containerGatedInTask = possible_service_pending_tasks.find((task) => task.task === 'mark_container_gated_in') || {};
			if (containerPickedUpTask?.status === 'completed') {
				rfs = false;
			}
			if (containerGatedInTask?.status === 'completed') {
				sob = false;
			}
		}
	}
	return { conditions: { rfs, sob } };
};
export default blTypeOptions;
