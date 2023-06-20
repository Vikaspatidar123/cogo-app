import { isEmpty, upperCase } from '@cogoport/utils';
import { useCallback, useEffect, useState } from 'react';

import headerFormControls, { defaultValues } from '../configuration/headerFormControls';

import useGetOperatorList from './useGetOperatorList';
import useRedirectFn from './useRedirectFn';

import { useForm } from '@/packages/forms';
import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const API_MAPPING = {
	ocean: {
		operatorApi : '/get_shipping_line_for_container_no',
		createApi   : '/create_saas_container_subscription',
		payloadKey  : 'container_no',
		operatorKey : 'shippingLine',
		threshold   : 11,
	},
	air: {
		operatorApi : '/get_airline_from_airway_bill',
		createApi   : '/create_saas_air_subscription',
		payloadKey  : 'airway_bill_no',
		operatorKey : 'airLine',
		threshold   : 3,
	},
};

const useCreateTracker = () => {
	const { query } = useRouter();
	const [trackingType, setTrackingType] = useState('ocean');

	const { branch_id } = query || {};

	const { operatorApi, createApi, payloadKey, operatorKey, threshold } = API_MAPPING[trackingType];

	const [{ data }, trigger] = useRequest({
		method : 'get',
		url    : operatorApi,
	}, { manual: true });

	const [{ loading }, createTrigger] = useRequest({
		method : 'post',
		url    : createApi,
	}, { manual: true });

	const { shippingLineData = [], airLineData = [] } = useGetOperatorList();
	const { redirectToTracker } = useRedirectFn();

	const formHook = useForm();
	const { watch, reset, setValue } = formHook;
	const shipmentNumber = watch('shipmentNumber');

	const controls = headerFormControls({ trackingType, shippingLineData, airLineData });

	const getOperatorInfo = useCallback(({ shipmentNo }) => {
		try {
			trigger({
				params: {
					[payloadKey]: upperCase(shipmentNo),
				},
			});
		} catch (err) {
			console.log(err);
		}
	}, [payloadKey, trigger]);

	const createTracker = async ({ payload }) => {
		try {
			const res = await createTrigger({
				data: {
					...payload,
					organization_branch_id: branch_id,
				},
			});
			const { id } = res?.data || {};
			redirectToTracker({ type: trackingType, id, isFirst: true });
		} catch (err) {
			console.log(err, 'err');
		}
	};

	const prefillOpertorField = useCallback(({ shipmentNo }) => {
		getOperatorInfo({ shipmentNo });
	}, [getOperatorInfo]);

	useEffect(() => {
		reset(defaultValues);
	}, [reset, trackingType]);

	useEffect(() => {
		if (shipmentNumber?.length >= threshold) {
			prefillOpertorField({ shipmentNo: shipmentNumber });
		}
	}, [prefillOpertorField, shipmentNumber, threshold]);

	useEffect(() => {
		if (!isEmpty(data)) {
			const { result = {}, id = '' } = data || {};
			const opertorValue = result?.shipping_line_id || id;
			setValue(operatorKey, opertorValue);
		}
	}, [data, operatorKey, setValue]);

	const onSubmitHandler = (formData) => {
		const { airLine = '', shipmentNumber: shipmentNo = '', shippingLine = '' } = formData || {};

		const payloadMapping = {
			ocean: {
				shipping_line_id : shippingLine,
				search_value     : shipmentNo,
			},
			air: {
				airline_id     : airLine,
				airway_bill_no : shipmentNo,
			},
		};
		const payload = payloadMapping[trackingType];

		createTracker({ payload });
	};

	return {
		loading, getOperatorInfo, formHook, setTrackingType, trackingType, controls, onSubmitHandler,
	};
};

export default useCreateTracker;
