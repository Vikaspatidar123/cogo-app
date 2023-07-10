const getFormFields = (fields = []) => {
	const fieldHash = {};

	fields.forEach((field) => {
		fieldHash[field?.name] = field;
	});

	return fieldHash;
};

export default getFormFields;
