import { debounce } from '@cogoport/utils';
import { useCallback, useState } from 'react';

const useSearchQuery = () => {
	const [query, setQuery] = useState();

	const request = debounce((value) => {
		setQuery(value);
	}, 600);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debounceQuery = useCallback((value) => request(value), []);
	return { debounceQuery, query };
};

export default useSearchQuery;
