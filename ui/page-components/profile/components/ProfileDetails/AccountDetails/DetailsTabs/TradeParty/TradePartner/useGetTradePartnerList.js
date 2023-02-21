import { useEffect, useState } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

let isInit = false;

/**
 * @typedef  {Object} 	[props]
 * @property {Object} 	[orgResponse]
 * @property {Object} 	[tradePartyType]
 * @property {string} 	[activeTab]
 * @property {boolean} 	[showModal]
 * @property {function} [setShowModal]
 */
const useGetTradePartnerList = (props) => {
	const { orgResponse, tradePartyType } = props;
	const { id: organizationId } = orgResponse;

	const {
		general: { scope = '' },
	} = useSelector((state) => state);

	const [page, setPage] = useState(1);
	const [editTradePartnerItem, setEditTradePartnerItem] = useState({});

	const params = {
		filters: {
			organization_id: organizationId,
		},
		page,
		page_limit: 10,
	};
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_organization_trade_parties',
		method : 'get',
	}, { manual: true });

	const getTradePartnerList = async () => {
		try {
			await trigger({ params });
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (isInit) {
			getTradePartnerList();
		}

		isInit = true;
	}, [page]);

	return {
		loading,
		data,
		getTradePartnerList,
		page,
		setPage,
		editTradePartnerItem,
		setEditTradePartnerItem,
	};
};

export default useGetTradePartnerList;
