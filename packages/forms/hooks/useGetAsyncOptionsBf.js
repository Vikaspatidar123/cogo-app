import { merge } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import { useRequestBf } from '../../request';

import useDebounceQuery from './useDebounceQuery';

function useGetAsyncOptionsBf({
	endpoint = '',
	initialCall = false,
	valueKey = '',
	labelKey = '',
	params = {},
	authKey = '',
	getModifiedOptions = (a) => a,
}) {
	const { query, debounceQuery } = useDebounceQuery();
<<<<<<< HEAD
	const [storeOptions, setStoreOptions] = useState([]);

=======
>>>>>>> a22cd7bad8f7ffd93144a38a65f348f3be17c96d
	const [{ data, loading }] = useRequestBf({
		url    : endpoint,
		method : 'GET',
		authKey,
		params : merge(params, { query }),
	}, { manual: !(initialCall || query) });
	const options = getModifiedOptions(data?.list || []);
	const dependency = (data?.list || []).map(({ id }) => id).join('');

	useEffect(() => {
		if (options.length > 0) { setStoreOptions([...options]); }
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dependency]);

	const [{ loading: loadingSingle }, triggerSingle] = useRequestBf({
		url    : endpoint,
		method : 'GET',
		authKey,
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

export default useGetAsyncOptionsBf;
