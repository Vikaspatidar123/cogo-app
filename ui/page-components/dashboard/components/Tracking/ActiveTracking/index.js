import { IcMArrowNext } from '@cogoport/icons-react';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function ActiveTracking({ airTracking, oceanTracking }) {
	const { push } = useRouter();
	return (
		<div className={styles.header}>
			<div className={styles.first}>
				<div>
					<p className={styles.trace}>Track & Trace</p>
					<p className={styles.track}>Easily track containers across all major shipping lines</p>
				</div>
				<img
					className={styles.image}
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/road-map.svg"
					alt="img"
				/>
			</div>
			<div className={styles.second}>
				<div className={styles.left}>
					<div className={styles.left_top}>
						<p className={styles.text}>Air Tracking</p>
						<IcMArrowNext onClick={() => push('/saas/air-tracking')} className={styles.arrow} />
					</div>
					<div className={styles.left_bottom}>
						<div className={styles.inner}>
							<div className={styles.inner_left}>
								<p className={styles.Shipments}>All Shipments</p>
								<div className={styles.down}>
									<img
										src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/green_clock.svg"
										alt="img"
									/>
									<p className={styles.side}>{airTracking?.data?.all_cargo}</p>
								</div>
							</div>
							<div className={styles.inner_right}>
								<div>
									<p className={styles.new}>On Track Shipments</p>
									<div className={styles.down}>
										<img
											src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/delayClock.svg"
											alt="img"
										/>
										<p className={styles.side}>{airTracking?.data?.on_track_air_cargos}</p>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
				<div className={styles.left}>
					<div className={styles.left_top}>
						<p className={styles.text}>Ocean Tracking</p>
						<IcMArrowNext onClick={() => push('/saas/ocean-tracking')} className={styles.arrow} />
					</div>
					<div className={styles.left_bottom}>
						<div className={styles.inner}>
							<div className={styles.inner_left}>
								<p className={styles.Shipments}>All Shipments</p>
								<div className={styles.down}>
									<img
										src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/green_clock.svg"
										alt="img"
									/>
									<p className={styles.side}>{oceanTracking?.data?.container_tracked}</p>
								</div>
							</div>
							<div className={styles.inner_right}>
								<div>
									<p className={styles.new}>On Track Shipments</p>
									<div className={styles.down}>
										<img
											src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/delayClock.svg"
											alt="img"
										/>
										<p className={styles.side}>{oceanTracking?.data?.on_track_shipments}</p>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	);
}
export default ActiveTracking;
