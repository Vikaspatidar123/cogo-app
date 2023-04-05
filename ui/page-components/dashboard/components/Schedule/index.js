import { IcMArrowNext } from '@cogoport/icons-react';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Schedule() {
	const { push } = useRouter();

	return (
		<div className={styles.header}>
			<p>Schedules</p>
			<div className={styles.total}>
				<div>
					<div className={styles.container}>
						<div className={styles.icon_img}>
							<img
								className={styles.img}
								src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/nav-ocean-shedules.svg"
								alt="img"
							/>
						</div>
						<div>
							<p className={styles.new_img}>
								Ocean Schedule
								<IcMArrowNext
									role="presentation"
									onClick={() => push('/saas/ocean-schedules')}
									className={styles.arrow}
								/>
							</p>
							<p
								className={styles.plan}
							>
								Plan an Upcoming shipment using comprehensive shipping schedules
							</p>

						</div>
					</div>
					<div className={styles.container}>
						<div className={styles.icon_img} style={{ background: 'rgb(251 230 230)' }}>
							<img
								className={styles.img}
								src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/nav-air-schedules.svg"
								alt="img"
							/>
						</div>
						<div>
							<p className={styles.new_img}>
								Air Schedule
								<IcMArrowNext
									role="presentation"
									onClick={() => push('/saas/air-schedules')}
									className={styles.arrow}
								/>
							</p>
							<p
								className={styles.plan}
							>
								Plan an Upcoming shipment using comprehensive airschedules
							</p>
						</div>
					</div>
				</div>

				<img
					className={styles.circle}
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/two-clock_new.svg"
					alt="img"
				/>

			</div>
		</div>
	);
}
export default Schedule;
