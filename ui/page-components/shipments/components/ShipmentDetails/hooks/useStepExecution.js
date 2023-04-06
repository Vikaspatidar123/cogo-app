import { useState } from 'react';

import getShowTaskFields from '../../../utils/getShowTaskFields';
import injectValues from '../../../utils/injectValues';

import { useForm } from '@/packages/forms';

const truck_number_options = [
	'upload_eway_bill_copy',
	'upload_lorry_receipt',
	'upload_trucking_incidental_charge',
	'upload_advance_payment',
	'upload_commercial_invoice',
];

const populateControls = (
	controls,
	getApisData,
	task,
	stepConfig,
) => {
	const finalControls = controls;

	if (
		task.task === 'mark_completed'
		&& task.shipment_type === 'ftl_freight'
		&& task.state === 'cargo_dropped'
	) {
		const getData = getApisData.list_shipment_services.filter(
			(obj) => obj.service_type !== 'subsidiary_service',
		);
		finalControls.forEach((control, index) => {
			if (control.name === 'documents') {
				finalControls[index].value = getData.map((item) => ({
					service_id    : item.id,
					truck_number  : item.truck_number,
					delivery_date : '',
				}));
			}
		});
		return finalControls;
	}

	if (
		truck_number_options.includes(task.task)
		&& task.shipment_type === 'ftl_freight'
	) {
		const getData = getApisData?.list_shipment_services.filter(
			(obj) => obj.service_type !== 'subsidiary_service',
		);

		(finalControls || []).forEach((control, index) => {
			if (control.type === 'fieldArray') {
				(control.controls || []).forEach((controlObj, ind) => {
					if (controlObj.name === 'service_id') {
						finalControls[index].controls[ind].options = (getData || [])?.map(
							(obj) => ({
								label : obj.truck_number || 'Truck_number',
								value : obj.id,
							}),
						);
					}
				});
			}
		});
		return finalControls;
	}

	if (
		truck_number_options.includes(task.task)
		&& task.shipment_type === 'haulage_freight'
	) {
		const getData = getApisData?.list_shipment_services.filter(
			(obj) => obj.service_type !== 'subsidiary_service',
		);

		(finalControls || []).forEach((control, index) => {
			if (control.type === 'fieldArray') {
				(control.controls || []).forEach((controlObj, ind) => {
					if (controlObj.name === 'service_id') {
						finalControls[index].controls[ind].options = (getData || [])?.map(
							(obj) => ({
								label : obj.trailer_number || 'Trailer_number',
								value : obj.id,
							}),
						);
					}
				});
			}
		});
		return finalControls;
	}

	const optionsConfig = stepConfig?.assign_options || [];
	Object.keys(optionsConfig).forEach((key) => {
		const optionsDataSource =			getApisData[optionsConfig[key]?.key_from_apis_data];
		const options = [];
		if (Array.isArray(optionsDataSource)) {
			optionsDataSource?.forEach((listItem) => {
				const evaluated_label_value = optionsConfig[key]?.eval_label_key
					? eval(optionsConfig[key]?.label_key)
					: listItem[optionsConfig[key]?.label_key];

				const evaluated_option_value = optionsConfig[key]?.eval_value_key
					? eval(optionsConfig[key]?.value_key)
					: listItem[optionsConfig[key]?.value_key];
				options.push({
					label : evaluated_label_value,
					value : evaluated_option_value,
				});
			});
		}
		finalControls.forEach((control, index) => {
			if (control.name === key && control.type === 'select') {
				finalControls[index].options = options;
			}
		});
	});

	return controls;
};

const injectForm = (config, formProps, formValues) => {
	const showElements = getShowTaskFields(config.controls, formValues);

	return {
		finalConfig: {
			...config,
			formProps: { ...formProps },
		},
		controls: config.controls,
		showElements,
	};
};

export const useStepExecuton = ({
	task,
	stepConfig,
	shipment_data,
	getApisData,
	selectedMail,
	services,
}) => {
	const populatedControls = populateControls(
		stepConfig.controls,
		getApisData,
		task,
		shipment_data,
		stepConfig,
		services,
	);

	const valueInjectedControls = injectValues(
		selectedMail,
		populatedControls,
		task,
		getApisData,
		shipment_data,
		stepConfig,
	);

	const formProps = useForm(valueInjectedControls || []);

	const formValues = formProps.watch();

	const { finalConfig, controls, showElements } = injectForm(
		stepConfig,
		formProps,
		task,
		shipment_data,
		formValues,
	);

	const groupSubHeadings = {};
	if (task.task === 'mark_confirmed') {
		(controls || []).forEach((obj) => {
			if (!Array.isArray(groupSubHeadings[obj.subHeading])) {
				groupSubHeadings[obj.subHeading] = [];
				groupSubHeadings[obj.subHeading].push(obj);
			} else {
				groupSubHeadings[obj.subHeading].push(obj);
			}
		});
	}

	const [error, setError] = useState({});

	const { control, handleSubmit } = finalConfig.formProps;
	const [isLoading, setIsLoading] = useState(false);

	const onError = (err) => {
		setError(err);
	};

	return {
		finalConfig,
		controls,
		showElements,
		error,
		setError,
		control,
		handleSubmit,
		isLoading,
		setIsLoading,
		onError,
		groupSubHeadings,
	};
};
