const isTwoButtons = (task) => {
	const tasksWithTwoButtons = ['approve_fcl_freight_service_amended_quote'];
	const taskWithPopConfirm = ['approve_fcl_freight_service_amended_quote'];
	const c = {
		mark_confirmed                            : 'EDIT RATE',
		approve_fcl_freight_service_amended_quote : 'CANCEL',
	};
	const p = {
		mark_confirmed                            : 'MARK CONFIRMED',
		approve_fcl_freight_service_amended_quote : 'ACCEPT',
	};
	// (task?.task === 'mark_confirmed' && task?.service_type) ||
	if (tasksWithTwoButtons.includes(task?.task)) {
		return {
			isTwo          : true,
			c              : c[task?.task],
			p              : p[task?.task],
			withPopconfirm : taskWithPopConfirm.includes(task?.task),
		};
	}
	if (task?.task === 'mark_confirmed') {
		return {
			isTwo          : false,
			c              : c[task?.task],
			p              : p[task?.task],
			withPopconfirm : false,
		};
	}
	return { isTwo: false, withPopconfirm: false };
};
export default isTwoButtons;
