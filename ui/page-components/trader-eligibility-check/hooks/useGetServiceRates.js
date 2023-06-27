import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetServiceRates = () => {
	const { profile } = useSelector((s) => s);
	const { organization } = profile || {};
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : 'saas/trade-engine/service-rates',
			authKey : 'get_saas_trade_engine_service_rates',
			method  : 'get',
		},
		{ manual: true },
	);

	const fetchServiceRates = async (priority_sequence = 0) => {
		try {
			await trigger({
				params: {
					prioritySequence : priority_sequence,
					orgCountryId     : organization?.country_id,
				},
			});
		} catch (error) {
			console.log(error?.error?.message);
		}
	};

	return {
		fetchServiceRates,
		serviceRatesLoading : loading,
		serviceRates        : data,
	};
};
export default useGetServiceRates;
