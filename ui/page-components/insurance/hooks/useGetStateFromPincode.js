import { Toast } from '@cogoport/components';
import { useMemo } from 'react';

import { useRequest } from '@/packages/request';

const useGetStateFromPincode = ({ watchPincode, setCityState, insuranceType }) => {
	const COUNTRY_INDIA_ID = '541d1232-58ce-4d64-83d6-556a42209eb7';
	const { trigger, loading } = useRequest(
		{ method: 'get', url: 'list_locations' },
		{ manual: true },
	);
	const responseCity = async () => {
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
	};
	useMemo(() => {
		if (watchPincode !== '' && watchPincode?.length === 6) responseCity();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watchPincode, insuranceType]);
	return {
		cityLoading: loading,
	};
};
export default useGetStateFromPincode;
