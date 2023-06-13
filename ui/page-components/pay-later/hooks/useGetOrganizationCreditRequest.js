import { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useRequest } from '@/packages/request';

const useGetOrganizationCreditRequest = () => {
	const { profile:{ organization } } = useSelector((state) => state);
	const [{ loading, data }, trigger] = useRequest(
		{
			method : 'get',
			url    : 'get_organization_credit_request',
		},
		{
			manual     : true,
			autoCancel : false,
		},
	);

	const getOrganizationCreditRequest = useCallback(() => {
		try {
			trigger({
				params: {
					organization_id: organization?.id,
				},
			});
		} catch (e) {
			console.log(e);
		}
	}, [organization?.id, trigger]);

	useEffect(() => {
		getOrganizationCreditRequest();
	}, [getOrganizationCreditRequest]);

	return {
		loading,
		data,
		getOrganizationCreditRequest,
	};
};

export default useGetOrganizationCreditRequest;
