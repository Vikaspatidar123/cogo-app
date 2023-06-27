import { merge } from '@cogoport/utils';
import { useEffect, useState, useMemo } from 'react';

import { useRequestBf } from '../../request';

import useDebounceQuery from './useDebounceQuery';

function useGetAsyncOptionsBf({
	endpoint = '',
	initialCall = false,
	valueKey = '',
	labelKey = '',
	params = {},
	authKey = '',
	useQueryKey = false,
	scope,
	getModifiedOptions = (a) => a,
}) {
	const { query, debounceQuery } = useDebounceQuery();
	const [storeOptions, setStoreOptions] = useState([]);

	const [{ data, loading }] = useRequestBf(
		{
			url    : endpoint,
			method : 'GET',
			authKey,
			scope,
			params : merge(params, { query }),
		},
		{ manual: !(initialCall || query) },
	);

	const options = useMemo(() => getModifiedOptions(data?.list || []), [data, getModifiedOptions]);

	useEffect(() => {
		if (options.length > 0) {
			setStoreOptions([...options]);
		}
	}, [options]);

	const [{ loading: loadingSingle }, triggerSingle] = useRequestBf(
		{
			url    : endpoint,
			method : 'GET',
			authKey,
		},
		{ manual: true },
	);

	const onSearch = (inputValue) => {
		debounceQuery(inputValue);
	};

	const onHydrateValue = async (value) => {
		const checkOptionsExist = (options).filter(
			(item) => item[valueKey] === value,
		);
		if (checkOptionsExist.length > 0) return checkOptionsExist[0];
		const valKey = useQueryKey ? 'query' : valueKey;
		try {
			const res = await triggerSingle({
				params: merge(params, { [valKey]: value }),
			});
			const list = res?.data?.list || [];
			const listData = (list).filter(
				(item) => item[valueKey] === value,
			);
			if (listData.length > 0) {
				setStoreOptions([...storeOptions, ...getModifiedOptions(list)]);
			}
			return getModifiedOptions(listData)?.[0] || null;
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
