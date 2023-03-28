import { useFormCogo } from '@cogoport/front/hooks';
import { useImperativeHandle } from 'react';

import getControls from './utils/controls';

const CARGO_HANDLING_VALUE_CONTROL_NAMES_MAPPING = {
	stuffing_at_factory : ['cargo_handling', 'location', 'address'],
	stuffing_at_dock    : [
		'cargo_handling',
		'location',
		'address',
		'truck_type',
		'trucks_count',
	],
};

const formatFormValues = ({ values }) => {
	const { cargo_handling } = values || {};

	const controlNames =		CARGO_HANDLING_VALUE_CONTROL_NAMES_MAPPING[cargo_handling] || [];

	const formattedValues = {};
	controlNames.forEach((controlName) => {
		const { [controlName]: value } = values || {};

		formattedValues[controlName] = value;
	});

	return formattedValues;
};

const imperativeHandle = {
	onSubmit: ({ values }) => ({
		hasError : false,
		values   : formatFormValues({ values }),
	}),
	onError      : (errors) => ({ hasError: true, errors }),
	handleSubmit : ({ formHandleSubmit }) => {
		const { onSubmit, onError } = imperativeHandle;

		return new Promise((resolve) => {
			formHandleSubmit(
				(values) => resolve(onSubmit({ values, formatFormValues })),
				(errors) => resolve(onError(errors)),
			)();
		});
	},
};

const useDoorPickupForm = (props, ref) => {
	const { formValues } = props;

	const controls = getControls({ values: formValues });

	const formProps = useFormCogo(controls);
	const { fields, handleSubmit, watch } = formProps;

	const watchCargoHandling = watch('cargo_handling') || '';

	const showFields = {};
	Object.keys(fields).forEach((controlName) => {
		let showField = true;

		if (['truck_type', 'trucks_count'].includes(controlName)) {
			showField = watchCargoHandling === 'stuffing_at_dock';
		}

		showFields[controlName] = showField;
	});

	useImperativeHandle(ref, () => {
		const { handleSubmit: handleSubmitImperativeHandle } = imperativeHandle;

		return {
			handleSubmit: () => handleSubmitImperativeHandle({
				formHandleSubmit: handleSubmit,
			}),
		};
	});

	return {
		controls,
		formProps,
		showFields,
	};
};

export default useDoorPickupForm;
