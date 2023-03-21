import { Toast } from '@cogoport/components';
import { useMemo, useCallback } from 'react';

import { useRequest } from '@/packages/request';

const useGetStateFromPincode = ({ watchPincode, setCityState }) => {
	const COUNTRY_INDIA_ID = '541d1232-58ce-4d64-83d6-556a42209eb7';
	const [{ loading }, trigger] = useRequest(
		{ method: 'get', url: 'list_locations' },
		{ manual: true },
	);
	const responseCity = useCallback(async () => {
		try {
			const res = await trigger({
				params: {
					filters: {
						postal_code : watchPincode,
						type        : 'pincode',
						country_id  : COUNTRY_INDIA_ID,
					},
					includes: { country: '', region: '', city: '' },
				},
			});
			if (res?.data) {
				setCityState(res?.data);
			}
		} catch (error) {
			Toast.error(error?.error?.message, {
				style: {
					color: 'black',
				},
			});
		}
	}, [setCityState, trigger, watchPincode]);

	useMemo(() => {
		if (watchPincode !== '' && watchPincode?.length === 6) responseCity();
	}, [watchPincode, responseCity]);
	return {
		cityLoading: loading,
	};
};
export default useGetStateFromPincode;
