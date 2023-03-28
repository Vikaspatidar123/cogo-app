import { useRequest } from '@cogo/commons/hooks';
import showErrorsInToast from '@cogo/utils/showErrorsInToast';
import startCase from '@cogo/utils/startCase';
import { Button, toast } from '@cogoport/front/components';
import React, { useState } from 'react';

import { Container, ButtonWrap } from './styles';

function NoRatesServicesConfirmation({
	noRatesArr = [],
	setConfirmation = () => {},
	data = {},
	scope = '',
	search_id = '',
	refetch = () => {},
}) {
	const [loading, setLoading] = useState(false);
	const uniq_services = [...new Set(noRatesArr)];
	const count = (uniq_services || []).length;

	const updateSpotSearchApi = useRequest(
		'post',
		false,
		scope,
	)('/update_spot_search');

	const rates = Object.keys(data?.service_rates).map((item) => ({
		id: item,
		...data?.service_rates[item],
	}));

	const handleDeleteService = async () => {
		setLoading(true);

		const services_params = {};
		(rates || []).forEach((item) => {
			if (!item?.is_rate_available) {
				const serviceType = `${item?.service_type}_services_attributes`;
				services_params[serviceType] = [
					...(services_params[serviceType] || []),
					{ id: item?.id, status: 'inactive' },
				];
			}
		});

		const payload = {
			id: search_id,
			...services_params,
		};
		try {
			const res = await updateSpotSearchApi.trigger({ data: payload });

			if (!res.hasError) {
				setLoading(false);
				setConfirmation(false);
				toast.success('Services have been removed');
				refetch();
			}
		} catch (err) {
			setLoading(false);
			setConfirmation(false);
			showErrorsInToast(err?.data);
		}
		setLoading(false);
	};

	const handleServiceName = (service) => {
		const splitName = service.split(':');
		if (splitName[2]) {
			return `${startCase(splitName[0])} ${startCase(
				splitName[1] || '',
			)}(${startCase(splitName[2] || '')})`;
		}
		return startCase(service);
	};
	const services =		count > 1
		? (uniq_services || []).map((item) => handleServiceName(item))
		: handleServiceName(uniq_services[0]);

	return (
		<Container>
			<h3>
				{`Rates are not available for ${
					count > 1 ? 'these services' : 'this service'
				} - ${services}.`}
			</h3>

			<h4>
				{`${
					count > 1 ? 'These services' : 'This service'
				} will be removed if you proceed. Are you sure you want to continue?`}
			</h4>

			<ButtonWrap>
				<Button
					onClick={() => setConfirmation(false)}
					style={{ marginRight: '20px', background: 'none', color: '#000000' }}
					disabled={loading}
				>
					Cancel
				</Button>

				<Button onClick={() => handleDeleteService()} disabled={loading}>
					Proceed
				</Button>
			</ButtonWrap>
		</Container>
	);
}

export default NoRatesServicesConfirmation;
