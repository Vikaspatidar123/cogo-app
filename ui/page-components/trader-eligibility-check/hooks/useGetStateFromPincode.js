import { Toast } from '@cogoport/components';
import { useEffect } from 'react';

import useSearchQuery from './useSearchQuery';

import { useRequest } from '@/packages/request';

const useGetStateFromPincode = ({ watchPincode = undefined, setCityState, watchCountry }) => {
	const { debounceQuery, query } = useSearchQuery();

	useEffect(() => {
		debounceQuery(watchPincode);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watchPincode]);

	const [{ loading }, trigger] = useRequest({
		url    : 'list_locations',
		method : 'get',
	}, { manual: true });

	const responseCity = async () => {
		try {
			const res = await trigger({
				params: {
					filters: {
						postal_code : query,
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

	useEffect(() => {
		if (query)responseCity();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query]);

	return {
		cityLoading: loading,
	};
};
export default useGetStateFromPincode;
