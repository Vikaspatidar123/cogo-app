import { useEffect, useState } from 'react';

import useSearchQuery from '@/packages/forms/hooks/useDebounceQuery';
import { useQuery } from '@/packages/request';
import { getListOrganisation } from '@/ui/api/saas/get';

const useListOrganisation = ({ isEdit }) => {
	const [pageNumber, setPageNumber] = useState(1);

	const [query, setQuery] = useState('');
	const { query:q, debounceQuery } = useSearchQuery();

	const hookSetter = { setPageNumber, setQuery, query };
	const payload = isEdit ? { status: 'active', page: pageNumber, page_limit: 5, filters: { q } }
		: { status: 'active' };

	const {
		isLoading,
		data,
	} =	useQuery({
		queryKey     : 'tracking',
		renderOption : { payload, isEdit },
		payload,
		queryFn      : getListOrganisation,
	});

	useEffect(() => { debounceQuery(query); }, [debounceQuery, query]);

	return { data, isLoading, hookSetter };
};

export default useListOrganisation;
