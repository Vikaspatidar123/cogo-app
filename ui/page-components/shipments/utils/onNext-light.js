import { Toast } from '@cogoport/components';

import { postData } from '../apis';

import formatValues from './format-values';

import showErrorsInToast from '@/ui/commons/utils/showErrorsInToast';

const handleDirectComplete = ({
	data,
	scope,
	response,
	configs,
	handleActions,
	setIsLoading,
	type = null,
}) => {
	setIsLoading(true);
	const config = configs?.steps[0];
	const state = type === 'cancel' ? config.button.cancel : config.button.value;
	const finalEndPoint =		type === 'cancel' ? config.button?.cancelEndPoint : config.endPoint;
	let dataFromApi = {};
	(config.dataFromApi || []).forEach((item) => {
		if (!data[item.key] && item.alt === 'undefined') {
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
			[config.payLoadVariable]: formatValues(config.formatType, response),
			...dataFromApi,
		};
	} else {
		payload = {
			...formatValues(config.formatType, response),
			...dataFromApi,
		};
	}
	postData(finalEndPoint, { ...payload, ...(state || {}) }, scope)
		.then((res) => {
			setIsLoading(false);
			if (res.hasError) {
				showErrorsInToast(res.messages);
			} else {
				Toast.success('Task updated');

				handleActions();
			}
		})
		.catch((err) => {
			setIsLoading(false);
			showErrorsInToast(err.messages);
		});
};
export default handleDirectComplete;
