import { useRequest } from '@cogo/commons/hooks';
import getGeoConstants from '@cogo/globalization/constants/geo';
import formatAmount from '@cogo/globalization/utils/formatAmount';
import { useRouter } from '@cogo/next';
import { useSelector } from '@cogo/store';
import { Flex } from '@cogoport/front/components';
import { Button } from '@cogoport/front/components/admin';
import { startCase } from '@cogoport/front/utils';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import React, { useState, forwardRef } from 'react';

import formatSwbPayload from '../../../utils/format-swb-payload';
import FeedBackModal from '../../NoResultFound/FeedbackModal';

import LineItems from './LineItems';
import {
	Container,
	Service,
	Line,
	FlexRow,
	ServiceDetails,
	ServiceInfo,
	ServiceText,
	AnimatedContainer,
	BtnContainer,
} from './styles';

const LOCALS = [
	'origin_air_freight_local',
	'destination_air_freight_local',
	'origin_lcl_freight_local',
	'destination_lcl_freight_local',
];

const CUSTOMS = ['fcl_customs', 'lcl_customs', 'air_customs'];

const geo = getGeoConstants();

const cogoVerseTeamIDS = [
	geo.uuid.cogoverse_admin_id,
	geo.uuid.cogoverse_executive_id,
	geo.uuid.cogoverse_kam_id,
];

function QuotationDetails(
	{ data = {}, details = {}, isConfirmed = false, searchData = {} },
	ref,
) {
	const { service_details = {} } = details || {};
	const { touch_points = {} } = searchData || {};
	const router = useRouter();

	const {
		isMobile,
		scope,
		query = {},
		userRoleIDs = [],
	} = useSelector(({ general, profile }) => ({
		isMobile    : general.isMobile,
		scope       : general.scope,
		query       : general?.query,
		userRoleIDs : profile?.partner?.user_role_ids,
	}));

	const createCheckoutApi = useRequest(
		'post',
		false,
		scope,
	)('/create_checkout');

	const [open, setOpen] = useState(false);
	const [openService, setOpenService] = useState('');
	const [requestService, setRequestService] = useState({
		service_id    : undefined,
		service_type  : undefined,
		selected_card : undefined,
	});
	const [showFeedbackModal, setShowFeedBackModal] = useState(false);
	const services_ids = Object.keys(data?.service_rates || {});
	const services = (services_ids || []).map((key) => ({
		...data?.service_rates[key],
		id: key,
	}));

	const groupedServices = {};
	(services || []).forEach((item) => {
		const serviceData = details?.service_details[item?.id];

		let service = '';
		if (item?.service) {
			if (item?.trade_type === 'import') {
				service = `destination_${item?.service_name}_${item?.service}`;
				if (item?.service_type === 'subsidiary') {
					service = `destination_${item?.service_type}_${item?.code}`;
				}
			} else if (item?.trade_type === 'export') {
				service = `origin_${item?.service_name}_${item?.service}`;
				if (item?.service_type === 'subsidiary') {
					service = `origin_${item?.service_type}_${item?.code}`;
				}
			} else {
				service = `${item?.service_name}_${item?.service}`;
			}
		} else if (item?.service_type === 'cargo_insurance') {
			service = `${item?.service_type}`;
		} else if (item?.trade_type === 'import') {
			service = `destination_${item?.service_type}`;
		} else if (item?.trade_type === 'export') {
			service = `origin_${item?.service_type}`;
		} else if (
			item?.trade_type === 'domestic'
			&& details?.service_type === 'air_freight'
		) {
			service = `terminal_${serviceData?.terminal_charge_type}`;
		} else {
			service = item?.service_type;
		}
		groupedServices[service] = [...(groupedServices[service] || []), item];
	});

	const handleOpen = (service) => {
		if (openService === service) {
			setOpen(!open);
		} else {
			setOpen(true);
			setOpenService(service);
		}
	};

	const handleIcon = (service) => {
		if (open && service === openService) {
			return <IcMArrowRotateUp size={1.25} style={{ margin: 'auto' }} />;
		}
		return <IcMArrowRotateDown size={1.25} style={{ margin: 'auto' }} />;
	};

	const handleLineItemsBreakup = (item) => {
		const service = details?.service_details[item?.id];
		const { is_rate_available = false, service_type: serviceType = '' } =			item || {};

		const {
			container_size,
			container_type,
			commodity,
			packages = [],
			truck_type = '',
			service_type = '',
			terminal_charge_type = '',
			trade_type = '',
			volume = '',
			weight = '',
			cargo_weight_per_container = '',
		} = service || {};

		const { packing_type = '', handling_type = '' } = packages[0] || {};

		let size = '';
		let type = '';
		let comm = '';
		let truckType = '';
		let packageType = '';
		let packageHandlingType = '';
		let weight_per_container = '';

		if (container_size) {
			if (container_type || commodity) {
				size = `${container_size} ft, `;
			} else {
				size = `${container_size} ft`;
			}
		}

		if (container_type) {
			if (commodity) {
				type = `${startCase(container_type)}, `;
			} else {
				type = startCase(container_type);
			}
		}

		if (truck_type) {
			truckType = startCase(truck_type);
		}

		if (commodity) {
			comm = startCase(commodity);
		}

		if (packages.length) {
			packageType = startCase(packing_type);
			packageHandlingType = startCase(handling_type);
		}

		if (cargo_weight_per_container) {
			weight_per_container = `, ${cargo_weight_per_container}MT`;
		}

		const fclLocals = ['fcl_freight_local', 'air_freight_local'].includes(
			serviceType,
		)
			? 'Local charges will be billed at Actual'
			: 'No Rates';

		const handleService = () => {
			let additonalInfo = '';
			if (volume) {
				additonalInfo = `VOL: ${volume}cbm`;
			}
			if (weight) {
				additonalInfo += ` WT: ${weight}`;
			}

			if (
				['air_freight', 'air_freight_local'].includes(service_type)
				&& trade_type !== 'domestic'
			) {
				return `${size}${type}${comm} ${packageType} ${packageHandlingType} ${additonalInfo}`;
			}

			if (service_type === 'ftl_freight') {
				return `${size}${type}${truckType}`;
			}

			if (
				trade_type === 'domestic'
				&& terminal_charge_type
				&& service_type === 'air_freight_local'
			) {
				return `${size}${type}${comm} ${packageType} ${packageHandlingType} ${additonalInfo}`;
			}

			if (service_type === 'rail_domestic_freight') {
				return `${size}${type}${comm}${weight_per_container}`; // Prize Type i.e. NET NET OR ALL IN
			}

			return `${size}${type}${comm}`;
		};

		return (
			<>
				<ServiceDetails>
					<ServiceInfo>{handleService()}</ServiceInfo>

					{is_rate_available
						? formatAmount({
							amount   : item?.total_price_discounted,
							currency : item?.total_price_currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 0,
							},
						  })
						: fclLocals}
				</ServiceDetails>

				{is_rate_available
					? (item?.line_items || []).map((lineItem, index) => (
						<>
							{index !== 0 ? <Line /> : null}
							<LineItems item={lineItem} isMobile={isMobile} />
						</>
					  ))
					: null}
			</>
		);
	};

	const handleServicesNames = (item) => {
		const serviceObj = (groupedServices[item] || [])[0];
		let tradeType = '';
		if (serviceObj?.trade_type === 'export') {
			tradeType = 'Origin';
		}
		if (serviceObj?.trade_type === 'import') {
			tradeType = 'Destination';
		}
		const service = serviceObj?.service_name;
		const serviceType = serviceObj?.service;

		return `${tradeType} ${service} (${startCase(serviceType)})`;
	};

	const handleAddRate = async (service_name) => {
		try {
			const tab_source = service_name.includes('subsidiary')
				? 'subsidiary_services'
				: 'services';

			setOpenService(service_name);
			const service_payload = formatSwbPayload({
				service_details,
				touch_points,
				values: data,
			});

			const service_payload_final = {};
			Object.keys(service_payload).forEach((service) => {
				if (service_payload[service].length !== 0) {
					service_payload_final[service] = service_payload?.[service];
				}
			});

			const primary_service =				details?.search_type === 'trailer_freight'
				? 'haulage_freight'
				: details?.search_type;

			const isCogoVerseMember = userRoleIDs.some((elem) => cogoVerseTeamIDS.includes(elem));

			const payload = {
				source                      : 'spot_search',
				source_id                   : details?.id,
				primary_service,
				importer_exporter_id        : details?.importer_exporter_id,
				importer_exporter_branch_id : details?.importer_exporter_branch_id,
				user_id                     : details?.user?.id,
				quotation_type              : 'customize',
				existing_shipment_id:
					details?.source === 'upsell' ? details?.source_id : undefined,
				...service_payload_final,
				tags:
					scope === 'partner'
					&& (query?.source === 'communication' || isCogoVerseMember)
						? ['cogoverse']
						: undefined,
			};

			const res = await createCheckoutApi.trigger({ data: payload });

			if (!res.hasError) {
				router.push(
					`/customize-checkout/[checkout_id]?tab=${tab_source}`,
					`/customize-checkout/${res?.data?.id}?tab=${tab_source}`,
				);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const checkIfRateAvailable = (groupedService) => {
		if (scope === 'app') {
			return true;
		}

		const check = (groupedService || []).every((serv) => serv?.is_rate_available);

		return check;
	};

	const handleRateFeedback = (service) => {
		setShowFeedBackModal(true);
		setRequestService({
			service_id    : groupedServices[service][0]?.id,
			service_type  : groupedServices[service][0]?.service_type,
			selected_card : data?.card || null,
		});
	};

	const handleShowButtons = (service) => (
		<BtnContainer>
			{/* {!CUSTOMS.includes(details?.search_type) ? ( */}
			<Button
				onClick={() => {
					handleAddRate(service);
				}}
				disabled={service === openService && createCheckoutApi.loading}
				className="primary sm"
				type="button"
			>
				Add Rate
			</Button>
			{/* // ) : null} */}
			{!LOCALS.includes(service) && !service.includes('subsidiary') ? (
				<Button
					onClick={() => {
						handleRateFeedback(service);
					}}
					style={{ marginLeft: '10px' }}
					className="secondary sm"
					type="button"
					disabled={service.includes('cargo_insurance')}
				>
					{!service.includes('cargo_insurance') ? 'REQUEST RATE' : 'No Rates'}
				</Button>
			) : null}
		</BtnContainer>
	);

	return (
		<Container ref={ref} className={isConfirmed ? 'confirmed' : ''}>
			{(Object.keys(groupedServices || {}) || []).map((service) => (
				<>
					<Service
						className={`${isConfirmed ? 'confirmed' : ''}service_dropdown`}
					>
						<FlexRow>
							{(groupedServices[service] || [])[0]?.service ? (
								<ServiceText>{handleServicesNames(service)}</ServiceText>
							) : (
								<ServiceText>{startCase(service)}</ServiceText>
							)}

							{checkIfRateAvailable(groupedServices[service])
							|| service.includes('fcl_freight_local')
							|| service.includes('air_freight_local')
							|| (CUSTOMS.includes(details?.search_type)
								&& !service.includes('subsidiary')) ? (
									<Flex
										style={
										isMobile
											? { cursor: 'pointer', marginLeft: 'auto' }
											: { cursor: 'pointer' }
									}
										onClick={() => handleOpen(service)}
									>
										{handleIcon(service)}
									</Flex>
								) : (
									handleShowButtons(service)
								)}
						</FlexRow>
					</Service>

					<AnimatedContainer
						type={open && service === openService ? 'enter' : 'exit'}
					>
						<div>
							{(groupedServices[service] || []).map((item) => handleLineItemsBreakup(item))}
						</div>
					</AnimatedContainer>
					{showFeedbackModal ? (
						<FeedBackModal
							onClose={() => {
								setShowFeedBackModal(false);
							}}
							show={showFeedbackModal}
							details={details}
							requestService={requestService}
						/>
					) : null}
				</>
			))}
		</Container>
	);
}

export default forwardRef(QuotationDetails);
