import { Placeholder, cl } from '@cogoport/components';
import { IcMArrowNext, IcCFlcl } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';

import ListShipments from '../../hooks/ListShipments';

import styles from './styles.module.css';

function Shipments() {
	const { loading, shipmentsData, asd } = ListShipments();
	const usable = asd?.list || [];
	console.log(usable?.selected_schedule_departure, 'new');
	// const date_dept = (format(val?.selected_schedule_departure, 'dd/MM/yyyy'));
	const date_arrive = (format(usable?.selected_schedule_arrival, 'dd/MM/yyyy'));
	const last_updated = (format(usable?.last_updated_at, 'dd/MM/yyyy'));
	// console.log(k, 'dtae');
	return (
		<div>
			{usable.length > 0 && (
				<div>
					{usable.map((val) => (
						<div className={styles.header}>
							<p className={styles.ongoing}>Your Ongoing Shipments</p>
							<div className={styles.second}>
								<div className={styles.inner}>
									<div className={styles.data}>

										<div className={styles.first_data}>
											<div className={styles.id}>
												<p className={styles.sub_id}>id:</p>
												<div className={styles.sub}>{val?.serial_id}</div>

											</div>
											<div className={styles.lcl}>
												<div className={styles.sub_lcl}>
													{/* <img
														className={styles.new_img}
														src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/blue.svg"
														alt="img"
													/> */}
													<div className={styles.new_img}>
														<IcCFlcl className={styles.new_imgs} />
													</div>
													<p className={styles.new_lcl}>LCL</p>

												</div>
											</div>

										</div>
										<div className={styles.second_data}>
											<div className={styles.origin}>
												<p className={styles.origin_sub}>{val?.origin_port?.display_name}</p>

											</div>
											<div className={styles.second_data_sub}>
												<img
													src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/newarrow.svg"
													alt="img"
												/>
											</div>
											<div className={styles.origin}>
												<p className={styles.origin_sub}>{val?.destination_port?.display_name}</p>

											</div>
										</div>
										<div className={styles.third_data}>
											{/* <img
												className={styles.img}
												src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/blue.svg"
												alt="img"
											/> */}
											<IcCFlcl className={styles.new} />
											<p className={styles.black}>{val?.commodity}</p>
											<p className={styles.pink}>
												Inco-
												{val?.inco_term}
											</p>
											<p className={styles.black}>{val?.trade_type}</p>
											<p className={styles.black}>
												Vol. -
												{val?.volume}
											</p>
											<p className={styles.black}>
												Weight. -
												{val?.weight}
											</p>
											{/* <p>{usable?.selected_schedule_arrival}</p>
							<p>{usable?.selected_schedule_departure}</p> */}
										</div>
										<div className={styles.fouth_data}>
											<div className={styles.first_row}>
												<img
													className={styles.image}

													src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/nav-ocean-shedules.svg"
													alt="img"
												/>
												<p className={styles.arrive}>
													<span className={styles.span}>
														ETD:
													</span>
													{(format(val?.selected_schedule_departure, 'dd/MM/yyyy'))}

												</p>
											</div>
											<p className={styles.dept}>
												<span className={styles.span}>
													ETA:
												</span>
												{(format(val?.selected_schedule_arrival, 'dd/MM/yyyy'))}

											</p>
											<p className={styles.update}>
												<span className={styles.span}>
													Updated At:
												</span>
												{(format(val?.last_updated_at, 'dd/MM/yyyy'))}

											</p>
										</div>
									</div>

									<div className={styles.details}>
										<p className={styles.cart}>Added to cart</p>
										<button className={styles.view}>VIEW DETAILS</button>
										<div className={styles.dot}>
											<div className={styles.dot2} />
											<p className={styles.tasks}>
												{val?.pending_tasks_count}
												<span className={styles.pending}>pending tasks</span>
											</p>
										</div>

									</div>

								</div>
							</div>
							<div className={styles.bottom}>
								{/* <button className={styles.viewall} /> */}
								<p className={cl`${styles.viewalls} ${styles.viewall}`}>View all</p>
								<IcMArrowNext className={styles.arrow} />
							</div>
						</div>
					))}
				</div>

			)}
		</div>
	);
}
export default Shipments;
