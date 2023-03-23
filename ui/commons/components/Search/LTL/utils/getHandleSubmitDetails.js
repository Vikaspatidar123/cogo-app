const getHandleSubmitDetails = async ({ refObj = {} }) => {
	const promises = Object.values(refObj).map((obj) => {
		return obj?.handleSubmit() || {};
	});

	const promiseValues = await Promise.all([...promises]);

	let containErrors = false;
	const errorsHash = {};
	const valuesHash = {};

	Object.keys(refObj).forEach((key, index) => {
		const { hasError, errors, values } = promiseValues[index];

		if (hasError) {
			containErrors = true;
			errorsHash[key] = { ...errors };
			return;
		}
		valuesHash[key] = values;
	});

	return {
		hasError: containErrors,
		...(containErrors && { errors: errorsHash }),
		...(!containErrors && { values: valuesHash }),
	};
};

export default getHandleSubmitDetails;
