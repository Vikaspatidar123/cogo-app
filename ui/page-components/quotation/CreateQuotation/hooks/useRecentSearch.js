import { useState, useEffect, useCallback } from 'react';

import { containerSizeMap, containerTypeMap, serviceTypeMap, incotermMap } from '../utils/recentSearchMapping';

const useRecentSearch = ({ query, setTransportMode }) => {
	const [spotSearchData, setSpotSearchData] = useState({});

	const getRecentSearchData = useCallback(() => {
		const preFillData = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('spotSearchResult'));

		setTransportMode(
			['lcl_freight', 'fcl_freight'].includes(preFillData?.serviceType) ? 'OCEAN' : 'AIR',
		);

		const incoterm = incotermMap[preFillData?.incoterm];
		const containerSize = containerSizeMap[preFillData?.containerSize];
		const containerType = containerTypeMap[preFillData?.containerType];
		const serviceType = serviceTypeMap[preFillData?.serviceType];

		return {
			...preFillData, incoterm, containerSize, containerType, serviceType,
		};
	}, [setTransportMode]);

	useEffect(() => {
		if (query?.recentSearch && typeof window !== 'undefined') {
			const data = getRecentSearchData();
			setSpotSearchData(data);
		}
	}, [getRecentSearchData, query?.recentSearch]);

	return spotSearchData;
};

export default useRecentSearch;
