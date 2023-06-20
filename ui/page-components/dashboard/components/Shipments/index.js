import { Button } from '@cogoport/components';
import { IcMArrowNext, IcMFship } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';

import ContainerDetails from '../../common/ContainerDetails';
import LoaderPage from '../../common/LoaderPage';
import { getLocation } from '../../common/location';
import ListShipments from '../../hooks/ListShipments';

import ServiceTypeIcon from './ServiceTypeIcon';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import getText from '@/ui/page-components/dashboard/common/getText';

const onlySingleLocation = [
	'fcl_customs',
	'lcl_customs',
	'air_customs',
	'fcl_cfs',
];

const renderStatus = (ogShipmentData, service) => {
	const textObj = getText(ogShipmentData, service);

	return (
		<text className={styles.text} style={{ backgroundColor: textObj.color }}>
			{textObj.text}
		</text>
	);
};
function Shipments() {
	const { loading, data } = ListShipments();

	const usable = data?.list || [];
	const { push } = useRouter();
	if (loading) {
		return <LoaderPage skeletonCount={2} />;
	}
	return (
		<div>
			{usable.length > 0 && (
				<div className={styles.header}>
					<div>Your Ongoing Shipments</div>

					{(usable || []).map((val) => {
						const containerInfoData = {
							container_size   : val?.container_size,
							container_type   : val?.container_type,
							containers_count : val?.containers_count,
							commodity        : val?.commodity,
							cargo_weight_per_container:
											val?.cargo_weight_per_container,
							inco_term    : val?.inco_term,
							rates_count  : val?.rates_count,
							trucks_count : val?.trucks_count,
							trade_type   : val?.trade_type,
							packages     : val?.packages,
							volum        : val?.volum,
							weight       : val?.weight,
						};
						return (
							<div className={styles.second}>
								<div className={styles.inner}>
									<div className={styles.data}>
										<div className={styles.first_data}>
											<div className={styles.id}>
												<p className={styles.sub_id}>
													id:
												</p>
												<div className={styles.sub}>
													{val?.serial_id}
												</div>
											</div>
											<div className={styles.sub_lcl}>
												<ServiceTypeIcon
													freight_type={
																								val?.service_type
																								|| val?.shipment_type
																							}
												/>
											</div>
										</div>

										{onlySingleLocation.includes(
											val?.service_type
																						|| val?.shipment_type,
										) ? (
											<div className={styles.second_data}>
												{
																							getLocation(true, val)
																								.location
																						}
												<span
													className={
																								styles.location_span
																							}
												>
													{
																								getLocation(false, val)
																									.country
																							}
												</span>
											</div>
											) : (
												<div className={styles.second_data}>
													<div className={styles.origin}>
														{
																								getLocation(true, val)
																									.location
																							}
														<span
															className={
																									styles.location_span
																								}
														>
															{
																									getLocation(
																										false,
																										val,
																									).country
																								}
														</span>
													</div>
													<div>
														<IcMArrowNext />
													</div>
													<div />
													<div className={styles.origin}>
														{getLocation(false, val)
															.location}
														<span
															className={styles.location_span}
														>
															{getLocation(
																false,
																val,
															).country}
														</span>
													</div>
												</div>
											)}
										<ContainerDetails
											containerInfoData={
											containerInfoData
}
											service_type={val?.service_type || val?.shipment_type}
										/>
										<div className={styles.fouth_data}>
											<div className={styles.first_row}>
												<IcMFship
													className={styles.image}
												/>
												{val?.selected_schedule_departure && (
													<p
														className={styles.arrive}
													>
														<span
															className={styles.span}
														>
															ETD: &nbsp;
														</span>
														image
														{format(
															val?.selected_schedule_departure,
															'dd/MM/yyyy',
														)}
													</p>
												)}
											</div>
											{val?.selected_schedule_arrival && (
												<p className={styles.dept}>
													<span
														className={styles.span}
													>
														ETA: &nbsp;
													</span>
													{format(
														val?.selected_schedule_arrival,
														'dd/MM/yyyy',
													)}
												</p>
											)}
											{val?.last_updated_at && (
												<p className={styles.update}>
													<span
														className={styles.span}
													>
														Updated At: &nbsp;
													</span>
													{format(
														val?.last_updated_at,
														'dd/MM/yyyy',
													)}
												</p>
											)}
										</div>
									</div>

									<div className={styles.details}>
										{renderStatus(data, val?.services)}
										<Button
											onClick={() => push(
												'/shipments/[id]',
												`/shipments/${val?.id}`,
											)}
										>
											VIEW DETAILS
										</Button>
										{val?.pending_tasks_count ? (
											<div className={styles.dot}>
												<div className={styles.dot2} />
												<p className={styles.tasks}>
													{val?.pending_tasks_count}
													<span
														className={styles.pending}
													>
														pending tasks
													</span>
												</p>
											</div>
										) : null}
									</div>
								</div>
							</div>
						);
					})}
					<div className={styles.bottom}>
						<p
							role="presentation"
							className={styles.viewall}
							onClick={() => push('/shipments', '/shipments')}
						>
							View all
						</p>
						<IcMArrowNext className={styles.arrow} />
					</div>
				</div>
			)}
		</div>
	);
}
export default Shipments;
