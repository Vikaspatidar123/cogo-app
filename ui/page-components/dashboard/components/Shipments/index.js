import { Button } from '@cogoport/components';
import { IcMArrowNext, IcCFlcl, IcMFship } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';

import ListShipments from '../../hooks/ListShipments';

import styles from './styles.module.css';

function Shipments() {
	const { data } = ListShipments();
	const usable = data?.list || [];

	return (
		<div>
			{usable.length > 0 && (
				<div className={styles.header}>
					<div>Your Ongoing Shipments</div>
					{usable.map((val) => (
						<div className={styles.second}>
							<div className={styles.inner}>
								<div className={styles.data}>
									<div className={styles.first_data}>
										<div className={styles.id}>
											<p className={styles.sub_id}>id:</p>
											<div className={styles.sub}>{val?.serial_id}</div>
										</div>
										<div className={styles.sub_lcl}>
											<div className={styles.new_img}>
												<IcCFlcl className={styles.new_imgs} />
											</div>
											<p className={styles.new_lcl}>LCL</p>
										</div>
									</div>

									<div className={styles.second_data}>
										<div className={styles.origin}>
											<p className={styles.origin_sub}>{val?.origin_port?.display_name}</p>

										</div>
										<div>
											<IcMArrowNext />
										</div>
										<div className={styles.origin}>
											<p className={styles.origin_sub}>
												{val?.destination_port?.display_name}
											</p>
										</div>
									</div>
									<div className={styles.third_data}>
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
									</div>
									<div className={styles.fouth_data}>
										<div className={styles.first_row}>
											<IcMFship className={styles.image} />
											<p className={styles.arrive}>
												<span className={styles.span}>
													ETD: &nbsp;
												</span>
												image
												{(format(val?.selected_schedule_departure, 'dd/MM/yyyy'))}

											</p>
										</div>
										<p className={styles.dept}>
											<span className={styles.span}>
												ETA: &nbsp;
											</span>
											{(format(val?.selected_schedule_arrival, 'dd/MM/yyyy'))}

										</p>
										<p className={styles.update}>
											<span className={styles.span}>
												Updated At: &nbsp;
											</span>
											{(format(val?.last_updated_at, 'dd/MM/yyyy'))}

										</p>
									</div>
								</div>

								<div className={styles.details}>
									<p className={styles.cart}>Added to cart</p>
									<Button>VIEW DETAILS</Button>
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
					))}
					<div className={styles.bottom}>
						<p className={styles.viewall}>View all</p>
						<IcMArrowNext className={styles.arrow} />
					</div>
				</div>

			)}
		</div>
	);
}
export default Shipments;
