import { startCase } from '@cogoport/utils';

const rollOverControls = (configs, list) => {
	const { controls: controlObj, rollover_reasons } = configs;
	const controls = [...controlObj.upper, ...controlObj.lower];
	const newControls = controls.map((control) => {
		if (control.name === 'rollover_reason') {
			return {
				...control,
				options: rollover_reasons.map((item) => ({ label: startCase(item), value: item })),
			};
		}
		if (control.name === 'containers') {
			return {
				...control,
				options: list.map((item, i) => ({
					label : item.container_number || `Container ${i + 1}`,
					value : item.id,
				})),
			};
		}
		return control;
	});
	return newControls;
};

export default rollOverControls;
