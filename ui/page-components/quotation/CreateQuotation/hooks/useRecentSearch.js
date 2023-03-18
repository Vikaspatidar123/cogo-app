import { useState, useEffect } from 'react';

import { containerSizeMap, containerTypeMap, serviceTypeMap, incotermMap } from '../utils/recentSearchMapping';

const useRecentSearch = ({ query, setTransportMode }) => {
	const [spotSearchData, setSpotSearchData] = useState({});
	const getRecentSearchData = () => {
		const preFillData = JSON.parse(localStorage.getItem('spotSearchResult'));

		setTransportMode(
			['lcl_freight', 'fcl_freight'].includes(preFillData.serviceType) ? 'OCEAN' : 'AIR',
		);

		const incoterm = incotermMap[preFillData?.incoterm];
		const containerSize = containerSizeMap[preFillData?.containerSize];
		const containerType = containerTypeMap[preFillData?.containerType];
		const serviceType = serviceTypeMap[preFillData?.serviceType];

		return {
			...preFillData, incoterm, containerSize, containerType, serviceType,
		};
	};

	useEffect(() => {
		if (query?.recentSearch && typeof window !== 'undefined') {
			const data = getRecentSearchData();
			setSpotSearchData(data);
		}
	}, [query?.recentSearch]);

	return spotSearchData;
};

export default useRecentSearch;
