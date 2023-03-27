import { Toast } from '@cogoport/components';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useRequestBf } from '@/packages/request';

const useGetRates = ({
	activeTab = '',
	formDetails = {},
	countryCode = '',
	responseFromCurrencyExchange = {},
	setRatesResponse = () => {},
}) => {
	const { profile } = useSelector((state) => state);
	const [{ loading }, trigger] = useRequestBf(
		{
			method  : 'get',
			authKey : 'get_saas_insurance_rate',
			url     : '/saas/insurance/rate',
		},
		{ manual: true },
	);

	const response = useCallback(async () => {
		try {
			const {
				cargoDescription = '',
				policyCountryId = '',
				policyCommodityId = '',
			} = formDetails || {};
			if (responseFromCurrencyExchange?.price) {
				const res = await trigger({
					params: {
						performedBy        : profile?.id,
						policyType         : countryCode === 'IN' ? 'INLAND' : activeTab,
						descriptionOfCargo : cargoDescription,
						policyCountryId,
						policyCommodityId,
						invoiceValue       : responseFromCurrencyExchange?.price,
					},
				});
				setRatesResponse(res?.data);
			}
		} catch (error) {
			if (error?.message !== 'canceled') {
				Toast?.error(error?.message);
			}
			setRatesResponse({});
		}
	}, [
		activeTab,
		countryCode,
		formDetails,
		profile?.id,
		responseFromCurrencyExchange?.price,
		setRatesResponse,
		trigger,
	]);

	useEffect(() => {
		response();
	}, [response]);

	return {
		ratesLoading: loading,
	};
};

export default useGetRates;
