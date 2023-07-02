import { merge } from '@cogoport/utils';
import { useEffect, useState, useMemo } from 'react';

import { useRequest } from '../../request';

import useDebounceQuery from './useDebounceQuery';

function useGetAsyncCogoCareOptions({
	endpoint = '',
	initialCall = false,
	valueKey = '',
	labelKey = '',
	params = {},
	qFilterKey = 'q',
}) {
	const [storeOptions, setStoreOptions] = useState([]);
	const { query, debounceQuery } = useDebounceQuery();

	const [{ data, loading }] = useRequest(
		{
			url    : endpoint,
			method : 'GET',
			scope  : 'cogocare',
			params : merge(params, { [qFilterKey]: query }),
		},
		{ manual: !(initialCall || query) },
	);

	const options = useMemo(() => data?.items || [], [data?.items]);

	const optionValues = useMemo(
		() => options.map((item) => item[valueKey]),
		[options, valueKey],
	);

	const [{ trigger: triggerSingle, loading: loadingSingle }] = useRequest(
		{
			url    : endpoint,
			method : 'GET',
			scope  : 'cogocare',
		},
		{ manual: false },
	);

	useEffect(() => {
		setStoreOptions((p) => [...p, ...options]);
	}, [options, optionValues]);

	const onSearch = (inputValue) => {
		debounceQuery(inputValue);
	};

	const onHydrateValue = async (value) => {
		if (Array.isArray(value)) {
			let unorderedHydratedValue = [];

			const toBeFetched = [];
			value.forEach((v) => {
				const singleHydratedValue = storeOptions.find(
					(o) => o?.[valueKey] === v,
				);

				if (singleHydratedValue) {
					unorderedHydratedValue.push(singleHydratedValue);
				} else {
					toBeFetched.push(v);
				}
			});

			let res;
			if (toBeFetched.length) {
				res = await triggerSingle({
					params: { ...params, [valueKey]: toBeFetched },
				});
				storeOptions.push(...(res?.data?.items || []));
			}
			unorderedHydratedValue = unorderedHydratedValue.concat(
				res?.data?.items || [],
			);

			return value.map((v) => unorderedHydratedValue.find((uv) => uv?.[valueKey] === v));
		}

		const checkOptionsExist = options.filter(
			(item) => item[valueKey] === value,
		);

		if (checkOptionsExist.length > 0) {
			return checkOptionsExist[0];
		}

		try {
			const res = await triggerSingle({
				params: { ...params, [valueKey]: value },
			});
			return res?.data?.items?.[0] || null;
		} catch (err) {
			return {};
		}
	};

	return {
		loading: loading || loadingSingle,
		onSearch,
		options,
		labelKey,
		valueKey,
		onHydrateValue,
	};
}

export default useGetAsyncCogoCareOptions;
