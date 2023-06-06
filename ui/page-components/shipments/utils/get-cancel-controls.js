const getCancelControls = (selectedReason, reasons, serviceProviderCancelled) => {
	const reasonObject = reasons.find((reason) => reason.value === selectedReason);
	const { subreasons, free_text } = reasonObject || {};
	const extraControls = [];
	if (serviceProviderCancelled) {
		return [];
	}

	if (subreasons?.length > 0) {
		const control = {
			name        : 'cancellation_subreason',
			label       : 'Select sub reason',
			type        : 'chips',
			span        : 12,
			options     : subreasons || [],
			placeholder : 'Select',
			validations : [{ type: 'required', message: 'Sub-reason is required' }],
		};
		extraControls.push(control);
	}

	if (free_text?.required) {
		const control = {
			name        : 'cancellation_reason_comment',
			label       : free_text?.label || 'How we can help you?',
			type        : free_text?.type || 'text',
			span        : 12,
			placeholder : '',
			validations : free_text?.mandatory
				? [{ type: 'required', message: 'This is required field' }]
				: undefined,
		};
		extraControls.push(control);
	}

	return extraControls;
};

export default getCancelControls;
