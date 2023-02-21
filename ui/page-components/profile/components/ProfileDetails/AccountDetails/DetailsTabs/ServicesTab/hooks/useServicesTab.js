import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import CONSTANTS from '../../../utils/constant';

import useRequest from '@/packages/request';
import { useSelector } from '@/packages/store';

const useServicesTab = () => {
	const {
		profile: { organization = {} },
	} = useSelector((state) => state);

	const [state, setState] = useState({});

	const [loadingComponent, setLoadingComponent] = useState(false);

	const { COMPONENT_KEYS = {} } = CONSTANTS;

	const { PLAN, SERVICES, TRADE_LANES } = COMPONENT_KEYS;

	// const getChannelPartnerAPI = useRequest(
	// 	'get',
	// 	false,
	// )('/partner/get_channel_partner');

	// const getPlan = ({ response = {} }) => {
	// 	const { account_types: accountTypes = [] } = response.data.partner;

	// 	if ((accountTypes || []).length === 0) {
	// 		return {};
	// 	}

	// 	let planService = '';

	// 	if (
	// 		accountTypes.includes('importer_exporter')
	// 		&& accountTypes.includes('service_provider')
	// 	) {
	// 		planService = 'both';
	// 	} else if (accountTypes.includes('service_provider')) {
	// 		planService = 'sell';
	// 	} else if (accountTypes.includes('importer_exporter')) {
	// 		planService = 'buy';
	// 	}

	// 	return {
	// 		[PLAN]: {
	// 			formValues: {
	// 				planService,
	// 			},
	// 		},
	// 	};
	// };

	// const getServices = ({ response = {} }) => {
	// 	const { logistics_services: logisticsServices = {} } = response.data.partner;

	// 	const isServicesValuePresent = Object.keys(logisticsServices || {}).every(
	// 		(serviceKey) => !isEmpty(logisticsServices[serviceKey] || []),
	// 	);

	// 	if (!isServicesValuePresent) {
	// 		return {};
	// 	}

	// 	const KEYS_MAPPING = {
	// 		sell_services: 'sellServices',
	// 		buy_services: 'buyServices',
	// 	};

	// 	const servicesFormValues = Object.keys(logisticsServices).reduce(
	// 		(previousServices, currentServiceKey) => {
	// 			const key = KEYS_MAPPING[currentServiceKey] || currentServiceKey;

	// 			return {
	// 				...previousServices,
	// 				[key]: Object.keys(logisticsServices[currentServiceKey]) || [],
	// 			};
	// 		},
	// 		{},
	// 	);

	// 	return {
	// 		[SERVICES]: {
	// 			formValues: servicesFormValues,
	// 		},
	// 	};
	// };

	const getTradeLanes = ({ response = {} }) => {
		const { logistics_services: logisticsServices = {} } = response.data.partner;

		const isServicesValuePresent = Object.keys(logisticsServices || {}).every(
			(serviceKey) => Object.keys(serviceKey).length > 0,
		);

		if (!isServicesValuePresent) {
			return {};
		}

		const serviceKeysMapping = {
			buy_services  : 'buyServices',
			sell_services : 'sellServices',
		};

		const serviceFreightCompleted = Object.keys(logisticsServices).reduce(
			(previousServicesFreights, serviceKey) => {
				const service = logisticsServices[serviceKey];

				if (isEmpty(service)) {
					return {
						...previousServicesFreights,
					};
				}

				const completedFreight = Object.keys(service).reduce(
					(previousFreights, currentFreightKey) => {
						const freight = service[currentFreightKey];

						if (isEmpty(freight)) {
							return { ...previousFreights };
						}

						return { ...previousFreights, [currentFreightKey]: true };
					},
					{},
				);

				return {
					...previousServicesFreights,
					[serviceKeysMapping[serviceKey]]: {
						completedFrieghtTypes: completedFreight,
					},
				};
			},
			{},
		);

		return {
			[TRADE_LANES]: serviceFreightCompleted,
		};
	};

	// const getChannelPartner = async () => {
	// 	try {
	// 		const response = await getChannelPartnerAPI.trigger({
	// 			params: { id: partner.id },
	// 		});

	// 		setState({
	// 			...state,
	// 			partnerId: partner.id,
	// 			...getPlan({ response }),
	// 			...getServices({ response }),
	// 			...getTradeLanes({ response }),
	// 		});
	// 	} catch (err) {
	// 		// toast.error(getApiErrorString(err.data));
	// 	}
	// };

	// useEffect(() => {
	// 	getChannelPartner();
	// }, []);

	return {
		// loading: getChannelPartnerAPI.loading,
		loadingComponent,
		setLoadingComponent,
		state,
		setState,
		CONSTANTS,
	};
};

export default useServicesTab;
