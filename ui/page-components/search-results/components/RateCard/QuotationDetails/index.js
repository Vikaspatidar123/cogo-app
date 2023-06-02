import { cl } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState, forwardRef } from 'react';

import FeedBackModal from '../../NoResultFound/FeedbackModal';

import LineItems from './LineItems';
import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function QuotationDetails(
	{ data = {}, details = {}, isConfirmed = false },
	ref,
) {
	const [open, setOpen] = useState(false);
	const [openService, setOpenService] = useState('');
	const [requestService, setRequestService] = useState({
		service_id    : undefined,
		service_type  : undefined,
		selected_card : undefined,
		service_data  : undefined,
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
		const { is_rate_available = false, service_type: serviceType = '' } = item || {};

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
				<div className={styles.service_details}>
					<div className={styles.service_info}>{handleService()}</div>

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

				</div>

				{is_rate_available
					? (item?.line_items || []).map((lineItem, index) => (
						<>
							{index !== 0 ? <div className={styles.line} /> : null}
							<LineItems item={lineItem} />
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

	return (
		<div className={cl`${styles.container} ${isConfirmed ? styles.confirmed : ''}`} ref={ref}>
			{(Object.keys(groupedServices || {}) || []).map((service) => (
				<>
					<div className={cl`${styles.service}
					${styles.isConfirmed ? styles.confirmed : ''} ${styles.service_dropdown}}`}
					>
						<div className={styles.flex_row}>
							{(groupedServices[service] || [])[0]?.service ? (
								<div className={styles.service_text}>{handleServicesNames(service)}</div>
							) : (
								<div className={styles.service_text}>{startCase(service)}</div>
							)}

							<div
								role="presentation"
								style={{ display: 'flex', cursor: 'pointer' }}
								onClick={() => handleOpen(service)}
							>
								{handleIcon(service)}
							</div>
						</div>
					</div>

					<div
						className={cl`${styles.animated_container} 
						${open && service === openService ? styles.enter : styles.exit}`}
					>
						<div>
							{(groupedServices[service] || []).map((item) => handleLineItemsBreakup(item))}
						</div>
					</div>
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
		</div>
	);
}

export default forwardRef(QuotationDetails);
