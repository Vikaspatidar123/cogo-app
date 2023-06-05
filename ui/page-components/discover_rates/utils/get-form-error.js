const handleError = (props, errorClass) => {
	const errorMessage = [];
	const { errorName, label, error, rules } = props;
	if (errorClass) {
		if (!label && rules?.required) {
			errorMessage.push('This is required');
			return error?.message;
		}
		if (rules?.required && error.type === 'required') {
			errorMessage.push(`${errorName || label} is Required`);
		}
		if (rules?.min && error.type === 'min') {
			errorMessage.push(
				`${errorName || label} cannot be less than ${rules.min}`,
			);
		}
		if (rules?.max && error.type === 'max') {
			errorMessage.push(
				`${errorName || label} cannot be greater than ${rules.max}`,
			);
		}
		if (rules?.minLength && error.type === 'minLength') {
			errorMessage.push(
				`${errorName || label} should be ${rules.minLength} long`,
			);
		}
		if (rules?.maxLength && error.type === 'maxLength') {
			errorMessage.push(
				`${errorName || label} should be less than ${rules.maxLength}`,
			);
		}
	}
	if (errorMessage.length) {
		return errorMessage.join(' ,');
	}
	return error?.message;
};

export default handleError;
