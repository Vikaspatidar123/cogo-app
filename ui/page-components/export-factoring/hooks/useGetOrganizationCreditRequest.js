import { useEffect, useCallback, useState } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetOrganizationCreditRequest = () => {
	const [active, setActive] = useState('');

	const { organization } = useSelector((state) => ({
		organization: state.profile.organization,
	}));
	const [{ loading, data }, trigger] = useRequest(
		{
			method : 'get',
			url    : '/get_credit',
		},
		{
			manual     : true,
			autoCancel : false,
		},
	);

	const getOrganizationCreditRequest = useCallback(async () => {
		try {
			await trigger({
				params: {
					organization_id : organization?.id,
					category        : 'export_factoring',
				},
			});
			setActive(data?.status);
		} catch (e) {
			setActive('awaiting_user_inputs');
		}
	}, [data?.status, organization?.id, trigger]);

	useEffect(() => {
		getOrganizationCreditRequest();
	}, [getOrganizationCreditRequest]);

	return {
		loading,
		data,
		getOrganizationCreditRequest,
		active,
	};
};

export default useGetOrganizationCreditRequest;

