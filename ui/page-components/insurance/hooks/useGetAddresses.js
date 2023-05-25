import { Toast } from '@cogoport/components';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';

const useGetAddresses = ({ uploadType = '' }) => {
	const { profile } = useSelector((state) => state);

	const { trigger, loading, data } = useRequest(
		{
			method : 'get',
			url    : 'list_address_for_insurance',
		},

	);

	const fetchAddresses = useCallback(async () => {
		try {
			await trigger({
				params: {
					organization_id : profile?.organization?.id,
					billing_type    : uploadType,
				},
			});
		} catch (error) {
			Toast.error(getApiErrorString(error));
		}
	}, [profile?.organization?.id, trigger, uploadType]);

	useEffect(() => {
		if (uploadType) {
			fetchAddresses();
		}
	}, [fetchAddresses, uploadType]);

	return { data, loading, refetch: fetchAddresses };
};

export default useGetAddresses;
