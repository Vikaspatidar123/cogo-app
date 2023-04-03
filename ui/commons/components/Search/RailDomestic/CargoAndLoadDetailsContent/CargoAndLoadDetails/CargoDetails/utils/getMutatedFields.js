const getMutatedFields = ({ fields, watchContainerLoadType }) => {
	const fieldsHash = {};
	Object.entries(fields).forEach(([key, field]) => {
		let newField = { ...field };

		if (key === 'container_load_sub_type') {
			newField = {
				...newField,
				disabled: !watchContainerLoadType,
			};
		}

		fieldsHash[key] = newField;
	});

	return fieldsHash;
};

export default getMutatedFields;
