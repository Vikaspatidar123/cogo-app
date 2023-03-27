import React, { useState } from 'react';
import Icon from '@cogo/deprecated_legacy/icons/Icon';
import getLocationInfo from '@cogo/business-modules/helpers/locations-search';
import MAPPING from '@cogo/app-search/utils/icons';
import ContainerInfo from '@cogo/app-search/common/ContainerInfo';
import { Checkbox, Flex, ToolTip } from '@cogoport/front/components';
import {
	IcCTick,
	IcMArrowUp,
	IcMEdit,
	IcMMinusInCircle,
	IcMPortArrow,
} from '@cogoport/icons-react';
import enquiryLocations from './enquiry-locations';
import { renderItem } from './Item';
import {
	Container,
	ServiceType,
	Button,
	IconContainer,
	CheckBoxContainer,
	PortPairs,
	Port,
	Div,
	ServiceDetails,
} from './styles';

const mainServices = ['fcl_freight', 'lcl_freight', 'air_freight'];

const Service = ({
	service,
	setSelectedService,
	isOpen = false,
	results_type,
	payLoad = [],
	setPayLoad,
	setServiceID,
	formData,
	addedServiceEnquiry,
	handleDeletion,
	clubbingSimilarNegoServices = {},
	negotiationServiceIds = [],
}) => {
	const locationDetails = enquiryLocations[service?.service];
	const [isChecked, setIsChecked] = useState(false);
	const { origin, destination } = getLocationInfo('', service, locationDetails);

	const mapped = MAPPING[service?.service];

	if (!mapped) {
		return null;
	}
	const handleClick = () => {
		setSelectedService(isOpen ? null : service);
	};

	let servicesObjectArr = [];

	let service_type = '';

	if (!Object.keys(clubbingSimilarNegoServices).length) {
		if (service?.similar_service_details?.length) {
			service_type = service?.service;
			servicesObjectArr =
				formData?.[`${service?.service}:${service?.trade_type}`];
		} else {
			servicesObjectArr =
				formData?.[`${service?.service}:${service?.trade_type}`];
		}
	} else {
		servicesObjectArr =
			clubbingSimilarNegoServices[`${service?.service}:${service?.trade_type}`];
		service_type = service?.service;
	}

	const handleChange = (enquirySelected) => {
		if (enquirySelected) {
			const payloadObject = {
				service: service?.service,
				service_id: service?.id,
			};
			setPayLoad([...(payLoad || []), payloadObject]);
		} else if (!enquirySelected) {
			const newArray = (payLoad || []).filter(
				(item) => item?.service_id !== service?.id,
			);
			setPayLoad([...(newArray || [])]);
		}
		setServiceID(service?.id);
		setIsChecked(!isChecked);
	};

	const buttons = {
		renderButton: <Button>{!isOpen ? '+' : '-'}</Button>,

		renderEditButton: (
			<Button>
				{!isOpen ? <IcMEdit color="#fff" /> : <IcMArrowUp color="#fff" />}
			</Button>
		),

		renderDeleteButton: (
			<Div
				onClick={() => handleDeletion(service)}
				style={{ marginRight: '10px' }}
			>
				<IcMMinusInCircle
					style={{ color: '#EF9B9B', width: '2em', height: '2em' }}
				/>
			</Div>
		),
	};

	let showEditButton = false;
	Object.keys(addedServiceEnquiry || {}).forEach((key) => {
		if (
			key === `${service?.service}:${service?.trade_type}` ||
			key === service?.id
		) {
			if (addedServiceEnquiry[key]?.length) {
				showEditButton = true;
			}
		}
	});

	return (
		<Flex alignItems="center">
			<Container
				onClick={results_type === 'rfq' ? null : handleClick}
				marginBottom={isOpen ? 0 : 16}
			>
				<Flex>
					<IconContainer>
						<Icon
							type={mapped.icon}
							style={{ height: '2.5em', width: '2.5em' }}
						/>
					</IconContainer>

					<Flex alignItems="center" justifyContent="space-between" flex="1">
						<Flex
							display="block"
							style={{ marginLeft: '20px', marginTop: '6px' }}
						>
							<Flex>
								<ServiceType>{service?.title}</ServiceType>

								{showEditButton ? (
									<IcCTick style={{ marginLeft: '8px', marginBottom: '5px' }} />
								) : null}

								{negotiationServiceIds.length ? (
									<IcCTick style={{ marginLeft: '8px', marginBottom: '5px' }} />
								) : null}
							</Flex>

							{mainServices.includes(service?.service_type) &&
							!negotiationServiceIds.length ? (
								<PortPairs>
									<ToolTip
										placement="bottom"
										theme="light"
										content={
											<div
												style={{ fontSize: '10px' }}
											>{`${origin?.port_code} ${origin?.display_name}}`}</div>
										}
									>
										<Port>{`${origin?.port_code}, ${origin?.display_name}`}</Port>
									</ToolTip>

									<IcMPortArrow style={{ margin: '2px 8px 0px 8px' }} />

									<ToolTip
										placement="bottom"
										theme="light"
										content={
											<div
												style={{ fontSize: '10px' }}
											>{`${destination?.port_code} ${destination?.display_name}`}</div>
										}
									>
										<Port>{`${destination?.port_code}, ${destination?.display_name}`}</Port>
									</ToolTip>
								</PortPairs>
							) : null}
							<ContainerInfo detail={service} />
						</Flex>

						<Flex>
							{mainServices.includes(service?.service_type) &&
							!negotiationServiceIds.length &&
							service?.service_type === 'air_freight' ? (
								<div>
									<p>Cargo Ready Date</p>
									<p>{service?.cargo_clearance_date}</p>
								</div>
							) : null}
						</Flex>

						{results_type !== 'rfq' ? (
							<Flex justifyContent="flex-end">
								{showEditButton ? (
									<>
										{buttons?.renderDeleteButton}
										{buttons?.renderEditButton}
									</>
								) : (
									buttons.renderButton
								)}
							</Flex>
						) : null}
					</Flex>
				</Flex>

				{(servicesObjectArr || []).map((obj) => {
					return (
						<ServiceDetails>{renderItem([obj], service_type)}</ServiceDetails>
					);
				})}
			</Container>

			{results_type === 'rfq' ? (
				<CheckBoxContainer>
					<Checkbox
						checked={isChecked}
						onChange={handleChange}
						id="enquiry_create_choose_checkbox"
					/>
				</CheckBoxContainer>
			) : null}
		</Flex>
	);
};

export default Service;
