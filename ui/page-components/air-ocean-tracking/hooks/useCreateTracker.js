import { useCallback, useEffect, useState } from 'react';

import headerFormControls, { defaultValues } from '../configuration/headerFormControls';

import { useForm } from '@/packages/forms';
import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const API_MAPPING = {
	ocean: {
		operatorApi : '/get_shipping_line_for_container_no',
		createApi   : '/create_saas_container_subscription',
		payloadKey  : 'container_no',
	},
	air: {
		operatorApi : '/get_airline_from_airway_bill',
		createApi   : '/create_saas_air_subscription',
		payloadKey  : 'airway_bill_no',
	},
};

const useCreateTracker = () => {
	const { query } = useRouter();
	const [trackingType, setTrackingType] = useState('ocean');

	const { branch_id } = query || {};

	const { operatorApi, createApi, payloadKey } = API_MAPPING[trackingType];

	const [{ data }, trigger] = useRequest({
		method : 'get',
		url    : operatorApi,
	}, { manual: true });

	const [{ loading }, createTrigger] = useRequest({
		method : 'post',
		url    : createApi,
	}, { manual: true });

	const formHook = useForm();
	const { watch, reset } = formHook;
	const shipmentNumber = watch('shipmentNumber');

	const controls = headerFormControls({ trackingType });

	const getOperatorInfo = useCallback(({ shipmentNo }) => {
		try {
			trigger({
				params: {
					[payloadKey]: shipmentNo,
				},
			});
		} catch (err) {
			console.log(err);
		}
	}, [payloadKey, trigger]);

	const createTracker = ({ payload }) => {
		try {
			createTrigger({
				data: {
					...payload,
					organization_branch_id: branch_id,
				},
			});
		} catch (err) {
			console.log(err, 'err');
		}
	};

	const prefillOpertorField = useCallback(() => {
		getOperatorInfo({ containerNo: shipmentNumber });
	}, [getOperatorInfo, shipmentNumber]);

	useEffect(() => {
		reset(defaultValues);
	}, [reset, trackingType]);

	useEffect(() => {
		if (shipmentNumber?.length >= 10) {
			prefillOpertorField();
		}
	}, [prefillOpertorField, shipmentNumber]);

	const onSubmitHandler = (data) => {
		let payload = {};
		if (trackingType === 'ocean') {
			payload = {
				shipping_line_id : '',
				search_type      : '',
				search_value     : '',
			};
		}
		payload = {
			airline_id     : '',
			airway_bill_no : '',
		};
		createTracker({ payload });
	};

	return {
		loading, getOperatorInfo, formHook, setTrackingType, trackingType, controls, onSubmitHandler,
	};
};

export default useCreateTracker;
