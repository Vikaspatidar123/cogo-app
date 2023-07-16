import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import { useDebounceQuery } from '@/packages/forms';
import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const formatOptions = (list) => {
	const newOptions = (list || []).map((item) => {
		const { TicketType = '' } = item || {};
		return { label: TicketType, value: TicketType };
	});
	return newOptions;
};

const useGetAsyncOptions = ({ isTicketNotUtlilized }) => {
	const {
		general: { query = {} },
	} = useSelector((state) => state);

	const [defaultOptions, setDefaultOptions] = useState([]);

	const { token, type = '' } = query || {};
	const { debounceQuery, query:searchQuery } = useDebounceQuery();

	const [{ loading }, trigger] = useRequestBf({
		url     : '/token_ticket_types',
		method  : 'get',
		authKey : 'get_token_ticket_types',
		scope   : 'cogocare',
	}, { manual: true });

	const listAsyncOptions = async () => {
		const res = await trigger({
			params: {
				page        : 0,
				TicketType  : searchQuery || '',
				size        : 10,
				TicketToken : token,
				Category    : type,
			},
		});
		if (res?.data?.items) {
			return res?.data?.items;
		}
		return null;
	};

	const getOptions = async () => {
		const list = await listAsyncOptions();
		if (!isEmpty(list) && isTicketNotUtlilized) {
			setDefaultOptions(formatOptions(list));
		}
	};
	const loadOptions = (inputValue = '') => {
		debounceQuery(inputValue);
	};

	useEffect(() => {
		getOptions();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		loadOptions,
		defaultOptions,
		loading,
	};
};
export default useGetAsyncOptions;
