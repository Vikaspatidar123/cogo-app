import { IcMArrowNext } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { useRouter, Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

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
				<Image
					className={styles.image}
					src={GLOBAL_CONSTANTS.image_url.road_map_image}
					alt={t('dashboard:img')}
					height={100}
					width={100}
				/>
			</div>
			<div className={styles.second}>
				<div className={styles.left}>
					<div className={styles.left_top}>
						<p className={styles.text}>{t('dashboard:trackAndTrace_airTracking')}</p>
						<IcMArrowNext
							onClick={() => push('/saas/tools/air-ocean-tracking?activeTab=air')}
							className={styles.arrow}
						/>
					</div>
					<div className={styles.left_bottom}>
						<div className={styles.inner}>
							<div className={styles.inner_left}>
								<p className={styles.Shipments}>{t('dashboard:common_trackingCard_text_1')}</p>
								<div className={styles.down}>
									<Image
										src={GLOBAL_CONSTANTS.image_url.clock_image}
										alt={t('dashboard:img')}
										height={20}
										width={20}
									/>
									<p className={styles.side}>{airTracking?.data?.all_cargo}</p>
								</div>
							</div>
							<div className={styles.inner_right}>
								<div>
									<p className={styles.new}>{t('dashboard:common_trackingCard_text_2')}</p>
									<div className={styles.down}>
										<Image
											src={GLOBAL_CONSTANTS.image_url.track_image}
											alt={t('dashboard:img')}
											height={25}
											width={25}
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
						<IcMArrowNext
							onClick={() => push('/saas/tools/air-ocean-tracking?activeTab=ocean')}
							className={styles.arrow}
						/>
					</div>
					<div className={styles.left_bottom}>
						<div className={styles.inner}>
							<div className={styles.inner_left}>
								<p className={styles.Shipments}>{t('dashboard:common_trackingCard_text_1')}</p>
								<div className={styles.down}>
									<Image
										src={GLOBAL_CONSTANTS.image_url.clock_image}
										alt={t('dashboard:img')}
										width={20}
										height={20}
									/>
									<p className={styles.side}>{oceanTracking?.data?.container_tracked}</p>
								</div>
							</div>
							<div className={styles.inner_right}>
								<div>
									<p className={styles.new}>{t('dashboard:common_trackingCard_text_2')}</p>
									<div className={styles.down}>
										<Image
											src={GLOBAL_CONSTANTS.image_url.track_image}
											alt={t('dashboard:img')}
											height={25}
											width={25}
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
