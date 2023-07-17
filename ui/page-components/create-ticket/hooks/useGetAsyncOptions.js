import { isEmpty, debounce } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import { useDebounceQuery } from '@/packages/forms';
import { useRouter } from '@/packages/next';
import { useRequestBf } from '@/packages/request';

const DEFAULT_SIZE = 10;

const formatOptions = (list) => {
	const newOptions = (list || []).map((item) => {
		const { TicketType = '' } = item || {};
		return { label: TicketType, value: TicketType };
	});
	return newOptions;
};

const useGetAsyncOptions = ({ isTicketNotUtlilized }) => {
	const { query } = useRouter();

	const [defaultOptions, setDefaultOptions] = useState([]);

	const { token, type = '' } = query || {};
	const { debounceQuery, query:searchQuery } = useDebounceQuery();

	const [{ loading }, trigger] = useRequestBf({
		url     : '/token_ticket_types',
		method  : 'get',
		authKey : 'get_token_ticket_types',
		scope   : 'cogocare',
	}, { manual: true });

	const [{ loading: load, data }] = useRequestBf({
		url     : '/token_ticket_types',
		method  : 'get',
		authKey : 'get_token_ticket_types',
		scope   : 'cogocare',
	}, { manual: !searchQuery });

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

	const getOptions = async () => {
		const list = await listAsyncOptions();
		if (!isEmpty(list) && isTicketNotUtlilized) {
			setDefaultOptions(formatOptions(list));
		}
	};

	const loadOptions = debounce(async (inputValue, callback) => {
		callback(formatOptions(await listAsyncOptions(inputValue)));
	}, 500);

	const onHydrateValue = async (val) => {
		const list = await listAsyncOptions(val);
		setDefaultOptions(formatOptions(list));
	};

	useEffect(() => {
		getOptions();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!isEmpty(data)) {
			setDefaultOptions(formatOptions(data?.list));
		}
	}, [data]);

	return {
		loadOptions,
		defaultOptions,
		loading,
		onSearch,
		onHydrateValue,
	};
};
export default useGetAsyncOptions;
