import allControls from '../configurations/common/update-shipment-details.json';

import blTypeOptions from './blTypeOptions';

const isDocPresent = (documents, names) => {
	const docObj = documents.find((document) => names.includes(document.document_type));
	return !!docObj && names.includes(docObj.document_type);
};

const isContainerTypeIncluded = (container_types, condition) => container_types.filter((item) => condition.includes(item)).length > 0;

const pushItem = (data, control) => {
	const {
		viewAs,
		shipment_data: { documents = [], shipment_type },
		services = [],
	} = data || {};
	let state = '';
	const mainServices = services.filter(
		({ service_type }) => service_type === `${shipment_type}_service`,
	);
	const container_types = mainServices.map(
		({ container_type }) => container_type,
	);
	const fclService = services.find(
		({ service_type }) => service_type === 'fcl_freight_service',
	);
	if (fclService) {
		state = fclService.state;
	}
	let pushControl = true;
	const conditionObj = control?.condition || {};
	Object.keys(conditionObj).forEach((condition) => {
		if (condition === 'viewAs' && viewAs !== conditionObj[condition]) {
			pushControl = false;
		}
		if (
			condition === 'container_type'
			&& !isContainerTypeIncluded(container_types, conditionObj[condition])
		) {
			pushControl = false;
		}
		if (condition === 'document') {
			const { timing, type } = conditionObj[condition];
			const isDocs = isDocPresent(documents, type);
			if (timing === 'before_upload' && isDocs) {
				pushControl = false;
			}
			if (timing === 'after_upload' && !isDocs) {
				pushControl = false;
			}
		}
		if (condition === 'state' && !conditionObj[condition].includes(state)) {
			pushControl = false;
		}
	});
	return pushControl;
};

const controls = (data, services = []) => {
	const controlToSend = [];
	allControls.forEach((control) => {
		const canPush = pushItem(data, control);
		if (canPush) {
			if (control.name === 'bl_type') {
				const blTypeConditions = blTypeOptions(services)?.conditions;
				const { rfs = true, sob = true } = blTypeConditions;
				const options = control.options.filter((option) => {
					if (rfs === false && option.value === 'rfs') {
						return false;
					}
					if (sob === false && option.value === 'sob') {
						return false;
					}
					return true;
				});
				controlToSend.push({ ...control, options });
			} else {
				controlToSend.push(control);
			}
		}
	});
	return controlToSend;
};
export default controls;
