/* eslint-disable default-param-last */
const setDefaultValues = (controls, data, mobile = false, location = {}, index) => {
	const finalControls = controls.map((item) => {
		const obj = { ...item, mobileSelect: mobile };

		try {
			if (data[obj.name] || data[`${index}-${obj.name}`] || obj.value) {
				obj.value = data[obj.name] || data[`${index}-${obj.name}`] || obj.value;

				if (obj.asyncKey === 'locations') {
					const locationKeyName = obj.name.replace('_id', '');
					const locationObj = data[locationKeyName];

					if (locationObj) {
						obj.defaultOptions = true;
					}
				}
			}
			if (obj.name?.includes('truck_type')) {
				if (obj.name.includes('drop') || obj.name.includes('destination')) {
					obj.country_code = location?.destination?.country?.country_code;
				} else {
					obj.country_code = location?.origin?.country?.country_code;
				}
			}
			if (item.type === 'fieldArray') {
				const initialValue = {};
				item.controls.forEach((child) => {
					initialValue[child.name] = '';
				});
				obj.value = data[obj.name] || obj.value || [initialValue];
			}
		} catch (e) {
			console.log(e);
		}

		return obj;
	});

	return finalControls;
};

export default setDefaultValues;
