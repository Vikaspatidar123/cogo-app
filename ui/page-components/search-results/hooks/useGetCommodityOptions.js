import { useRequestBf } from '@/packages/request';

const useGetCommodityOptions = () => {
	const [{ data }] = useRequestBf(
		{
			authKey : 'saas_insurance_list_commodities',
			url     : 'saas/insurance/list-commodities',
			method  : 'get',
		},
		{ manual: false },
	);
	const { list = [] } = data || {};

	return { list };
};

export default useGetCommodityOptions;
