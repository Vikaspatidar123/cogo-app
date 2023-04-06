import { useState, useEffect } from 'react';

import prepareSteps from '../../../utils/prepareSteps';

const injectUiConfigs = (config, task, primary_service) => {
	const pg = config?.task_config || {};

	const config_modified = {
		label      : pg.label,
		task_type  : pg.task_type,
		created_at : pg.created_at,
		task       : pg.task,
		steps      : prepareSteps(pg.ui_config, task, primary_service),
	};

	return config_modified;
};
const useTaskExecution = ({
	task = {},
	data,
	primary_service,
	services,
	shipment_data = {},
}) => {
	const rawTaskUiResponse = data || {};

	const dataConfig = injectUiConfigs(rawTaskUiResponse, task, primary_service);

	if (shipment_data.shipment_type === 'fcl_freight_local') {
		const data_service =			(shipment_data.all_services || []).find(
			(item) => item.service_type === 'fcl_freight_local_service',
		) || {};

		if (data_service.nomination_type === 'agent' && data_service.bl_category === 'mbl') {
			(dataConfig.steps || []).shift();
		}
	}

	const serviceIdMapping = {};

	const idCheck = {};
	(services || []).forEach((obj) => {
		if (!Array.isArray(serviceIdMapping[`${obj.service_type}.id`])) {
			serviceIdMapping[`${obj.service_type}.id`] = [];
		}
		if (!idCheck[obj.id]) {
			idCheck[obj.id] = true;
			serviceIdMapping[`${obj.service_type}.id`].push(obj.id);
		}
	});

	let intialStep = 0;
	if (task.tags && task.tags.length) {
		intialStep = Number(task.tags[0]) + 1;

		if (intialStep > (dataConfig.steps || []).length - 1 && intialStep !== 0) {
			intialStep = (dataConfig.steps || []).length - 1;
		}
	}

	const [currentStep, setCurrentStep] = useState(intialStep);

	useEffect(() => {
		setCurrentStep(intialStep);
	}, [intialStep]);

	return {
		steps: dataConfig.steps,
		rawTaskUiResponse,
		currentStep,
		serviceIdMapping,
		setCurrentStep,
	};
};

export default useTaskExecution;
