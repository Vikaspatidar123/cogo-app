import ContainerInfo from '@cogo/app-search/common/ContainerInfo';
import getLocationInfo from '@cogo/business-modules/helpers/locations-search';
import { Checkbox, Tooltip, Button } from '@cogoport/components';
import {
	IcCTick,
	IcMArrowUp,
	IcMEdit,
	IcMMinusInCircle,
	IcMPortArrow,
} from '@cogoport/icons-react';
import React, { useState } from 'react';

import MAPPING from '../../../Info/icons-services-mapping';

import enquiryLocations from './enquiry-locations';
import { renderItem } from './Item';
import styles from './styles.module.css';

const mainServices = ['fcl_freight', 'lcl_freight', 'air_freight'];

function Service({
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
}) {
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
			servicesObjectArr =				formData?.[`${service?.service}:${service?.trade_type}`];
		} else {
			servicesObjectArr =				formData?.[`${service?.service}:${service?.trade_type}`];
		}
	} else {
		servicesObjectArr =			clubbingSimilarNegoServices[`${service?.service}:${service?.trade_type}`];
		service_type = service?.service;
	}

	const handleChange = (enquirySelected) => {
		if (enquirySelected) {
			const payloadObject = {
				service    : service?.service,
				service_id : service?.id,
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
			<div
				className={styles.div}
				role="presentation"
				onClick={() => handleDeletion(service)}
				style={{ marginRight: '10px' }}
			>
				<IcMMinusInCircle
					style={{ color: '#EF9B9B', width: '2em', height: '2em' }}
				/>
			</div>
		),
	};

	let showEditButton = false;
	Object.keys(addedServiceEnquiry || {}).forEach((key) => {
		if (
			key === `${service?.service}:${service?.trade_type}`
			|| key === service?.id
		) {
			if (addedServiceEnquiry[key]?.length) {
				showEditButton = true;
			}
		}
	});

	return (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<div
				role="presentation"
				className={styles.container}
				onClick={results_type === 'rfq' ? null : handleClick}
				marginBottom={isOpen ? 0 : 16}
			>
				<div style={{ display: 'flex' }}>
					<div className={styles.icon_container}>
						<div
							className={styles.icon}
							type={mapped.icon}
							style={{ height: '2.5em', width: '2.5em' }}
						/>
					</div>

					<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: '1' }}>
						<div
							style={{ marginLeft: '20px', marginTop: '6px', display: 'flex' }}
						>
							<div style={{ display: 'flex' }}>
								<div className={styles.service_type}>{service?.title}</div>

								{showEditButton ? (
									<IcCTick style={{ marginLeft: '8px', marginBottom: '5px' }} />
								) : null}

								{negotiationServiceIds.length ? (
									<IcCTick style={{ marginLeft: '8px', marginBottom: '5px' }} />
								) : null}
							</div>

							{mainServices.includes(service?.service_type)
							&& !negotiationServiceIds.length ? (
								<div className={styles.port_pairs}>
									<Tooltip
										placement="bottom"
										theme="light"
										content={(
											<div
												style={{ fontSize: '10px' }}
											>
												{`${origin?.port_code} ${origin?.display_name}}`}
											</div>
										)}
									>
										<div className={styles.port}>
											{`${origin?.port_code}, ${origin?.display_name}`}
										</div>
									</Tooltip>

									<IcMPortArrow style={{ margin: '2px 8px 0px 8px' }} />

									<Tooltip
										placement="bottom"
										theme="light"
										content={(
											<div
												style={{ fontSize: '10px' }}
											>
												{`${destination?.port_code} ${destination?.display_name}`}
											</div>
										)}
									>
										<div className={styles.port}>
											{`${destination?.port_code}, ${destination?.display_name}`}
										</div>
									</Tooltip>
								</div>
								) : null}
							<ContainerInfo detail={service} />
						</div>

						<div style={{ display: 'flex' }}>
							{mainServices.includes(service?.service_type)
							&& !negotiationServiceIds.length
							&& service?.service_type === 'air_freight' ? (
								<div>
									<p>Cargo Ready Date</p>
									<p>{service?.cargo_clearance_date}</p>
								</div>
								) : null}
						</div>

						{results_type !== 'rfq' ? (
							<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
								{showEditButton ? (
									<>
										{buttons?.renderDeleteButton}
										{buttons?.renderEditButton}
									</>
								) : (
									buttons.renderButton
								)}
							</div>
						) : null}
					</div>
				</div>

				{(servicesObjectArr || []).map((obj) => (
					<div className={styles.service_details}>{renderItem([obj], service_type)}</div>
				))}
			</div>

			{results_type === 'rfq' ? (
				<div className={styles.check_box_container}>
					<Checkbox
						checked={isChecked}
						onChange={handleChange}
						id="enquiry_create_choose_checkbox"
					/>
				</div>
			) : null}
		</div>
	);
}

export default Service;
