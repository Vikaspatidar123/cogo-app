/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

import useSearchQuery from './useSearchQuery';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useHsCodeData = ({ countryforHscode = '' }) => {
	const [secChapObj, setSecChapObj] = useState([]);
	const [headingObj, setheadingObj] = useState([]);
	const [hsCodeObj, setHsCodeObj] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	const { profile = {} } = useSelector((s) => s);
	const { id, organization = {} } = profile || {};
	const countryId = organization?.country_id;

	const { debounceQuery, query } = useSearchQuery();

	const [{ loading:getListDataLoading }, getListDataTrigger] = useRequestBf({
		url     : 'saas/hs-code/section',
		authKey : 'get_saas_hs_code_section',
		method  : 'get',
	}, { manual: true, autoCancel: false });

	const [{ loading:getHeadingDataLoading }, getHeadingDataTrigger] = useRequestBf({
		url     : 'saas/hs-code/heading',
		authKey : 'get_saas_hs_code_heading',
		method  : 'get',
	}, { manual: true, autoCancel: false });

	const [{ loading:getHscodeLoading }, getHscodeTrigger] = useRequestBf({
		url     : '/saas/hs-code',
		authKey : 'get_saas_hs_code',
		method  : 'get',
	}, { manual: true, autoCancel: false });

	const [{ loading: getBySearchLoading }, getBySearchTrigger] = useRequestBf({
		url     : '/saas/hs-code/search',
		authKey : 'get_saas_hs_code_search',
		method  : 'get',
	}, { manual: true, autoCancel: false });

	const apiTrigger = searchTerm === '' ? getListDataTrigger : getBySearchTrigger;

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
	const refetchSection = async () => {
		const payload = createPayload();
		try {
			const response = await apiTrigger({ params: { ...payload } });
			if (searchTerm === '') {
				setSecChapObj(response.data);
			} else {
				setSecChapObj(response.data?.sections);
			}
		} catch (err) {
			Toast.error(err?.message, {
				autoClose : 3000,
				style     : { color: '#333', background: '#FFD9D4' },
			});
		}
	};

	const refetchHeading = async (chapterCodedata) => {
		try {
			const response = await getHeadingDataTrigger({
				params: {
					chapterCode: chapterCodedata || '',
				},
			});
			setheadingObj(response?.data);
		} catch (err) {
			Toast.error(err?.error?.message, {
				autoClose : 3000,
				style     : { color: '#333', background: '#FFD9D4' },
			});
		}
	};

	const refetchHsCode = async ({ row, headingCode, page }) => {
		try {
			const response = await getHscodeTrigger({
				params: {
					headingCode : row?.headingCode || headingCode,
					userId      : id,
					page,
					countryId   : countryforHscode,
				},
			});
			setHsCodeObj(response?.data);
		} catch (err) {
			Toast.error(err?.error?.message, {
				autoClose : 3000,
				style     : { color: '#333', background: '#FFD9D4' },
			});
		}
	};

	useEffect(() => {
		if (query) {
			refetchSection();
		}
	}, [query]);

	useEffect(() => {
		if (searchTerm !== '') {
			debounceQuery(searchTerm);
		} else {
			refetchSection();
		}
	}, [searchTerm]);

	return {
		refetchSection,
		secChapObj,
		headingObj,
		refetchHeading,
		hsCodeObj,
		refetchHsCode,
		loading        : getListDataLoading,
		headingLoading : getHeadingDataLoading,
		hsloading      : getHscodeLoading,
		searchTerm,
		setSearchTerm,
		getBySearchLoading,
	};
};

export default useHsCodeData;
