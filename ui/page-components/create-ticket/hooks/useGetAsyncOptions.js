import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import { useDebounceQuery } from '@/packages/forms';
import { useRouter } from '@/packages/next';
import { useRequestBf } from '@/packages/request';

const DEFAULT_SIZE = 10;

const useGetAsyncOptions = ({ isTicketNotUtlilized }) => {
	const { query } = useRouter();

	const [defaultOptions, setDefaultOptions] = useState([]);

	const { token, type = '' } = query || {};
	const { debounceQuery, query:searchQuery } = useDebounceQuery();

	const [{ loading, data }, trigger] = useRequestBf({
		url     : '/token_ticket_types',
		method  : 'get',
		authKey : 'get_token_ticket_types',
		scope   : 'cogocare',
		params  : {
			page       : 0,
			TicketType : !isEmpty(searchQuery?.trim())
				? searchQuery?.trim()
				: undefined,
			size        : DEFAULT_SIZE,
			TicketToken : token,
			Category    : type,
		},
	}, { manual: !(isTicketNotUtlilized || searchQuery) });

	const listAsyncOptions = async (inputValue = '') => {
		const res = await trigger({
			params: {
				page       : 0,
				TicketType : !isEmpty(inputValue?.trim())
					? inputValue?.trim()
					: undefined,
				size        : DEFAULT_SIZE,
				TicketToken : token,
				Category    : type,
			},
		});
		if (res?.data?.items) {
			return res?.data?.items;
		}
		return null;
	};

	const onSearch = (inputValue) => {
		debounceQuery(inputValue);
	};

	const onHydrateValue = async (value) => {
		const checkOptionsExist = (data.items || []).filter(
			(item) => item.TicketType === value,
		);
		if (!isEmpty(checkOptionsExist)) return checkOptionsExist[0];

		try {
			const res = await listAsyncOptions(value);
			const list = res?.data?.items || [];
			const listData = (list).filter(
				(item) => item?.TicketType === value,
			);
			if (!isEmpty(listData)) {
				setDefaultOptions((prev) => [
					...prev,
					...list,
				]);
			}
			return listData?.[0];
		} catch (err) {
			return {};
		}
	};

	useEffect(() => {
		if (!isEmpty(data)) {
			setDefaultOptions(data?.items);
		}
	}, [data]);

	return {
		defaultOptions,
		loading,
		onSearch,
		onHydrateValue,
	};
};
export default useGetAsyncOptions;
