import { Button, cl } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';

import { getUnit } from '../../../../utils/getUnit';
import CardLoader from '../CardLoader';
import Route from '../Route';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatAmount from '@/ui/commons/utils/formatAmount';
import formatDate from '@/ui/commons/utils/formatDate';

const STATUS = ['completed', 'ongoing', 'cancelled'];

function ShipmentCard({
	shipmentData = [],
	loading = false,
	itemData = {},
	containerDetails = {},
}) {
	const { push } = useRouter();
	const {
		destination_port = {},
		origin_port = {},
		destination_airport = {},
		origin_airport = {},
		service_type = '',
	} = itemData || {};

	if (loading) {
		<CardLoader />;
	}

	return (
		<div className={styles.main}>
			{(shipmentData || []).map((val, index) => {
				const {
					sid = '',
					validity_start = '',
					validity_end = '',
					max_count = 0,
					state = 'upcoming',
					net_total = 0,
					shipment_id = '',
					net_total_price_currency = GLOBAL_CONSTANTS.currency_code.INR,
					shipment_date = '',
					containers_count = '',
					volume = '',
					weight = '',
					plan_object = {},
					contract_service_id = '',
					service_id = '',
				} = val || {};

				const containerDetail = containerDetails[contract_service_id || service_id];

				const {
					container_size = '',
					commodity = '',
					container_type = '',
				} = containerDetail || {};

				const isActive = STATUS.includes(state);

				return (
					<div className={styles.container}>
						<div className={cl`${styles.shipment_date} ${styles[state]}`}>
							{shipment_date && isActive && (
								<div className={styles.booked_date}>
									{formatDate({
										date       : shipment_date,
										dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
										formatType : 'date',
									})}
								</div>
							)}

							<div className={cl`${styles.circle} ${styles[state]}`}>
								<div className={cl`${styles.dot} ${styles[state]}`} />
							</div>

							{index === shipmentData.length - 1 && (
								<div className={cl`${styles.journey_start_circle} ${styles[state]}`}>
									<div className={cl`${styles.journey_start_dot} ${styles[state]}`} />
								</div>
							)}
						</div>

						{shipment_id !== null ? (
							<div className={styles.card}>
								<div className={styles.card_tag}>
									{isEmpty(plan_object) ? 'Without Plan' : 'With Plan'}
								</div>

								<div className={styles.inner_card}>
									<div className={styles.left_side}>

										<div className={styles.section}>
											<div className={styles.shipment_id}>
												SID :
												{sid}
											</div>

											{validity_start && validity_end && (
												<div className={styles.tag}>
													{formatDate({
														date: validity_start,
														dateFormat:
																	GLOBAL_CONSTANTS.formats.date['dd MMM'],
														formatType: 'date',
													})}
													{' '}
													-
													{' '}
													{formatDate({
														date: validity_end,
														dateFormat:
																	GLOBAL_CONSTANTS.formats.date['dd MMM'],
														formatType: 'date',
													})}
												</div>
											)}

											<div className={styles.tag}>
												{getUnit(service_type)}
												{' '}
												Shipped :
												{' '}
												{containers_count || volume || weight}
												{' '}
												{plan_object?.max_count
															&& `/${plan_object?.max_count}`}
											</div>

											{service_type === 'fcl_freight' ? (
												<>
													<div className={styles.tag}>
														{container_type}
													</div>
													<div className={styles.tag}>{container_size}</div>
													<div className={styles.tag}>{commodity}</div>
												</>
											) : null}

											<div className={cl`${styles.tag} ${styles[state]}`}>
												{startCase(state)}
											</div>
										</div>

										<div className={cl`${styles.section} ${styles.section_two}`}>
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
												amount   : net_total || 0,
												currency : net_total_price_currency
													|| GLOBAL_CONSTANTS.currency_code.INR,
												options: {
													notation : 'standard',
													style    : 'currency',
												},
											})}
										</div>

										<Button
											size="md"
											type="button"
											themeType="secondary"
											onClick={() => push('/shipments/[id]', `/shipments/${shipment_id}`)}
										>
											View Shipment
										</Button>
									</div>

								</div>
							</div>
						) : (
							<div className={cl`${styles.card} ${styles.shipment_booking_pending}`}>
								{validity_start && (
									<div className={styles.tag}>
										Booking Date :
										{' '}
										{formatDate({
											date       : validity_end,
											dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
											formatType : 'date',
										})}
									</div>
								)}
								<div className={styles.tag}>
									{getUnit(service_type)}
									{' '}
									:
									{max_count}
								</div>

								{service_type === 'fcl_freight' ? (
									<>
										<div className={styles.tag}>
											{container_type}
										</div>
										<div className={styles.tag}>{container_size}</div>
										<div className={styles.tag}>{commodity}</div>
									</>
								) : null}

								{state && (
									<div className={styles.tags}>
										{startCase(state)}
									</div>
								)}
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
}

export default ShipmentCard;
