import { useEffect } from 'react';

import { toast } from '@cogoport/front/components';

import useRequest from '@/temp/request/useRequest';

const useGetDefaultValues = ({
	state,
	serviceType,
	frieghtType,
	setAddedTradeLanesArray,
}) => {
	const appiName =
		serviceType === 'buyServices'
			? 'get_channel_partner_buy_services'
			: 'get_channel_partner_sell_services';

	const getChannelPartnerBuyServicesApi = useRequest(
		'get',
		false,
		'partner',
	)(`/${appiName}`);

	const fetchGetChannelPartnerBuyServicesApi = async () => {
		try {
			const response = await getChannelPartnerBuyServicesApi.trigger({
				params: {
					id: state.partnerId,
					service: frieghtType,
				},
			});

			const getApiList = response.data?.[frieghtType] || [];

			const defaultListAddedTradeLanes = getApiList.map((element) => {
				return {
					mapping_id: element.id,
					trade_type: element.trade_type,
					is_cfs_agent_present: element.is_cfs_agent_present,
					name: element.serviceable_location.name,
				};
			});

			setAddedTradeLanesArray(defaultListAddedTradeLanes);
		} catch (error) {
			toast.error(error.data);
		}
	};

	useEffect(() => {
		fetchGetChannelPartnerBuyServicesApi();
	}, []);

	return {
		fetchGetChannelPartnerBuyServicesApi,
		loadingGetPartnerUser: getChannelPartnerBuyServicesApi?.loading,
	};
};

export default useGetDefaultValues;
