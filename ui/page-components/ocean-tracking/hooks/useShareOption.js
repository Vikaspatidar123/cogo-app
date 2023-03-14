import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

function useShareOption({

	saasSubscriptionId,

}) {
	const [shareDetailsList, setShareDetailsList] = useState([]);
	const { general } = useSelector((s) => s);
	const [{ loading }, trigger] = useRequest({
		url    : 'create_saas_container_subscription_share',
		method : 'post',
	}, { manual: true });
	const [{ loading:apiLoading }, fetch] = useRequest({
		url    : 'get_saas_container_subscription_shared_details',
		method : 'get',
	}, { manual: true });

	// const disableTracker = async () => {
	// 	let requestData = {};
	// 	requestData = {
	// 		status                         : 'active',
	// 		saas_container_subscription_id : saasSubscriptionId,
	// 	};

	// 	try {
	// 		const res = await trigger({ data: requestData });
	// 		const { hasError, data } = res || {};
	// 		Toast.error(data?.message);
	// 		if (hasError) throw new Error();

	// 		console.log(res, 'res');
	// 	} catch (err) {
	// 		Toast.error(err?.data?.message);
	// 	}
	// };

	const fetchShareDetails = async () => {
		try {
			// setLoadingShareDetails(true);

			const res = await fetch({
				params: { saas_container_subscription_id: saasSubscriptionId },
			});

			const { hasError } = res || {};
			if (hasError) throw new Error();

			const { data } = res;
			// setLoadingShareDetails(false);
			setShareDetailsList(data);
		} catch (err) {
			Toast.error("Couln't fetch share details", err);
			// setLoadingShareDetails(false);
		}
	};

	const onSubmit = async (values) => {
		const requestData = {
			saas_container_subscription_id   : saasSubscriptionId,
			email                            : values.email,
			name                             : '',
			shared_by_organization_branch_id : general?.query?.branch_id,
		};

		try {
			// setLoading(true);

			const res = await trigger({ data: requestData });

			const { hasError } = res || {};
			if (hasError) throw new Error();

			setShareDetailsList([...shareDetailsList, { email: values.email }]);
			// setLoading(false);
		} catch (err) {
			// setLoading(false);
			Toast.error("Couldn't share details", err);
		}
	};
	useEffect(() => {
		fetchShareDetails();
	}, []);

	return {
		loading,
		apiLoading,
		shareDetailsList,
		setShareDetailsList,
		onSubmit,
	};
}

export default useShareOption;
