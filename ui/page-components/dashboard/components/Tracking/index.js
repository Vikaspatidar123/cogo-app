import { IcMArrowNext } from '@cogoport/icons-react';

import GetTracking from '../../hooks/GetTracking';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Tracking() {
	// const { loading, schedulesData, air_track } = GetTracking();
	// console.log(air_track, 'air_track');
	const { push } = useRouter();
	return (
		<div className={styles.header}>
			<div className={styles.track}>
				<div>
					<p className={styles.trace}>Track & Trace</p>
				</div>

			</div>
			<div className={styles.cargo} role="presentation" onClick={() => push('/saas/air-tracking')}>
				<div className={styles.symbol}>
					<img src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/air.svg" alt="img" />

				</div>
				<div>
					<p className={styles.symbols}>
						Air Cargo
						{/* <img
							className={styles.arrow}
							src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/another.svg"
							alt="img"
						/> */}
						<IcMArrowNext className={styles.arrow} />

					</p>
					<p className={styles.bill}>Track and Trace Your Air Shipments by Airway Bill Number.</p>
				</div>

			</div>
			<div className={styles.container} role="presentation" onClick={() => push('/saas/ocean-tracking')}>
				<div className={styles.container_img}>
					<img
						src="	https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/containerIcon_new.svg"
						alt="img"
					/>
				</div>
				<div>
					<p className={styles.containerTracking}>
						Container Tracking
						{/* <img
							className={styles.arrow}
							src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/another.svg"
							alt="img"
						/> */}
						<IcMArrowNext className={styles.arrow} />
					</p>
					<p
						className={styles.Trace}
					>
						Track and Trace your Ocean shipments by Bill of Loading,Booking,or Container Number

					</p>
				</div>
			</div>
		</div>
	);
}
export default Tracking;
