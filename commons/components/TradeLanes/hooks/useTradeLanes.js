import { useEffect, useState } from 'react';
import { isEmpty } from '@cogoport/front/utils';

const useTradeLanes = ({
	CONSTANTS = {},
	state = {},
	setCompletedServiceForm = () => {},
}) => {
	const {
		COMPONENT_KEYS: { SERVICES, TRADE_LANES },
	} = CONSTANTS;

	const { [SERVICES]: services } = state;
	const { formValues: servicesFormValues = {} } = services || {};

	const filledServiceForms = Object.keys(state[TRADE_LANES] || {}).reduce(
		(pv, cv) => {
			const service = state[TRADE_LANES][cv];

			if (isEmpty(service.completedFrieghtTypes || {})) {
				return { ...pv };
			}

			return {
				...pv,
				[cv]: Object.keys(service.completedFrieghtTypes).filter(
					(freightKey) => {
						return service.completedFrieghtTypes[freightKey];
					},
				),
			};
		},
		{},
	);

	const [showServicesForm, setShowServicesForm] = useState(() => {
		const hash = {};
		Object.keys(servicesFormValues).forEach((key) => {
			if (['buyServices', 'sellServices'].includes(key)) {
				servicesFormValues[key].forEach((serviceKey) => {
					hash[key] = {
						...(hash[key] || {}),
						[serviceKey]: false,
					};
				});
			}
		});

		return hash;
	});

	useEffect(() => {
		setCompletedServiceForm(filledServiceForms);
	}, [state]);

	return {
		showServicesForm,
		setShowServicesForm,
	};
};

export default useTradeLanes;
