import { differenceInDays } from '@cogoport/utils';

const getTaskTag = (task) => {
	const { deadline, task: taskName } = task;
	const today = new Date();
	const deadlineDate = new Date(deadline);
	const criticalTasks = ['upload_booking_note'];
	if (
		deadlineDate < today
		|| criticalTasks.includes(taskName)
		|| differenceInDays(deadlineDate, today) === 0
	) {
		return {
			tag   : 'Critical',
			class : 'red',
		};
	}
	if (differenceInDays(deadlineDate, today) === 1) {
		return {
			tag   : 'Need Action',
			class : 'warn',
		};
	}
	return { tag: 'Shipment Update', class: 'warn' };
};
export default getTaskTag;
