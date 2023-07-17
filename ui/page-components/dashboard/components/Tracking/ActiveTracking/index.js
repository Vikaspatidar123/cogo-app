import { IcMArrowNext } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

const trackUrl = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/delayClock.svg';
function ActiveTracking({ airTracking, oceanTracking }) {
	const { push } = useRouter();
	const { t } = useTranslation(['dashboard']);

	return (
		<div className={styles.header}>
			<div className={styles.first}>
				<div>
					<p className={styles.trace}>{t('dashboard:common_trackTraceHeader_text_1')}</p>
					<p className={styles.track}>{t('dashboard:common_trackTraceHeader_text_2')}</p>
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
						<p className={styles.text}>{t('dashboard:trackAndTrace_airTracking')}</p>
						<IcMArrowNext onClick={() => push('/saas/air-tracking')} className={styles.arrow} />
					</div>
					<div className={styles.left_bottom}>
						<div className={styles.inner}>
							<div className={styles.inner_left}>
								<p className={styles.Shipments}>{t('dashboard:common_trackingCard_text_1')}</p>
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
									<p className={styles.new}>{t('dashboard:common_trackingCard_text_2')}</p>
									<div className={styles.down}>
										<img
											src={trackUrl}
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
						<p className={styles.text}>{t('dashboard:trackAndTrace_oceanTracking')}</p>
						<IcMArrowNext onClick={() => push('/saas/ocean-tracking')} className={styles.arrow} />
					</div>
					<div className={styles.left_bottom}>
						<div className={styles.inner}>
							<div className={styles.inner_left}>
								<p className={styles.Shipments}>{t('dashboard:common_trackingCard_text_1')}</p>
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
									<p className={styles.new}>{t('dashboard:common_trackingCard_text_2')}</p>
									<div className={styles.down}>
										<img
											src={trackUrl}
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
