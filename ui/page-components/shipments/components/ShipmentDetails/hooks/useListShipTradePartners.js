import useGetFiniteList from '../../../hooks/useGetFiniteList';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useListShipTradePartners = (allParams) => {
	const { ...params } = allParams || {};
	const { authorizationparameters } = useSelector(
		({ profile }) => ({
			authorizationparameters: profile?.authorizationparameters,
		}),
	);
	const [{ data: tradePartnerData }, trigger] = useRequest({
		url    : 'list_shipment_trade_partners',
		method : 'get',
	}, { manual: true });

	const listAPi = (restFilters) => trigger({
		params: {
			filters: {
				shipment_id: params?.shipment_data?.id,
			},
			poc_filters: {
				work_scopes : restFilters?.designation || undefined,
				location_id : restFilters?.origin_location_id || undefined,
			},
		},
	});

	const {
		loading,
		page,
		filters,
		list: { data, total, total_page },
		hookSetters,
		refetch,
	} = useGetFiniteList(listAPi, { ...params, authorizationparameters });

	return {
		loading,
		page,
		filters,
		list: { data, total, total_page },
		tradePartnerData,
		hookSetters,
		refetch,
	};
};
export default useListShipTradePartners;
