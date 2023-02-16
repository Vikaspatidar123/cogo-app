import { toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

// import { useSaasState } from '../../../common/context';
import useSearchQuery from '../utils/useSearchQuery';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useHSCODE = ({ countryforHscode = '' }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [ApiData, setApiData] = useState([]);
	const [headingObj, setheadingObj] = useState([]);
	const [hsCodeObj, setHsCodeObj] = useState([]);
	const [pageObj, setPageObj] = useState({});
	const { profile, general } = useSelector((state) => state);
	const { id } = profile || {};
	const { scope } = general;
	const countryId = profile?.organization?.country_id;

	const { debounceQuery, query } = useSearchQuery();

	const getListData = useRequest('get', false, scope, {
		authkey: 'get_saas_hs_code_section',
	})('saas/hs-code/section');
	const getHeadingData = useRequest('get', false, scope, {
		authkey: 'get_saas_hs_code_heading',
	})('saas/hs-code/heading');
	const getHscode = useRequest('get', false, scope, {
		authkey: 'get_saas_hs_code',
	})('/saas/hs-code');
	const getBySearch = useRequest('get', false, scope, {
		authkey: 'get_saas_hs_code_search',
	})('/saas/hs-code/search');
	const [hsCodeResponse, setHSCodeResponse] = useState();

	const api = searchTerm === '' ? getListData : getBySearch;

	const createPayload = () => {
		if (searchTerm !== '') {
			return {
				countryId    : countryforHscode,
				searchTerm   : query,
				searchType   : 'HS_CODE',
				customFilter : 'STARTS_WITH',
				partnerId    : id,
			};
		}
		return {
			countryId,
		};
	};
	const refetch = async () => {
		const payload = createPayload();
		try {
			const response = await api.trigger({ params: { ...payload } });
			if (searchTerm === '') {
				setApiData(response.data);
			} else {
				setApiData(response.data?.sections);
			}
		} catch (err) {
			toast.error(err?.message, { style: { color: 'white' } });
		}
	};

	const refetchHeading = async (chapterCodedata) => {
		if (chapterCodedata > 0) {
			try {
				const response = await getHeadingData.trigger({
					params: {
						chapterCode: chapterCodedata || '',
					},
				});
				setheadingObj(response?.data);
			} catch (err) {
				toast.error(err.error?.message, { style: { color: 'white' } });
			}
		}
	};

	const refetchHsCode = async ({
		row,
		// countryforHscode,
		activeHeadingRow,
		pagination,
	}) => {
		try {
			const response = await getHscode.trigger({
				params: {
					headingCode : row?.headingCode || activeHeadingRow || '',
					userId      : id,
					page        : pagination || 1,
					pageLimit   : 10,
					countryId   : countryforHscode || '',
				},
			});
			setHSCodeResponse(response?.data);
			setHsCodeObj(response.data?.list);
		} catch (err) {
			toast.error(err.error?.message, { style: { color: 'white' } });
		}
	};

	useEffect(() => {
		if (query) {
			refetch();
		}
	}, [query]);

	useEffect(() => {
		if (searchTerm !== '') {
			debounceQuery(searchTerm);
		} else {
			refetch();
		}
	}, [searchTerm]);

	return {
		refetch,
		ApiData,
		headingObj,
		refetchHeading,
		hsCodeObj,
		refetchHsCode,
		pageObj,
		setPageObj,
		loading        : getListData.loading,
		headingLoading : getHeadingData.loading,
		hsloading      : getHscode.loading,
		hsCodeResponse,
		setSearchTerm,
	};
};

export default useHSCODE;
