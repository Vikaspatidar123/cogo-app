import { useEffect, useState } from 'react';

import useSearchQuery from '@/packages/forms/hooks/useDebounceQuery';
import { useQuery } from '@/packages/request';
import { getListOrganisation } from '@/ui/api/get';

const useListOrganisation = ({ isEdit, reportData }) => {
	const { recipient_user_ids = [] } = reportData || {};
	const [pageNumber, setPageNumber] = useState(1);

	const [query, setQuery] = useState('');
	const { query:q, debounceQuery } = useSearchQuery();

	const hookSetter = { setPageNumber, setQuery, query };
	const payload = isEdit ? { filters: { status: 'active', q }, page: pageNumber, page_limit: 5 }
		: { filters: { status: 'active' }, page_limit: 100 };

	const {
		isLoading,
		data,
	} =	useQuery({
		queryKey     : 'tracking',
		renderOption : { payload, isEdit },
		payload,
		queryFn      : getListOrganisation,
	});
	const listData = isEdit ? data
		: { ...data, list: data?.list?.filter((item) => recipient_user_ids?.includes(item?.user_id)) };
	useEffect(() => { debounceQuery(query); }, [debounceQuery, query]);

	return { data: listData, isLoading, hookSetter };
};

export default useListOrganisation;
