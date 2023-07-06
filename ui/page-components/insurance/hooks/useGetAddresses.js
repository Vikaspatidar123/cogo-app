import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';

const useGetAddresses = ({ uploadType = '' }) => {
	const { profile } = useSelector((state) => state);
	const { organization = '' } = profile || {};
	const { id = '' } = organization || {};

	const [{ loading, data }, trigger] = useRequest(
		{
			method : 'get',
			url    : 'list_address_for_insurance',
		},
		{ autoCancel: false, manual: true },
	);

	const fetchAddresses = useCallback(async () => {
		try {
			await trigger({
				params: {
					organization_id : id,
					billing_type    : uploadType,
				},
			});
		} catch (error) {
			console.log(getApiErrorString(error));
		}
	}, [id, trigger, uploadType]);

	useEffect(() => {
		if (uploadType && id) {
			fetchAddresses();
		}
	}, [fetchAddresses, id, profile, uploadType]);

	return { data, loading, refetch: fetchAddresses };
};

export default useGetAddresses;
