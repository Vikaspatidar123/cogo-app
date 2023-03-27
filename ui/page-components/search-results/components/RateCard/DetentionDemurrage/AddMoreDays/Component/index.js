import { Flex, Text } from '@cogoport/front/components';
import { useState } from 'react';
import { Button, toast } from '@cogoport/front/components/admin';
import { isEmpty } from '@cogoport/front/utils';
import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals.json';
import DaysSelect from '../../../commons/DaysSelect';
import { StyledText, Container } from './styles';
import useAddMoreDays from '../../hooks/useAddMoreDays;';
import slabPriceCalculator from '../../utils/slabPriceCalculator';

const CODE_MAPPING = {
	origin_detention: 'EDT',
	origin_demurrage: 'EDE',
	destination_detention: 'DET',
	destination_demurrage: 'DEA',
};

const Component = ({
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
}) => {
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
			preferred_rate_currency: currency,
			containers_count,
			preferred_rate: final_price,
			preferred_rate_unit: 'per_container',
			preferred_rate_quantity: extraDays,
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
						code: CODE_MAPPING[key],
						service_type: 'fcl_freight_local',
						status: 'inactive',
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
					code: CODE_MAPPING[key],
					service_type: 'fcl_freight_local',
					status: 'active',
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
			id: spot_search_id,
			service: 'subsidiary',
			subsidiary_services,
		};
	};

	const onAddDays = () => {
		const payload = getPayload();
		if (payload.subsidiary_services.length === 0) {
			toast.error('Additional Days can not  be 0');
			return;
		}
		fetchApi(payload);
	};

	return (
		<>
			{maxLimit ? (
				<Container type={type}>
					<Flex direction="column">
						<StyledText>
							{freeLimit} {type} free days include in your price
						</StyledText>

						<StyledText
							style={{ marginTop: '8px', fontSize: '14px', fontWeight: '600' }}
						>
							Get additional {type} days for your {activeTab}:
						</StyledText>

						<DaysSelect
							days={days}
							setDays={setDays}
							minimumDays={freeLimit}
							maximumDays={maxLimit}
						/>
					</Flex>

					<Flex direction="column" style={{ justifyContent: 'space-between' }}>
						<Flex direction="column" style={{ alignItems: 'flex-end' }}>
							<StyledText> Price</StyledText>

							<StyledText>
								{totalPrice.map((item) => {
									const {
										container_size,
										containers_count,
										preferred_rate_currency,
										preferred_rate,
									} = item;

									return (
										<Flex>
											<Text>
												{container_size}ft X {containers_count} :
											</Text>

											<Text style={{ marginLeft: '4px' }}>
												{preferred_rate_currency} {preferred_rate}
											</Text>
										</Flex>
									);
								})}
							</StyledText>
						</Flex>

						<Button
							className="secondary sm"
							disabled={loading}
							onClick={() => {
								onAddDays();
							}}
						>
							Add
						</Button>
					</Flex>
				</Container>
			) : null}
		</>
	);
};
export default Component;
