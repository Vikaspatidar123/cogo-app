const getFilterdJourney = (journey, filters) => {
	let filteredJourney = journey || [];
	Object.keys(filters || {}).forEach((key) => {
		if (key === 'task_type') {
			filteredJourney = (filteredJourney || []).map((mileStone) => ({
				...mileStone,
				tasks: (mileStone.tasks || []).filter(
					(task) =>
						filters[key] === 'all' ||
						(task.mandatory && filters[key] === 'mandatory') ||
						(!task.mandatory && filters[key] === 'non-mandatory'),
				),
			}));
		}
		if (key === 'performed_by') {
			filteredJourney = filteredJourney.filter(
				(mileStone) =>
					filters[key] === 'all' || mileStone.service_type === filters[key],
			);
		}
	});
	return filteredJourney;
};
export default getFilterdJourney;
