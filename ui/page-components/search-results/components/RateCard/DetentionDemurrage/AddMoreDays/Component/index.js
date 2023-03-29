import { Button, Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import DaysSelect from '../../../commons/DaysSelect';
import slabPriceCalculator from '../../utils/slabPriceCalculator';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import useAddMoreDays from '@/ui/page-components/search-results/hooks/useAddMoreDays;';

const CODE_MAPPING = {
	origin_detention      : 'EDT',
	origin_demurrage      : 'EDE',
	destination_detention : 'DET',
	destination_demurrage : 'DEA',
};

function Component({
	freeLimit,
	maxLimit,
	additional_days,
	type,
	activeTab,
	mainServices,
	localServicesDetails,
	spot_search_id,
	refetch = () => {},
	service_rates,
	rateData,
}) {
	const { fetchApi, loading } = useAddMoreDays({ refetch });

	const [days, setDays] = useState(
		additional_days > 0 ? additional_days + freeLimit : freeLimit,
	);

	const key = `${activeTab}_${type}`;

	const totalPrice = mainServices.map((item) => {
		const { container_size, containers_count } = item;

		const { free_limit, slabs, previous_days_applicable } = item[key] || {};
		const { currency = GLOBAL_CONSTANTS.currency_code.INR } = slabs?.[0] || {};

		const final_price = slabPriceCalculator({
			slabs,
			days,
			previous_days_applicable,
		});

		const extraDays = days - free_limit;

		return {
			container_size,
			preferred_rate_currency : currency,
			containers_count,
			preferred_rate          : final_price,
			preferred_rate_unit     : 'per_container',
			preferred_rate_quantity : extraDays,
		};
	});

	const getPayload = () => {
		const subsidiary_services = totalPrice.reduce((acc, curr) => {
			const {
				preferred_rate,
				preferred_rate_unit,
				preferred_rate_quantity,
				preferred_rate_currency,
			} = curr;

			const local_service_data = localServicesDetails.find(
				(local_item) => local_item.container_size === curr?.container_size,
			);

			const service_id = local_service_data.id;

			const { service_provider_id = '', shipping_line_id = '' } = rateData;

			let params = {};

			Object.values(service_rates).forEach((service) => {
				if (service.service_id === service_id && preferred_rate === 0) {
					params = {
						code         : CODE_MAPPING[key],
						service_type : 'fcl_freight_local',
						status       : 'inactive',
						service_id,
					};
				}
				return null;
			});
			if (!isEmpty(params)) {
				return [...acc, params];
			}

			if (curr?.preferred_rate <= 0) {
				return acc;
			}

			return [
				...acc,
				{
					code         : CODE_MAPPING[key],
					service_type : 'fcl_freight_local',
					status       : 'active',
					preferred_rate,
					preferred_rate_unit,
					preferred_rate_quantity:
						preferred_rate_quantity > 0 ? preferred_rate_quantity : 0,
					preferred_rate_currency,
					service_id,
					shipping_line_id,
					service_provider_id,
				},
			];
		}, []);

		return {
			id      : spot_search_id,
			service : 'subsidiary',
			subsidiary_services,
		};
	};

	const onAddDays = () => {
		const payload = getPayload();
		if (payload.subsidiary_services.length === 0) {
			Toast.error('Additional Days can not  be 0');
			return;
		}
		fetchApi(payload);
	};

	return (
		<>
			{' '}
			{maxLimit ? (
				<div className={`${styles.container} ${styles.div}`} type={type}>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<div className={styles.styled_text}>
							{freeLimit}
							{' '}
							{type}
							{' '}
							free days include in your price
						</div>

						<div
							className={styles.styled_text}
							style={{ marginTop: '8px', fontSize: '14px', fontWeight: '600' }}
						>
							Get additional
							{' '}
							{type}
							{' '}
							days for your
							{' '}
							{activeTab}
							:
						</div>

						<DaysSelect
							days={days}
							setDays={setDays}
							minimumDays={freeLimit}
							maximumDays={maxLimit}
						/>
					</div>

					<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
						<div style={{ alignItems: 'flex-end', display: 'flex', flexDirection: 'column' }}>
							<div className={styles.styled_text}> Price</div>

							<div className={styles.styled_text}>
								{totalPrice.map((item) => {
									const {
										container_size,
										containers_count,
										preferred_rate_currency,
										preferred_rate,
									} = item;

									return (
										<div style={{ display: 'flex' }}>
											<div className={styles.text}>
												{container_size}
												ft X
												{containers_count}
												{' '}
												:
											</div>

											<div style={{ marginLeft: '4px' }}>
												{preferred_rate_currency}
												{' '}
												{preferred_rate}
											</div>
										</div>
									);
								})}
							</div>
						</div>

						<Button
							className="secondary sm"
							disabled={loading}
							onClick={() => {
								onAddDays();
							}}
						>
							Add
						</Button>
					</div>
				</div>
			) : null}
		</>
	);
}
export default Component;
