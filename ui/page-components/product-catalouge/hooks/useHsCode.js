/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

import useSearchQuery from '../../product-catalogue-modal/hooks/useSearchQuery';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useHSCODE = ({ countryforHscode = '' }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [ApiData, setApiData] = useState([]);
	const [headingObj, setheadingObj] = useState([]);
	const [hsCodeObj, setHsCodeObj] = useState([]);
	const [pageObj, setPageObj] = useState({});
	const { profile } = useSelector((state) => state);
	const { id } = profile || {};
	const countryId = profile?.organization?.country_id;

	const { debounceQuery, query } = useSearchQuery();

	const [{ loading: getListDataLoading }, GetListDataTrigger] = useRequestBf({
		url     : 'saas/hs-code/section',
		method  : 'get',
		authKey : 'get_saas_hs_code_section',
	}, { manual: true });
	const [{ loading: getHeadingDataLoading }, GetHeadingDataTrigger] = useRequestBf({
		url     : 'saas/hs-code/heading',
		method  : 'get',
		authKey : 'get_saas_hs_code_heading',
	}, { manual: true });
	const [{ loading: getHscodeLoading }, GetHscodeTrigger] = useRequestBf({
		url     : '/saas/hs-code',
		method  : 'get',
		authKey : 'get_saas_hs_code',
	}, { manual: true });
	const [{ loading: getBySearchLoading }, GetBySearchTrigger] = useRequestBf({
		url     : '/saas/hs-code/search',
		method  : 'get',
		authKey : 'get_saas_hs_code_search',
	}, { manual: true });
	const [hsCodeResponse, setHSCodeResponse] = useState();

	const api = searchTerm === '' ? GetListDataTrigger : GetBySearchTrigger;

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
			const response = await api({ params: { ...payload } });
			if (searchTerm === '') {
				setApiData(response.data);
			} else {
				setApiData(response.data?.sections);
			}
		} catch (err) {
			Toast.error(err?.message || 'Something Went Wrong', { style: { color: 'white' } });
		}
	};

	const refetchHeading = async (chapterCodedata) => {
		if (chapterCodedata > 0) {
			try {
				const response = await GetHeadingDataTrigger({
					params: {
						chapterCode: chapterCodedata || '',
					},
				});
				setheadingObj(response?.data);
			} catch (err) {
				Toast.error(err.error?.message || 'Something Went Wrong', { style: { color: 'white' } });
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
			const response = await GetHscodeTrigger({
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
			Toast.error(err.error?.message || 'Something Went Wrong', { style: { color: 'white' } });
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
		loading        : getListDataLoading,
		headingLoading : getHeadingDataLoading,
		hsloading      : getHscodeLoading,
		hsCodeResponse,
		getBySearchLoading,
		setSearchTerm,
	};
};

export default useHSCODE;
