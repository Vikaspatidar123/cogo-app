import { IcMArrowNext } from '@cogoport/icons-react';

import GetSchedules from '../../hooks/GetSchedules';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Schedule() {
	const { loading, schedules, air_data } = GetSchedules();
	const k = air_data;
	console.log(k, 'k');
	const { push } = useRouter();
	return (
		<div className={styles.header}>
			<p className={styles.Schedules}>Schedules</p>
			<div className={styles.total}>
				<div className={styles.left}>
					<div className={styles.ocean}>
						<div className={styles.ocean_img}>
							<img
								className={styles.img}
								src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/nav-ocean-shedules.svg"
								alt="img"
							/>
						</div>
						<div>
							<p className={styles.new_img}>
								Ocean Schedule
								{/* <img
									className={styles.arrow}
									src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/another.svg"
									alt="img"
								/> */}
								<IcMArrowNext onClick={() => push('/saas/ocean-schedules')} className={styles.arrow} />
							</p>
							<p
								className={styles.plan}
							>
								Plan an Upcoming shipment using comprehensive shipping schedules

							</p>

						</div>
					</div>
					<div className={styles.air}>
						<div className={styles.air2}>
							<img
								className={styles.air_img}
								src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/nav-air-schedules.svg"
								alt="img"
							/>
						</div>
						<div>
							<p className={styles.new_img}>
								Air Schedule
								{/* <img
									className={styles.arrow}
									src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/another.svg"
									alt="img"
								/> */}
								<IcMArrowNext className={styles.arrow} onClick={() => push('/saas/air-schedules')} />
							</p>
							<p
								className={styles.plan}
							>
								Plan an Upcoming shipment using comprehensive airschedules

							</p>
						</div>
					</div>
				</div>
				<div className={styles.right}>
					<img
						className={styles.circle}
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/two-clock_new.svg"
						alt="img"
					/>
				</div>
			</div>
		</div>
	);
}
export default Schedule;
