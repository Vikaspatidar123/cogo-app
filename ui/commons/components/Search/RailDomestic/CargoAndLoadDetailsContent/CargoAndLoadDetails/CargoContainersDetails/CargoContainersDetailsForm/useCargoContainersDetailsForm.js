import { useState, useImperativeHandle, useEffect } from 'react';
import { useFormCogo } from '@cogoport/front/hooks';
import { get, isEmpty } from '@cogoport/front/utils';
import containerSizeTypesMapping from './configurations/container-size-types-mapping.json';
import commodityTypeSubTypesMapping from './configurations/commodity-type-sub-types-mapping.json';
import getControls from './utils/controls';

const CARGO_HANDLING_CONTROL_KEYS = ['is_door_pickup', 'is_doorstep_delivery'];

const imperativeHandle = {
	onSubmit: ({
		values,
		validateCargoHandlingData,
		addCargoHandlingDataInFormValues,
	}) => {
		const isValidCargoHandlingData = validateCargoHandlingData({ values });

		if (isValidCargoHandlingData) {
			const newValues = addCargoHandlingDataInFormValues({ values });

			return {
				hasError: false,
				values: newValues,
			};
		}

		return {
			hasError: true,
			errors: {},
		};
	},
	onError: (errors) => {
		return { hasError: true, errors };
	},
	handleSubmit: ({
		formHandleSubmit,
		validateContainersCount,
		validateCargoHandlingData,
		addCargoHandlingDataInFormValues,
	}) => {
		const { onSubmit, onError } = imperativeHandle;

		return new Promise((resolve) => {
			formHandleSubmit(
				(values) => {
					return resolve(
						onSubmit({
							values,
							validateContainersCount,
							validateCargoHandlingData,
							addCargoHandlingDataInFormValues,
						}),
					);
				},
				(errors) => resolve(onError(errors)),
			)();
		});
	},
};

const useCargoContainersDetailsForm = (props, ref) => {
	const { onSaveSuccess, formValues } = props;

	const [state, setState] = useState({
		is_door_pickup: {
			showPopover: false,
			data: get(formValues, 'is_door_pickup_data') || null,
		},
		is_doorstep_delivery: {
			showPopover: false,
			data: get(formValues, 'is_doorstep_delivery_data') || null,
		},
	});

	const controls = getControls({ values: formValues });

	const formProps = useFormCogo(controls);
	const { watch, fields, handleSubmit, getValues, setValue } = formProps;

	const watchContainerSize = watch('container_size');
	const watchCommodityType = watch('commodity_type') || '';
	const watchCommoditySubType = watch('commodity_subtype') || '';

	useEffect(() => {
		const subscription = watch((values, { name }) => {
			if (name === 'container_size') {
				setValue('container_type', '');
			}

			if (name === 'commodity_type') {
				setValue('commodity_subtype', '');
			}

			if (name === 'commodity_subtype') {
				setState((previousState) => {
					return {
						...previousState,
						...CARGO_HANDLING_CONTROL_KEYS.reduce((pv, controlName) => {
							return {
								...pv,
								[controlName]: {
									...(previousState[controlName] || {}),
									showPopover: false,
									data: null,
								},
							};
						}, {}),
					};
				});

				CARGO_HANDLING_CONTROL_KEYS.forEach((key) => setValue(key, []));
			}

			if (CARGO_HANDLING_CONTROL_KEYS.includes(name)) {
				setState((previousState) => {
					return {
						...previousState,
						[name]: {
							...previousState[name],
							showPopover: values[name].includes(true),
						},
					};
				});
			}
		});

		return () => subscription.unsubscribe();
	}, [watch]);

	const cargoHandlingPopover = {
		onSubmitSuccess: ({ controlName, values }) => {
			setState((previousState) => {
				return {
					...previousState,
					[controlName]: {
						...previousState[controlName],
						showPopover: false,
						data: values,
					},
				};
			});
		},
		onClose: ({ controlName }) => {
			setState((previousState) => {
				const data = get(previousState, `[${controlName}].data`) || {};
				if (isEmpty(data)) {
					const values = getValues() || {};

					const value = get(values, controlName) || [];
					const isChecked = value.includes(true);

					if (isChecked) {
						setValue(controlName, []);
					}
				}

				return {
					...previousState,
					[controlName]: {
						...previousState[controlName],
						showPopover: false,
					},
				};
			});
		},
		onClickOutside: ({ controlName }) => {
			setState((previousState) => {
				const data = get(previousState, `[${controlName}].data`) || {};
				if (isEmpty(data)) {
					const values = getValues() || {};

					const value = get(values, controlName) || [];
					const isChecked = value.includes(true);

					if (isChecked) {
						setValue(controlName, []);
					}
				}

				return {
					...previousState,
					[controlName]: {
						...previousState[controlName],
						showPopover: false,
					},
				};
			});
		},
		onClickShowPopover: ({ controlName }) => {
			setState((previousState) => {
				return {
					...previousState,
					[controlName]: {
						...previousState[controlName],
						showPopover: true,
					},
				};
			});
		},
	};

	const showCargoHandlingPopoverIfCheckedAndDataNotPresent = ({ values }) => {
		setState((previousState) => {
			const newState = { ...previousState };

			CARGO_HANDLING_CONTROL_KEYS.forEach((key) => {
				const { data } = state[key];

				const isChecked = (get(values, key) || []).includes(true);
				const isDataPresent = !isEmpty(data || {});

				newState[key] = {
					...newState[key],
					showPopover: isChecked && !isDataPresent,
				};
			});

			return newState;
		});
	};

	const validateCargoHandlingData = ({ values }) => {
		const isCargoHandlingChecked = CARGO_HANDLING_CONTROL_KEYS.some((key) => {
			return state[key].isChecked;
		});

		if (!isCargoHandlingChecked) {
			return true;
		}

		let isAllCheckedOneDataPresent = true;

		CARGO_HANDLING_CONTROL_KEYS.forEach((key) => {
			const { data } = state[key];

			const isChecked = (get(values, key) || []).includes(true);
			const isDataPresent = !isEmpty(data || {});

			if (isAllCheckedOneDataPresent && isChecked && !isDataPresent) {
				isAllCheckedOneDataPresent = false;
			}
		});

		if (isAllCheckedOneDataPresent) {
			showCargoHandlingPopoverIfCheckedAndDataNotPresent({ values });
		}

		return isAllCheckedOneDataPresent;
	};

	const addCargoHandlingDataInFormValues = ({ values }) => {
		let newValues = { ...values };

		CARGO_HANDLING_CONTROL_KEYS.forEach((key) => {
			const { data } = state[key];

			const isChecked = (get(values, key) || []).includes(true);
			const isDataPresent = !isEmpty(data || {});

			if (isChecked && isDataPresent) {
				newValues = {
					...newValues,
					[`${key}_data`]: { ...data },
				};
			}
		});

		return newValues;
	};

	const onSubmit = (values) => {
		const isValidCargoHandlingData =
			validateCargoHandlingData({ values }) || true;

		if (isValidCargoHandlingData) {
			const newValues = addCargoHandlingDataInFormValues({ values });

			onSaveSuccess?.({ values: newValues });
		}
	};

	const mutatedFields = {};
	Object.entries(fields).forEach(([controlName, field]) => {
		let newField = { ...field };

		if (controlName === 'container_type') {
			newField = {
				...field,
				options: containerSizeTypesMapping[watchContainerSize] || [],
				disabled: !watchContainerSize,
			};
		}

		if (controlName === 'commodity_subtype') {
			newField = {
				...field,
				options: commodityTypeSubTypesMapping[watchCommodityType],
				disabled: !watchCommodityType,
			};
		}

		if (CARGO_HANDLING_CONTROL_KEYS.includes(controlName)) {
			newField = {
				...newField,
				disabled: !(watchCommodityType && watchCommoditySubType),
			};
		}

		mutatedFields[controlName] = newField;
	});

	useImperativeHandle(ref, () => {
		const { handleSubmit: handleSubmitImperativeHandle } = imperativeHandle;

		return {
			handleSubmit: () => {
				return handleSubmitImperativeHandle({
					formHandleSubmit: handleSubmit,
					validateCargoHandlingData,
					addCargoHandlingDataInFormValues,
				});
			},
			getValues,
		};
	});

	return {
		controls,
		formProps: { ...formProps, fields: mutatedFields },
		cargoHandlingPopover,
		onSubmit,
		state,
	};
};

export default useCargoContainersDetailsForm;
