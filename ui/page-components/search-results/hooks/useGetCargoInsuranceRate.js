import { useState } from 'react';

import { useRequestBf } from '@/packages/request';

const useGetCargoInsuranceRate = (props) => {
	const [error, setError] = useState(null);
	const [{ loading, data: premiumData }, trigger] = useRequestBf(
		{
			url     : '/saas/insurance/rate',
			authKey : 'get_saas_insurance_rate',
			method  : 'get',
			params  : { filters: { service: 'spot_negotiation' } },
		},
		{ manual: true },
	);

	const getCargoInsruanceRate = async (values) => {
		try {
			const res = await trigger({
				params: { ...values },
			});
			props.setRateData(res?.data);
			setError(null);
		} catch (err) {
			props.setRateData({});
			if (err?.response?.data?.errorCode === 'ERR_5005') {
				setError(err.response.data.message);
			}
		}
	};
	return {
		getCargoInsruanceRate,
		premiumData,
		loading,
		error,
	};
};

export default useGetCargoInsuranceRate;
