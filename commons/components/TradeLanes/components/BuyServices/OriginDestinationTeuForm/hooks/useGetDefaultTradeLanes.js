import { useEffect } from 'react';
import { toast } from '@cogoport/front/components';
import useRequest from '@/temp/request/useRequest';

const VOLUME_LIMIT_MAPPING = {
	buyServices: {
		0: '0-50',
		50: '50-100',
		100: '100-500',
		500: '500-1000',
		1000: '1000+',
	},
};

const useGetDefaultTradeLanes = ({
	state,
	serviceType,
	frieghtType,
	setAddedTradeLanesArray,
}) => {
	const api = useRequest(
		'get',
		false,
		'partner',
	)('/get_channel_partner_buy_services');

	const fetchGetChannelPartnerBuyServicesApi = async () => {
		try {
			const response = await api.trigger({
				params: {
					id: state.partnerId,
					service: frieghtType,
				},
			});

			const getApiList = response.data?.[frieghtType] || [];

			let VOLUME_UNITS = 'min_shipments';
			if (frieghtType === 'air_freight') {
				VOLUME_UNITS = 'min_cargo_weight';
			} else if (frieghtType === 'fcl_freight') {
				VOLUME_UNITS = 'min_containers';
			}

			const defaultListAddedTradeLanes = getApiList.map((element) => {
				return {
					mapping_id: element?.id,
					origin: element?.origin_location?.name,
					origin_id: element?.origin_location?.id,
					destination: element?.destination_location?.name,
					destination_id: element?.destination_location?.id,
					teu: VOLUME_LIMIT_MAPPING?.[serviceType]?.[element?.[VOLUME_UNITS]],
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
		loadingGetPartnerUser: api.loading,
	};
};

export default useGetDefaultTradeLanes;
