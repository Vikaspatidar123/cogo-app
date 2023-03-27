import { useEffect } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetTradePartnersDetails = ({ shipment_id = '' }) => {
	const { query } = useSelector(({ general }) => ({
		query: general?.query,
	}));
	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_shipment_trade_partners',
		method : 'get',
	}, { manual: true });

	const getSupplierandShipper = (list) => {
		const trade_partners_details = {};
		(list || []).forEach((row) => {
			if (
				row?.trade_party_type === 'shipper'
				|| row?.trade_party_type === 'consignee'
			) {
				trade_partners_details[row?.trade_party_type] = {
					trade_party_type : row?.trade_party_type,
					trade_party_id   : row?.trade_party_id,
					name             : row?.trade_partner_details?.business_name,
				};
			}
		});
		return trade_partners_details;
	};

	const getList = async () => {
		try {
			await trigger({
				params: {
					filters: { shipment_id: shipment_id || query?.id },
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (shipment_id || query?.id) {
			getList();
		}
	}, []);

	return {
		trade_partners_loading : loading,
		trade_partners_details : getSupplierandShipper(data?.list),
		trigger,
		query,
		tdata                  : data,
	};
};

export default useGetTradePartnersDetails;
