import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import { useRequest } from '@/packages/request';

const useGetShipmentInternalStakeHolders = ({ shipment_id }) => {
	const [{ loading, data: internalStakeHoldersList }, trigger] = useRequest({
		url    : 'list_shipment_stakeholders',
		method : 'get',
	}, { manual: true });

	const getList = async () => {
		await trigger({
			params: {
				filters: {
					shipment_id,
				},
				format_by_stakeholder_type_required : true,
				page_limit                          : 1000,
			},
		});
	};

	useEffect(() => {
		getList();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shipment_id]);

	const notToShowStakeholders = ['service_ops', 'user'];

	const internalStakeHoldersListNew = (internalStakeHoldersList || []).filter(
		(stakeholder) => !notToShowStakeholders.includes(stakeholder?.stakeholder_type),
	);

	const formattedData = {};
	internalStakeHoldersListNew?.forEach((item) => {
		let tradeType = null;
		if (item?.trade_type === 'export') {
			tradeType = 'origin';
		} else if (item?.trade_type) {
			tradeType = 'destination';
		}

		let key = '';
		if (tradeType) {
			key = `${tradeType}_${item?.service_type}`;
		} else if (isEmpty(tradeType) && !isEmpty(item?.service_type)) {
			key = item?.service_type;
		} else if (isEmpty(item?.service_type)) {
			key = 'shipment';
		}
		formattedData[key] = [...(formattedData[key] || []), item];
	});

	return {
		internalStakeHoldersList : [formattedData],
		loading,
		stakeholderListRefetch   : getList,
	};
};

export default useGetShipmentInternalStakeHolders;
