import { Button, cl } from '@cogoport/components';
import { format, isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import { getUnit } from '../../../../utils/getUnit';
import CardLoader from '../CardLoader';
import Route from '../Route';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatAmount from '@/ui/commons/utils/formatAmount';
import formatDate from '@/ui/commons/utils/formatDate';

const STATUS = ['completed', 'ongoing', 'cancelled'];

function ManualShipmentCard({
	requestData = [],
	loading = false,
	itemData = {},
}) {
	const {
		destination_port = {},
		origin_port = {},
		destination_airport = {},
		origin_airport = {},
		service_type = '',
	} = itemData || {};

	const { push } = useRouter();

	return (
		<>
			{loading ? (
				<CardLoader />
			) : (
				<div className={styles.main}>
					{(requestData || []).map((val, index) => {
						const {
							data = {},
							status: requestedStatus = 'pending',
							created_at = '',
						} = val || {};

						const { shipment_details: shipmentData = {}, containers = [] } = data || {};
						const {
							serial_id = '',
							validity_start = '',
							validity_end = '',
							state = 'upcoming',
							net_total = 0,
							id,
							net_total_price_currency = 'INR',
							created_at: shipment_date = '',
						} = shipmentData || {};

						const count = containers?.[0]?.containers_count;
						const isActive = STATUS.includes(state);

						return (
							<div className={styles.container}>
								<div className={`${styles.shipment_date} ${styles.state}`}>
									{shipment_date && isActive && (
										<div className={styles.date}>
											{formatDate({
												date       : shipment_date,
												dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
												formatType : 'date',
											})}
										</div>
									)}

									<div className={`${styles.circle} ${styles.state}`}>
										<div className={`${styles.dot} ${styles.state}`} />
									</div>

									{index === requestData.length - 1 && (
										<div className={`${styles.journey_start_circle} ${styles.state}`}>
											<div className={`${styles.journey_start_circle} ${styles.state}`} />
										</div>
									)}
								</div>

								{!isEmpty(shipmentData) ? (
									<div className={styles.card}>
										<div className={styles.left_side}>

											<div className={styles.section}>
												<div className={styles.shipment_id}>
													SID :
													{serial_id}
												</div>

												{validity_start && validity_end && (
													<div className={styles.tag}>
														{formatDate({
															date       : validity_start,
															dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
															formatType : 'date',
														})}
														{' '}
														-
														{' '}
														{formatDate({
															date       : validity_end,
															dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
															formatType : 'date',
														})}
													</div>
												)}

												<div className={styles.tag}>
													{getUnit(service_type)}
													{' '}
													Shipped :
													{count}
												</div>

												<div className={cl`${styles.tag}  ${styles.state}`}>
													{startCase(state)}
												</div>
											</div>

											<div className={`${styles.section} ${styles.section_two}`}>
												<Route
													destinationPort={destination_port}
													originPort={origin_port}
													destinationAirport={destination_airport}
													originAirport={origin_airport}
													serviceType={service_type}
												/>
											</div>
										</div>

										<div className={styles.right_side}>
											<div className={styles.freight_price}>
												{formatAmount({
													amount   : net_total,
													currency : net_total_price_currency,
													options  : {
														notation : 'standard',
														style    : 'currency',
													},
												})}
											</div>

											<Button
												themeType="tertiary"
												onClick={() => push('/shipments/[id]', `/shipments/${id}`)}
											>
												View Shipment
											</Button>
										</div>
									</div>
								) : (
									<div className={`${styles.card} ${styles.shipment_booking_pending}`}>
										<div className={styles.tag}>
											{getUnit(service_type)}
											{' '}
											:
											{count}
										</div>

										{requestedStatus && (
											<div className={`${styles.tag} ${styles.requested_status}`}>
												Request
												{' '}
												{startCase(requestedStatus)}
											</div>
										)}

										{created_at && (
											<div className={styles.tag}>
												Requested on:
												{' '}
												{format(shipment_date, 'dd MMM yy')}
											</div>
										)}
									</div>
								)}
							</div>
						);
					})}
				</div>
			)}

			{isEmpty(requestData) && (
				<div className={styles.empty_state}>
					<div className={styles.content}>
						Request data not found for this, You can request new one.
					</div>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-empty-nonfunded.svg"
						alt="empty"
					/>
				</div>
			)}
		</>
	);
}

export default ManualShipmentCard;
