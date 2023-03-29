import { useRequest } from '@/packages/request';

const getCommodityOptions = () => {
	const apiData = useRequest('get', true, 'saas', {
		authkey: 'saas_insurance_list_commodities',
	})('saas/insurance/list-commodities');

	const { data = {} } = apiData || {};
	const { list = [] } = data || {};

	return { list };
};

export default getCommodityOptions;
