import { Toast } from '@cogoport/components';
import { useMemo } from 'react';

import { useRequest } from '@/packages/request';

const useGetStateFromPincode = ({ watchPincode, setCityState, watchCountry }) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'list_locations',
		method : 'get',
	}, { manual: false });

	const responseCity = async () => {
		try {
			const res = await trigger({
				params: {
					filters: {
						postal_code : watchPincode,
						type        : 'pincode',
						country_id  : watchCountry,
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
		if (watchPincode !== '') responseCity();
	}, [watchPincode]);
	return {
		cityLoading: loading,
	};
};
export default useGetStateFromPincode;
