const bnTime = (services) => {
	const fcl_freight_service =
		(services || []).find((service) => service.service_type === 'fcl_freight_service') || {};
	const { possible_service_pending_tasks } = fcl_freight_service;
	const booking_note_task =
		(possible_service_pending_tasks || []).find((task) => task?.task === 'upload_booking_note') ||
		{};
	const deadline = booking_note_task?.deadline;

	const deadlineDate = new Date(deadline);
	const now = new Date();
	const ms = deadlineDate.getTime() - now.getTime();
	const expiryTime = deadlineDate > now ? Math.floor(ms / 1000) : 0;
	return { expiryTime, deadline };
};
export default bnTime;
