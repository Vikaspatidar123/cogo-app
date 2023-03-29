import { Toast } from '@cogoport/components';
import { useState, useEffect, useCallback } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

function useShareOption({
	saasSubscriptionId,
}) {
	const [shareDetailsList, setShareDetailsList] = useState([]);
	const { profile, general } = useSelector((s) => s);
	const [{ loading }, trigger] = useRequest({
		url    : 'create_saas_air_subscription_share',
		method : 'post',
	}, { manual: true });
	const [{ loading:apiLoading }, fetch] = useRequest({
		url    : 'get_saas_air_subscription_shared_details',
		method : 'get',
	}, { manual: true });

	const fetchShareDetails = useCallback(async () => {
		try {
			const res = await fetch({
				params: { saas_air_subscription_id: saasSubscriptionId, organization_id: profile.organization.id },
			});

			const { hasError } = res || {};
			if (hasError) throw new Error();

			const { data } = res;
			setShareDetailsList(data);
		} catch (err) {
			Toast.error("Couln't fetch share details", err);
		}
	}, [fetch, profile.organization.id, saasSubscriptionId]);

	const onSubmit = async (values) => {
		const requestData = {
			saas_air_subscription_id         : saasSubscriptionId,
			email                            : values.email,
			shared_by_organization_id        : profile.organization.id,
			shared_by_organization_branch_id : general?.query?.branch_id,
		};

		try {
			const res = await trigger({ data: requestData });

			const { hasError } = res || {};
			if (hasError) throw new Error();

			setShareDetailsList([...shareDetailsList, { email: values.email }]);
		} catch (err) {
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
