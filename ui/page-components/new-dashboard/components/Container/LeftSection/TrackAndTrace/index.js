import { IcAAirTracking, IcAOceanTracking } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import Card from './Card';
import styles from './styles.module.css';

import { useRouter, Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import useGetTracking from '@/ui/page-components/new-dashboard/hooks/useGetTracking';

function TrackAndTrace() {
	const { push } = useRouter();

	const { t } = useTranslation(['dashboard']);

	const { airTracking, oceanTracking, loading } = useGetTracking();

	const { data } = airTracking || {};
	const { data: oceanTrackingData } = oceanTracking || {};

	const { all_cargo = 0, on_track_air_cargos = 0 } = data || {};
	const { container_tracked = 0, on_track_shipments = 0 } = oceanTrackingData || {};

	return (
		<div className={styles.container}>
			<div className={styles.heading}>{t('dashboard:common_trackTraceHeader_text_1')}</div>

			<div className={styles.section}>
				<div
					role="presentation"
					className={styles.box}
					onClick={() => push('/saas/tools/air-ocean-tracking?activeTab=air')}
				>
					<div className={styles.head}>
						<IcAAirTracking width={30} height={30} />
						{t('dashboard:trackAndTrace_airTracking')}
					</div>

					<div className={styles.card}>
						<Card loading={loading} count={all_cargo} />
						<Card loading={loading} count={on_track_air_cargos} />
					</div>
					<div className={styles.img_container}>
						<Image
							width={200}
							height={200}
							src={GLOBAL_CONSTANTS.image_url.air_tracking}
							alt={t('dashboard:cogo_logo')}
						/>
					</div>
				</div>

				<div
					role="presentation"
					className={styles.box}
					onClick={() => push('/saas/tools/air-ocean-tracking?activeTab=ocean')}
					style={{ backgroundImage: `url("${GLOBAL_CONSTANTS.image_url.ocean_tracking}")` }}
				>
					<div className={styles.head}>
						<IcAOceanTracking width={30} height={30} />
						{t('dashboard:trackAndTrace_oceanTracking')}
					</div>

					<div className={styles.card}>
						<Card loading={loading} count={container_tracked} />
						<Card loading={loading} count={on_track_shipments} />
					</div>
				</div>
			</div>
		</div>
	);
}
export default TrackAndTrace;
