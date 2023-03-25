const mutateFields = ({
	fields,
	mode,
	location,
	services,
	data,
	type = null,
}) => {
	const newFields = fields;
	newFields.forEach((key, index) => {
		if (newFields[index]?.controls) {
			newFields[index].controls = newFields[index].controls.map((item) => {
				if (item.name === 'location_id' && newFields[index].name === 'export_transporation') {
					return { ...item, country_id: location?.origin?.country_id };
				}
				if (item.name === 'location_id' && newFields[index].name === 'import_transportation') {
					return { ...item, country_id: location?.destination?.country_id };
				}
				if (
					item?.name === 'have_dpd_code'
          && !['INNSA', 'INMAA'].includes(location?.destination?.port_code)
				) {
					return {
						...item,
						value   : 'non_dpd',
						options : item.options.filter((option) => option?.value !== 'dpd'),
					};
				}
				return item;
			});
		} else {
			const value = (data || {})[newFields[index].name];
			const directPortDeliveryHideCondition1 = !(
				(services?.import_fcl_customs || services?.import_transportation)
        && mode === 'fcl_freight'
			);
			const directPortDeliveryHideCondition2 = newFields[index].name === 'import_cargo_handling_type'
        && !['INNSA', 'INMAA'].includes(location?.destination?.port_code);
			if (
				directPortDeliveryHideCondition1
        && directPortDeliveryHideCondition2
			) {
				newFields[index] = {
					...newFields[index],
					value,
					options: newFields[index].options.filter(
						(option) => option?.value !== 'direct_port_delivery',
					),
				};
			}
		}
	});
	return newFields;
};

export default mutateFields;
