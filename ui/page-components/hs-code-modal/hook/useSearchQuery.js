import { debounce } from '@cogoport/utils';
import { useCallback, useState } from 'react';

const useSearchQuery = () => {
	const debounceQuery = useCallback((value) => request(value), []);
	const [query, setQuery] = useState();

	const request = debounce((value) => {
		setQuery(value);
	}, 600);
	return { debounceQuery, query };
};

export default useSearchQuery;
