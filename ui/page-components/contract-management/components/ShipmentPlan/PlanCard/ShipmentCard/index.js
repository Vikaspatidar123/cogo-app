import { Button } from '@cogoport/components';
import { format, isEmpty, startCase } from '@cogoport/utils';

import { getUnit } from '../../../../utils/getUnit';
import CardLoader from '../CardLoader';
import Route from '../Route';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import formatAmount from '@/ui/commons/utils/formatAmount';

function ShipmentCard({
	shipmentData = [],
	loading = false,
	itemData = {},
}) {
	const { push } = useRouter();
	const {
		destination_port = {},
		origin_port = {},
		destination_airport = {},
		origin_airport = {},
		service_type = '',
	} = itemData || {};

	return (
		<>
			{' '}
			{loading ? (
				<CardLoader />
			) : (
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
							net_total_price_currency = 'INR',
							shipment_date = '',
							containers_count = '',
							volume = '',
							weight = '',
							plan_object = {},
						} = val || {};
						const isActive = ['completed', 'ongoing', 'cancelled'].includes(
							state,
						);

						return (
							<div className={styles.container}>
								<div className={`${styles.shipment_date} ${styles.state}`}>
									{shipment_date && isActive && (
										<div className={styles.booked_date}>
											{format(shipment_date, 'dd MMM')}
										</div>
									)}
									<div className={`${styles.Circle} ${styles.state}`}>
										<div className={`${styles.dot} ${styles.state}`} />
									</div>
									{index === shipmentData.length - 1 && (
										<div className={`${styles.Journey_start_circle} ${state}`}>
											<div className={`${styles.journey_start_dot} ${state}`} />
										</div>
									)}
								</div>
								{shipment_id !== null ? (
									<div className={styles.card}>
										<div className={styles.card_tag} isPlan={isEmpty(plan_object)}>
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
															{format(validity_start, 'dd MMM yy')}
															{' '}
															-
															{' '}
															{format(validity_end, 'dd MMM yy')}
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
													<div className={`${styles.tag} ${styles.state}`}>
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
														currency : net_total_price_currency || 'INR',
														options  : {
															notation : 'standard',
															style    : 'currency',
														},
													})}
												</div>
												<Button
													className="secondary md"
													onClick={() => push('/shipments/[id]', `/shipments/${shipment_id}`)}
												>
													View Shipment
												</Button>
											</div>
										</div>
									</div>
								) : (
									<div className={`${styles.Card} ${styles.shipment_booking_pending}`}>
										{validity_start && (
											<div className={styles.tag}>
												Booking Date :
												{' '}
												{format(validity_start, 'dd MMM')}
											</div>
										)}
										<div className={styles.tag}>
											{getUnit(service_type)}
											{' '}
											:
											{max_count}
										</div>
										{state && (
											<div className={styles.tag}>
												{startCase(state)}
											</div>
										)}
									</div>
								)}
							</div>
						);
					})}
				</div>
			)}
		</>
	);
}

export default ShipmentCard;
