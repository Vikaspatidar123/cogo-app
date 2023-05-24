import { Toast } from '@cogoport/components';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequestBf } from '@/packages/request';

const useGetCargoInsuranceRate = (props) => {
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
		} catch (err) {
			Toast.error(getApiErrorString(err));
		}
	};

	return {
		getCargoInsruanceRate,
		premiumData,
		loading,
	};
};

export default useGetCargoInsuranceRate;
