import shipmentJourneyStates from '../configurations/common/shipment-journey.json';

import CC from './condition-constants';

const actionableTasks = (stateTasks = [], pendingTasks = []) => stateTasks
	.map((task) => {
		if (task?.status === 'pending') {
			// handles Case when task is there in timeline as pending but not in pending tasks
			const taskInOrginal = pendingTasks.find(
				(pendingTask) => pendingTask?.id === task?.id,
			);
			if (!taskInOrginal) {
				return { ...task, _deleted: true };
			}
			return { ...task, ...taskInOrginal };
		}
		if (task?.status !== 'completed') {
			const taskInOrginal =					pendingTasks.find((pendingTask) => pendingTask?.id === task?.id)
					|| {};
			return { ...task, ...taskInOrginal };
		}
		return task;
	})
	.filter((task) => !task?._deleted);

const getMileStoneStats = (
	tasks = [],
	scope,
	isConditionMatches,
	milesStoneState = '',
	services,
) => {
	let notCompletedServices = [];
	if (milesStoneState === 'in_progress') {
		notCompletedServices = (services || []).filter(
			(service) => service.state !== 'completed',
		);
	}
	const filteredTasks = (tasks || []).filter(({ task = '' }) => {
		if (task === 'approve_booking_proof') {
			if (
				(scope === 'partner'
					&& isConditionMatches(CC.BOOKING_AGENT_VIEW, 'or'))
				|| scope === 'app'
			) {
				return true;
			}
			return false;
		}
		if (task === 'amend_booking_proof') {
			return isConditionMatches(CC.SALES_AGENT_VIEW, 'or');
		}
		return task !== 'mark_completed' || notCompletedServices?.length === 0;
	});
	let isCompleted = true;
	let totalMandatoryTasksRemaining = 0;
	let totalNonMandatoryTasksRemaining = 0;
	(filteredTasks || []).forEach((task) => {
		if (task.mandatory && task?.status !== 'completed') {
			isCompleted = false;
		}
		if (task?.mandatory && task?.status !== 'completed') {
			totalMandatoryTasksRemaining += 1;
		}
		if (!task?.mandatory && task?.status !== 'completed') {
			totalNonMandatoryTasksRemaining += 1;
		}
	});
	return {
		isCompleted,
		totalMandatoryTasksRemaining,
		totalNonMandatoryTasksRemaining,
	};
};

const getStats = (shipmentJourney) => {
	let currentMileStone = {};
	let totalmandatorytasks = 0;
	let totalMandatoryTasksCompleted = 0;
	let allMileStoneCompleted = true;
	let totalCompletedMileStones = 0;
	let totalNonMandatoryTasks = 0;
	shipmentJourney.forEach((mileStone) => {
		if (allMileStoneCompleted && !mileStone?.isCompleted) {
			currentMileStone = mileStone;
			allMileStoneCompleted = false;
		}
		if (mileStone.isCompleted) {
			totalCompletedMileStones += 1;
		}
		(mileStone.tasks || []).forEach((task) => {
			if (task?.mandatory) {
				totalmandatorytasks += 1;
			}
			if (task?.mandatory && task?.status === 'completed') {
				totalMandatoryTasksCompleted += 1;
			}
			if (!task?.mandatory && task?.status !== 'completed') {
				totalNonMandatoryTasks += 1;
			}
		});
	});
	return {
		currentMileStone,
		totalmandatorytasks,
		totalMandatoryTasksCompleted,
		totalCompletedMileStones,
		totalNonMandatoryTasks,
	};
};

const getJourneyStates = (shipment_data = {}) => (shipment_data?.all_states || []).map((state) => ({
	state,
	service_type: shipment_data?.service_type,
}));

const getShipmentJourney = (
	tasks = [],
	shipment_data = {},
	timeLine = {},
	viewAs = 'importer_exporter',
	isBookingAgent,
	scope = '',
	isConditionMatches,
	services,
) => {
	const journeyStates =		viewAs === 'importer_exporter'
		? shipmentJourneyStates[shipment_data?.shipment_type] || []
		: getJourneyStates(shipment_data);
	const shipmentJourney = [];
	journeyStates.forEach((state) => {
		const stateTasks = timeLine[state?.state]?.tasks || [];
		const { isMultiService = true } = state || {};

		if (isMultiService) {
			if (viewAs === 'service_provider') {
				const allServiceTasksOfState = {};
				stateTasks.forEach((task) => {
					allServiceTasksOfState[task?.service_type] = [
						...(allServiceTasksOfState[task?.service_type] || []),
						task,
					];
				});

				const serviceTasksOfState =					isBookingAgent && viewAs !== 'service_provider'
					? allServiceTasksOfState
					: {
						[state?.service_type]:
									allServiceTasksOfState[state.service_type] || [],
						  };

				Object.keys(serviceTasksOfState).forEach((key) => {
					if (serviceTasksOfState[key]?.length) {
						const newTasks = actionableTasks(serviceTasksOfState[key], tasks);
						shipmentJourney.push({
							...getMileStoneStats(
								newTasks,
								scope,
								isConditionMatches,
								state?.state,
								services,
							),
							tasks        : newTasks,
							...state,
							service_type : key,
						});
					}
				});
			}
		} else if (stateTasks?.length) {
			const newTasks = actionableTasks(stateTasks, tasks);
			shipmentJourney.push({
				...getMileStoneStats(
					newTasks,
					scope,
					isConditionMatches,
					state?.state,
					services,
				),
				tasks        : newTasks,
				...state,
				service_type : shipment_data?.shipment_type,
			});
		}
	});
	return { shipmentJourney, ...getStats(shipmentJourney) };
};
export default getShipmentJourney;
