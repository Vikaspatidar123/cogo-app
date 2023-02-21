import { getByKey } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

let isInit = false;

/**
 * @typedef  {Object} 	[props]
 * @property {string} 	[apiEndpoint]
 * @property {string} 	[addressType]
 * @property {string} 	[organizationId]
 * @property {Object} 	[tradePartyData]
 * @property {object} 	[tradePartyType]
 * @property {string} 	[activeTab]
 * @property {boolean} 	[showModal]
 * @property {function} [setShowModal]
 */
const useGetAddressesList = (props) => {
	const {
		apiEndpoint,
		organizationId,
		tradePartyData,
		tradePartyType,
		activeTab,
	} = props;

	const {
		general: { scope = '' },
	} = useSelector((state) => state);

	const [pagination, setPagination] = useState({
		page       : 1,
		page_limit : 10,
	});
	const [editAddressItem, setEditAddressItem] = useState({});

	const params = {
		...pagination,
		filters: {
			organization_id             : organizationId,
			organization_trade_party_id : (tradePartyData || {}).id,
			trade_party_type            :
				activeTab === 'self' ? 'self' : getByKey(tradePartyType, 'value'),
		},
	};

	// const api = useRequest('get', true, scope)(`/${apiEndpoint}`, { params });
	const [{ loading, data }, trigger] = useRequest({
		url    : `/${apiEndpoint}`,
		method : 'get',
	}, { manual: true });

	const getAddressesList = () => {
		trigger({ params });
	};

	useEffect(() => {
		if (isInit) {
			getAddressesList();
		}

		isInit = true;
	}, [pagination.page]);

	return {
		loading,
		data: data || {},
		getAddressesList,
		pagination,
		setPagination,
		editAddressItem,
		setEditAddressItem,
	};
};

export default useGetAddressesList;
