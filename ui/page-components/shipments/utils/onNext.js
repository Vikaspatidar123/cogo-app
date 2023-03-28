// import { getFormattedValues } from '@cogo/app-common';
// import isEmpty from '@cogo/utils/isEmpty';
// import merge from '@cogo/utils/merge';

// import { postData } from '../apis';
import { isEmpty, merge } from '@cogoport/utils';

import checkRequirement from './checkRequirement';
import formatValues from './format-values';
import preUpdateData from './pre-update';

import getFormattedValues from '@/ui/commons/utils/getFormattedValues';

const onNext = async (
	state,
	{
		setIsLoading,
		getValues,
		config,
		shipment_data,
		data,
		response,
		scope,
		isLastStep,
		handleActions,
		onAskMoreDetails,
		setMessage,
		allControls,
		hitAtOneGo,
	},
) => {
	setIsLoading(true);
	const rawValues = getValues();
	const values = {};
	if (rawValues) {
		allControls.forEach((control) => {
			if (rawValues[control.name]) {
				values[control.name] = rawValues[control.name];
			}
		});
	}
	let isApiCalled = false;
	const requirementsMatch = checkRequirement({
		values: rawValues,
		config,
		shipment_data,
		setIsLoading,
		setMessage,
	});

	if (!requirementsMatch) {
		return isApiCalled;
	}

	if (rawValues) {
		let dataFromApi = {};
		(config.dataFromApi || []).forEach((item) => {
			if (
				config?.formatType === 'update_carrier_booking_reference_number'
				&& item?.condition?.booking_ref_status
				&& item?.condition?.booking_ref_status === rawValues?.booking_ref_status
			) {
				dataFromApi = { ...dataFromApi, [item.value]: undefined };
			} else if (!data[item.key] && item.alt === 'undefined') {
				dataFromApi = { ...dataFromApi, [item.value]: undefined };
			} else {
				dataFromApi = {
					...dataFromApi,
					[item.value]: data[item.key] || item.key,
				};
			}
		});

		let payload = null;
		if (config.payLoadVariable) {
			payload = {
				[config.payLoadVariable]: formatValues(
					getFormattedValues(values),
					config.formatType,
					response,
					shipment_data,
				),
				...dataFromApi,
			};
		} else {
			payload = {
				...formatValues(
					getFormattedValues(values),
					config.formatType,
					response,
				),
				...dataFromApi,
			};
		}

		if (isEmpty(payload)) {
			setIsLoading(false);
		} else {
			await preUpdateData({
				payload,
				shipment_data,
				merge,
				setIsLoading,
				state,
				scope,
				setMessage,
			});
			postData(config.endPoint, merge(payload, state || {}), scope)
				.then((res) => {
					setIsLoading(false);
					if (res.hasError) {
						setMessage({ type: 'error', message: res.messages });
						return isApiCalled;
					}
					isApiCalled = true;
					setMessage({ type: 'success', message: 'Task updated' });
					if (
						config.askMoreDetails
						&& onAskMoreDetails
						&& config.askMoreDetails.isConfirm
					) {
						onAskMoreDetails();
					} else if (isLastStep || !hitAtOneGo) {
						handleActions();
					}
					return isApiCalled;
				})
				.catch((err) => {
					setIsLoading(false);
					setMessage({ type: 'error', message: err.message });
					return isApiCalled;
				});
		}
	}
	return isApiCalled;
};

export default onNext;
