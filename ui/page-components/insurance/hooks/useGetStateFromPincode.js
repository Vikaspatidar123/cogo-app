import { Toast } from '@cogoport/components';
import { useCallback, useEffect } from 'react';

import { useRequest } from '@/packages/request';

const useGetStateFromPincode = ({ watchPincode }) => {
	const COUNTRY_INDIA_ID = '541d1232-58ce-4d64-83d6-556a42209eb7';
	const [{ data, loading }, trigger] = useRequest(
		{ method: 'get', url: 'list_locations' },
		{ manual: true },
	);
	const responseCity = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						postal_code : watchPincode,
						type        : 'pincode',
						country_id  : COUNTRY_INDIA_ID,
					},
					includes: { country: '', region: '', city: '' },
				},
			});
		} catch (error) {
			Toast.error(error?.error?.message, {
				style: {
					color: 'black',
				},
			});
		}
	}, [trigger, watchPincode]);

	useEffect(() => {
		if (watchPincode && watchPincode?.length === 6) {
			responseCity();
		}
	}, [responseCity, watchPincode]);

	return {
		cityState   : data?.list?.[0],
		cityLoading : loading,
	};
};
export default useGetStateFromPincode;
