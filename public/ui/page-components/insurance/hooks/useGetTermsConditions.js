import { useState, useEffect, useCallback } from 'react';

import { useRequestBf } from '@/packages/request';

const useGetTermsConditions = ({
	formDetails = {},
	activeTab = '',
	type = '',
	countryCode = '',
}) => {
	const [terms, setTerms] = useState();
	const [{ loading }, trigger] = useRequestBf(
		{
			method  : 'get',
			authKey : 'get_saas_insurance_terms',
			url     : '/saas/insurance/terms',
		},
		{ manual: true },
	);

	const fetchTerms = useCallback(async () => {
		try {
			const res = await trigger({
				params: {
					policyCommodityId : formDetails?.policyCommodityId || '',
					riskCoverage      : 'ALL_RISK',
					policyType        : countryCode === 'IN' ? 'INLAND' : activeTab,
					transitMode       : type === 'Ocean' ? 'SEA' : type?.toUpperCase(),
				},
			});
			if (res?.data) {
				setTerms(res?.data);
			}
		} catch (error) {
			console.log(error?.error?.message);
		}
	}, [activeTab, countryCode, formDetails, trigger, type]);

	useEffect(() => {
		if (formDetails?.policyCommodityId) {
			fetchTerms();
		}
	}, [formDetails, fetchTerms]);
	return {
		fetchTermsLoading: loading,
		terms,
	};
};

export default useGetTermsConditions;
