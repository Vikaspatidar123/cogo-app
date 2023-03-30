import { merge } from '@cogoport/utils';
import {
	useEffect, useState,
	// useMemo
} from 'react';

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
	const [storeOptions, setStoreOptions] = useState([]);

	const [{ data, loading }] = useRequestBf({
		url    : endpoint,
		method : 'GET',
		authKey,
		params : merge(params, { query }),
	}, { manual: !(initialCall || query) });
	// const options = useMemo(() => getModifiedOptions(data?.list || []), [data, getModifiedOptions]);
	const options = data?.list || [];
	const optionValues = options.map((item) => item[valueKey]);

	// useEffect(() => {
	// 	if (options.length > 0) { setStoreOptions([...options]); }
	// }, [dependency, options]);

	useEffect(() => {
		storeOptions.push(...options);
		setStoreOptions(storeOptions);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(optionValues)]);

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
