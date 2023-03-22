const mergeControls = (step) => {
	const controls = [];
	step.sections.forEach((section) => {
		controls.push(...section.controls);
	});
	return controls;
};

export default mergeControls;
