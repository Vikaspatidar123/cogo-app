import { Toast } from '@cogoport/components';
import { useState, useEffect, useRef, useCallback } from 'react';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const constFilter = {
	HS_CODE : 'STARTS_WITH',
	PRODUCT : 'CONTAINS',
};
const useHSCode = () => {
	const { profile } = useSelector((state) => state);

	const searchRef = useRef({});

	const { id } = profile || {};

	const [apiData, setApiData] = useState([]);
	const [headingObj, setheadingObj] = useState({});
	const [hsCodeObj, setHsCodeObj] = useState({});
	const [pageObj, setPageObj] = useState({});

	const [{ loading: getLoading }, trigger] = useRequestBf(
		{
			url     : 'saas/hs-code/section',
			method  : 'get',
			authKey : 'get_saas_hs_code_section',
		},
		{ manual: true },
	);

	const [{ loading: getHeadingLoading }, triggerHeading] = useRequestBf(
		{
			url     : '/saas/hs-code/heading',
			method  : 'get',
			authKey : 'get_saas_hs_code_heading',
		},
		{ manual: true },
	);

	const [{ loading: getHsCodeLoading }, triggerHsCode] = useRequestBf(
		{
			url     : '/saas/hs-code',
			method  : 'get',
			authKey : 'get_saas_hs_code',
		},
		{ manual: true },
	);

	const [{ loading: searchLoading }, triggerSearch] = useRequestBf(
		{
			url     : '/saas/hs-code/search',
			method  : 'get',
			authKey : 'get_saas_hs_code_search',
		},
		{ manual: true },
	);
	const refetch = useCallback(
		async (countryId = undefined) => {
			try {
				const response = await trigger({ params: { countryId } });
				setApiData(response.data);
				searchRef.current.searchTerm = undefined;
				searchRef.current.searchType = undefined;
				searchRef.current.customFilter = undefined;
				searchRef.current.country = countryId;
			} catch (err) {
				console.error(err);
			}
		},
		[trigger],
	);

	const refetchHeading = useCallback(
		async (chapCode) => {
			try {
				const response = await triggerHeading({
					params: {
						chapterCode: chapCode,
					},
				});
				setheadingObj((prev) => ({
					...prev,
					[chapCode]: response.data,
				}));
			} catch (err) {
				console.log(err);
			}
		},
		[triggerHeading],
	);

	const refetchHsCode = useCallback(
		async (headCode, pageNo = 1) => {
			try {
				const response = await triggerHsCode({
					params: {
						headingCode  : headCode,
						userId       : id,
						page         : pageNo,
						pageLimit    : 7,
						countryId    : searchRef?.current?.country,
						searchType   : searchRef?.current?.searchType,
						searchTerm   : searchRef?.current?.searchTerm,
						customFilter : searchRef?.current?.customFilter,
					},
				});
				setHsCodeObj((prev) => ({
					...prev,
					[headCode]: response.data.list,
				}));

				setPageObj((prev) => ({
					...prev,
					[headCode]: {
						totalPages   : response.data.totalPages,
						totalRecords : response.data.totalRecords,
						pageNo       : response.data.pageNo,
						pageSize     : response.data.pageSize,
					},
				}));
			} catch (err) {
				console.log(err);
			}
		},
		[id, triggerHsCode],
	);

	const refetchSearch = useCallback(
		async (data) => {
			try {
				const resp = await triggerSearch({
					params: {
						countryId  : data.country,
						searchType : data.searchBy,
						searchTerm : data.searchTerm,
						customFilter:
                            data.filterBy || constFilter[data.searchBy],
					},
				});
				setApiData(resp.data.sections);
				searchRef.current.country = data.country;
				searchRef.current.searchTerm = data.searchTerm;
				searchRef.current.searchType = data.searchBy;
				searchRef.current.customFilter = data.filterBy || constFilter[data.searchBy];
			} catch (error) {
				setApiData([]);
				Toast.error(error?.error?.message, {
					autoClose : 1000,
					style     : { color: 'white' },
				});
			}
		},
		[triggerSearch],
	);

	useEffect(() => {
		refetch(GLOBAL_CONSTANTS.hs_code_country_ids.IN);
	}, [refetch]);

	return {
		refetch,
		apiData,
		refetchSearch,
		headingObj,
		refetchHeading,
		hsCodeObj,
		refetchHsCode,
		pageObj,
		setPageObj,
		loading        : getLoading,
		headingLoading : getHeadingLoading,
		hsloading      : getHsCodeLoading,
		searchLoading,
	};
};

export default useHSCode;
