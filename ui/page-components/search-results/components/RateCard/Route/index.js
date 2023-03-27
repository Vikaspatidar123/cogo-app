import React from 'react';
import isEmpty from '@cogo/utils/isEmpty';
import getLocationInfo from '@cogo/business-modules/helpers/locations-search';
import { Flex } from '@cogoport/front/components';
import { Container, Circle, Line, RouteContainer, Location } from './styles';
import ShippingLine from './ShippingLine';

const pick_services = ['trailer_freight', 'ftl_freight', 'ltl_freight'];

const mapping1 = ['fcl_customs', 'lcl_customs', 'air_customs'];

const Route = ({
	data = {},
	details = {},
	results_type = '',
	isOriginHaulageRates = false,
	isDestinationHaulageRates = false,
	isMobile,
}) => {
	const originIcd =
		details?.trade_type === 'export'
			? details?.origin_port?.is_icd || details?.port?.is_icd
			: details?.origin_port?.is_icd;
	const destinationIcd =
		details?.trade_type === 'import'
			? details?.destination_port?.is_icd || details?.port?.is_icd
			: details?.destination_port?.is_icd;

	const getICDKeys = () => {
		let origin_key = null;
		let destination_key = null;

		if (originIcd) {
			origin_key =
				details?.search_type === 'fcl_customs' ||
				details?.search_type === 'fcl_freight_local'
					? 'main_port'
					: 'origin_main_port';
		} else {
			origin_key = 'origin_port';
		}

		if (destinationIcd) {
			destination_key =
				details?.search_type === 'fcl_customs' ||
				details?.search_type === 'fcl_freight_local'
					? 'main_port'
					: 'destination_main_port';
		} else {
			destination_key = 'destination_port';
		}

		return {
			origin: origin_key,
			destination: destination_key,
		};
	};

	const { origin, destination } = getLocationInfo(
		'search_type',
		{ ...data, ...details },
		details?.search_type === 'fcl_freight' ||
			(details?.search_type === 'fcl_customs' && details?.port?.is_icd) ||
			(details?.search_type === 'fcl_freight_local' && details?.port?.is_icd)
			? getICDKeys()
			: {},
	);

	const service_ids = Object.keys(details?.service_details || {});
	const services = (service_ids || []).map((id) => ({
		...details?.service_details[id],
	}));
	const origin_services = (services || []).filter(
		(service) => service?.trade_type === 'export',
	);
	const destination_services = (services || []).filter(
		(service) => service?.trade_type === 'import',
	);

	const originPickup = (
		(origin_services || []).map((item) => item?.service_type) || []
	).filter((item) => pick_services.includes(item));
	const uniq_origin_pickup = [...new Set(originPickup)];
	const originPickupData = !isEmpty(uniq_origin_pickup)
		? (origin_services || []).filter(
				(item) => item.service_type === (uniq_origin_pickup || [])[0],
		  )
		: null;

	const destinationPickup = (
		(destination_services || []).map((item) => item?.service_type) || []
	).filter((item) => pick_services.includes(item));
	const uniq_destination_pickup = [...new Set(destinationPickup)];
	const destinationPickupData = !isEmpty(uniq_destination_pickup)
		? (destination_services || []).filter(
				(item) => item.service_type === (uniq_destination_pickup || [])[0],
		  )
		: null;

	const show = !isEmpty(data?.shipping_line) || !isEmpty(data?.airline);
	const showLogo = data?.shipping_line?.logo_url || data?.airline?.logo_url;

	const customMargin = {
		marginLeft: mapping1.includes(details?.search_type) ? '-15px' : '',
	};

	return (
		<Container>
			<ShippingLine
				show={show}
				showLogo={showLogo}
				data={data}
				isMobile={isMobile}
			/>

			<RouteContainer>
				<Flex display="block" style={{ width: '100%' }}>
					<Flex style={{ width: '100%' }}>
						<Circle className={!isEmpty(originPickup) ? null : 'inactive'} />
						<Line
							className={!isEmpty(originPickup) ? null : 'inactive'}
							style={{ width: '100%' }}
						/>
					</Flex>

					{!isEmpty(originPickup) ? (
						<Location>
							{(originPickupData || [])[0]?.origin_location?.name}
						</Location>
					) : null}
				</Flex>

				{originIcd ? (
					<Flex display="block" style={{ width: '100%', marginLeft: '-4px' }}>
						<Flex style={{ width: '100%' }}>
							<Circle />
							<Line
								style={{ width: '100%' }}
								className={isOriginHaulageRates ? 'rates' : 'inactive'}
							/>
						</Flex>
						<Location>
							{details?.origin_port?.port_code || details?.port?.port_code}
						</Location>
					</Flex>
				) : null}

				{origin ? (
					<Flex
						display="block"
						style={
							results_type === 'rfq'
								? { marginLeft: '-30px' }
								: { marginLeft: '-9px' }
						}
					>
						<Flex>
							<Circle className="main" />
							<Line
								className={destination ? 'main' : 'inactive'}
								style={{ width: '15px' }}
							/>
						</Flex>

						<Location className="main">
							{origin?.port_code || origin?.name}
						</Location>
					</Flex>
				) : null}

				{destination || origin ? (
					<Flex display="block" style={{ width: '100%', ...customMargin }}>
						<Flex>
							{destination?.port_code || destination?.postal_code ? (
								<Circle className="main" />
							) : null}

							<Line
								className={
									destinationIcd || !isEmpty(destinationPickup)
										? null
										: 'inactive'
								}
								style={{ width: '100%' }}
							/>
						</Flex>

						<Location className="main">
							{destination?.port_code || destination?.name}
						</Location>
					</Flex>
				) : null}

				{destinationIcd ? (
					<Flex display="block" style={{ width: '100%', marginLeft: '-4px' }}>
						<Flex>
							<Circle />
							<Line
								className={`${
									!isEmpty(destinationPickup) ? null : 'inactive'
								} ${isDestinationHaulageRates ? 'rates' : ''}`}
								style={{ width: '100%' }}
							/>
						</Flex>

						<Location style={{ textAlign: 'end' }}>
							{details?.destination_port?.port_code || details?.port?.port_code}
						</Location>
					</Flex>
				) : null}

				{/* {mapping2.includes(details?.search_type) &&
				!(originIcd || destinationIcd) ? (
					<Flex display="block" style={{ width: '400px', marginLeft: '-10px' }}>
						<Flex style={{ width: '100%' }}>
							<Line
								style={{ width: '100%' }}
								className={isOriginHaulageRates ? 'rates' : 'inactive'}
							/>
						</Flex>
					</Flex>
				) : null} */}

				<Flex display="block" style={{ marginLeft: '-4px' }}>
					<Circle className={!isEmpty(destinationPickup) ? null : 'inactive'} />

					{!isEmpty(destinationPickup) ? (
						<Location>
							{(destinationPickupData || [])[0]?.destination_location?.name}
						</Location>
					) : null}
				</Flex>
			</RouteContainer>
		</Container>
	);
};

export default Route;
