const getMutatedFields = ({ fields, importer_exporter_id, searchType }) => {
	const fieldsHash = {};
	Object.entries(fields).forEach(([key, field]) => {
		let newField = field;

		if (['origin_location_id', 'destination_location_id'].includes(key)) {
			newField = {
				...newField,
				searchParams: {
					intent          : 'rate_search',
					organization_id : importer_exporter_id,
					service_type    : searchType,
				},
			};
		}

		fieldsHash[key] = { ...newField };
	});

	return fieldsHash;
};

export default getMutatedFields;
