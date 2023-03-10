import { Toast } from '@cogoport/components';
import { useSelector } from 'react-redux';

import { useRequestBf } from '@/packages/request';

const useGetRates = ({ activeTab = '', formDetails = {}, countryCode = '' }) => {
	const { profile } = useSelector((state) => state);
	const [{ loading }, trigger] = useRequestBf({
		method  : 'get',
		authKey : 'get_saas_insurance_rate',
		url     : '/saas/insurance/rate',
	}, { manual: true });

	const response = async ({ setRatesResponse, query }) => {
		try {
			const res = await trigger({
				params: {
					performedBy        : profile?.id,
					policyType         : countryCode === 'IN' ? 'INLAND' : activeTab,
					descriptionOfCargo : formDetails?.cargoDescription,
					policyCountryId    : formDetails?.policyCountryId,
					policyCommodityId  : formDetails?.policyCommodityId,
					invoiceValue       : query,
				},
			});
			setRatesResponse(res?.data);
		} catch (error) {
			Toast.error(error?.error?.message);
			setRatesResponse({});
		}
	};

	return {
		response,
		ratesLoading: loading,
	};
};

export default useGetRates;
