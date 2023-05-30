import { merge } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import { useRequest } from '../../request';

import useDebounceQuery from './useDebounceQuery';

function useGetAsyncOptions({
	endpoint = '',
	initialCall = false,
	valueKey = '',
	labelKey = '',
	params = {},
	getModifiedOptions = (options) => options,
}) {
	console.log('🚀 ~ file: useGetAsyncOptions.js:16 ~ endpoint:', endpoint);
	const { query, debounceQuery } = useDebounceQuery();
	const [storeOptions, setStoreOptions] = useState([]);

	const [{ data, loading }] = useRequest({
		url    : endpoint,
		// === 'list_locations' ? 'api.cogoport.com/location/list_locations' : endpoint,
		method : 'GET',
		params : merge(params, { filters: { q: query } }),
	}, { manual: !(initialCall || query) });
	const options = getModifiedOptions(data?.list || []);
	const dependency = (data?.list || []).map(({ id }) => id).join('');
	useEffect(() => {
		if (options.length > 0) { setStoreOptions([...options]); }
	}, [dependency, options]);

	const [{ loading: loadingSingle }, triggerSingle] = useRequest({
		url    : endpoint,
		method : 'GET',
	}, { manual: true });

	const onSearch = (inputValue) => {
		debounceQuery(inputValue);
	};

	const onHydrateValue = async (value) => {
		const checkOptionsExist = options.filter((item) => item[valueKey] === value);
		if (checkOptionsExist.length > 0) return checkOptionsExist[0];
		try {
			const res = await triggerSingle({
				params: merge(params, { filters: { [valueKey]: value } }),
			});
			const list = res?.data?.list || [];
			if (list.length > 0) {
				setStoreOptions([...storeOptions, ...getModifiedOptions(list)]);
			}
			return getModifiedOptions(list)?.[0] || null;
		} catch (err) {
			return {};
		}
	};

	return {
		loading : loading || loadingSingle,
		onSearch,
		options : storeOptions,
		labelKey,
		valueKey,
		onHydrateValue,
	};
}

export default useGetAsyncOptions;
