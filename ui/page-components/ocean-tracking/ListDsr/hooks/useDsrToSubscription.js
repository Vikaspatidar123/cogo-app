import { Toast } from '@cogoport/components';
import { useState } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useDsrToSubscription = () => {
	const { general } = useSelector((s) => s);

	const [loading, setLoading] = useState(false);
	const [{ loading:apiloading1 }, trigger1] = useRequest({
		url    : 'create_dsr_to_subscription_mapping',
		method : 'post',
	}, { manual: true });
	const [{ loading:apiloading2 }, trigger2] = useRequest({
		url    : 'update_dsr_to_subscription_mapping',
		method : 'post',
	}, { manual: true });

	const dsrToSubscription = async (value, dsrId, subList = []) => {
		try {
			setLoading(true);
			let type = 'new';
			if (subList?.length > 0) {
				type = 'update';
			}

			if (type === 'new') {
				const requestData = {
					saas_dsr_id     : dsrId,
					subscription_id : value,
				};
				const res = await trigger1({ data: requestData });
				const { hasError } = res || {};
				const message = res?.data?.message;
				if (hasError) throw new Error();
				if (message) throw new Error(message);

				return res;
			}

			const shipmentsToRemove = subList
				.filter((item) => !value.some((item2) => item2 === item.id))
				.map((item) => item.id);

			// shipemnts that are not present in subList
			const shipmentsToKeep = value.filter((item) => !subList.some((item2) => item2.id === item));
			const requestData = {
				saas_dsr_id     : dsrId,
				subscription_id : shipmentsToRemove,
				status          : false,
			};
			const requestData2 = {
				saas_dsr_id     : dsrId,
				subscription_id : shipmentsToKeep,
				status          : true,
			};
			const res = await await trigger2({ data: requestData });
			const { hasError } = res || {};
			const message = res?.data?.message;
			if (hasError) throw new Error();
			if (message) throw new Error(message);
			// return res;
			const res1 = await await trigger2({ data: requestData2 });
			const { hasError1 } = res1 || {};
			const message1 = res1?.data?.message;
			if (hasError1) throw new Error();
			if (message1) throw new Error(message);

			setLoading(false);

			return true;
		} catch (err) {
			Toast.error(
				err?.message || 'Unable to create status report. Please try again.',
			);
			setLoading(false);
			return false;
		}
	};

	return { loading, dsrToSubscription };
};

export default useDsrToSubscription;
