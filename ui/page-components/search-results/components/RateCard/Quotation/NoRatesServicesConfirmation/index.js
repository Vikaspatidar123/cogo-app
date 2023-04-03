import { Toast, Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

import { useRequest } from '@/packages/request';

function NoRatesServicesConfirmation({
	noRatesArr = [],
	setConfirmation = () => {},
	data = {},
	search_id = '',
	refetch = () => {},
}) {
	const uniq_services = [...new Set(noRatesArr)];
	const count = (uniq_services || []).length;

	const [{ loading }, updateSpotSearchApi] = useRequest(
		{
			url    : 'update_spot_search',
			method : 'post',
		},
		{ manual: true },
	);

	const rates = Object.keys(data?.service_rates).map((item) => ({
		id: item,
		...data?.service_rates[item],
	}));

	const handleDeleteService = async () => {
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
				setConfirmation(false);
				Toast.success('Services have been removed');
				refetch();
			}
		} catch (err) {
			setConfirmation(false);
			Toast.error(err?.data);
		}
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
		<div>
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

			<div className={styles.button_wrap}>
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
			</div>
		</div>
	);
}

export default NoRatesServicesConfirmation;
