import { useCallback, useEffect } from 'react';

import useSearchQuery from './useSearchQuery';

import { useRequest } from '@/packages/request';

const useGetStateFromPincode = ({
	watchPincode = undefined,
	setCityState,
	watchCountry,
}) => {
	const { debounceQuery, query } = useSearchQuery();

	useEffect(() => {
		debounceQuery(watchPincode);
	}, [debounceQuery, watchPincode]);

	const [{ loading }, trigger] = useRequest(
		{
			url    : 'list_locations',
			method : 'get',
		},
		{ manual: true },
	);
	const responseCity = useCallback(async () => {
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
			console.log(error);
		}
	}, [query, setCityState, trigger, watchCountry]);

	useEffect(() => {
		if (query) responseCity();
	}, [query, responseCity]);

	return {
		cityLoading: loading,
	};
};
export default useGetStateFromPincode;
