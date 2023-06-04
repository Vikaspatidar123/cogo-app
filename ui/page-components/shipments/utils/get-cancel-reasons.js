import cancelReasons from '../configurations/common/shipment-cancel-reasons.json';

import isDocPresent from './is-doc-present';

const checkCondition = (reason, service, shipment_data, services = []) => {
	const { documents = [] } = shipment_data;
	const type = reason?.condition?.type;
	const values = reason?.condition?.values;
	if (type) {
		if (type === 'service') {
			let isServiceTaken = false;
			(services || []).forEach((serviceObj) => {
				if (values.includes(serviceObj.name)) {
					isServiceTaken = true;
				}
			});
			return isServiceTaken;
		}
		if (type === 'service_name') {
			if (values.includes(service)) {
				return true;
			}
			return false;
		}
		if (type === 'document') {
			const timing = reason?.condition?.timing;
			if (values === 'booking_note' && timing === 'before_upload') {
				return !isDocPresent(documents, 'booking_note');
			}
			if (values === 'booking_note' && timing === 'after_upload') {
				return isDocPresent(documents, 'booking_note');
			}
			return false;
		}
		return true;
	}
	return true;
};

const getCancelReasons = (type, service, shipment_data, services) => {
	const obj = cancelReasons[type] || {};
	const newReasons = [];
	Object.keys(obj).forEach((key) => {
		const isConditionSatisfied = checkCondition(obj[key], service, shipment_data || {}, services);
		if (obj[key]?.applicable_to?.includes(service) && isConditionSatisfied) {
			const subreasons = !Array.isArray(obj[key].subreasons)
				? obj[key].subreasons[service]
				: obj[key].subreasons;
			newReasons.push({
				free_text  : obj[key]?.free_text,
				label      : key,
				value      : key.toLowerCase().replace(/ /g, '_'),
				subreasons : (subreasons || []).map((item) => ({
					label : item,
					value : item.toLowerCase().replace(/ /g, '_'),
				})),
			});
		}
	});
	return newReasons;
};
export default getCancelReasons;
