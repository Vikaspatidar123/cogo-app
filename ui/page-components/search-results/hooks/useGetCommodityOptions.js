import { useRequestBf } from '@/packages/request';

const getCommodityOptions = () => {
	const [{ data:Data }] = useRequestBf(
		{
			url     : 'saas_insurance_list_commodities',
			authkey : 'saas/insurance/list-commodities',
			method  : 'get',
		},
		{ manual: false },
	);
	const { data = {} } = Data || {};
	const { list = [] } = data || {};

	return { list };
};

export default getCommodityOptions;
