import { IcAAirTracking, IcAOceanTracking } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { useRouter, Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import useGetTracking from '@/ui/page-components/new-dashboard/hooks/useGetTracking';

function TrackAndTrace() {
    const { push } = useRouter();
    const { t } = useTranslation(['dashboard']);
    const { airTracking, oceanTracking } = useGetTracking();
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
                        <div className={styles.count_card}>
                            <div className={styles.text}>
                                {t('dashboard:common_trackingCard_text_1')}
                            </div>
                            <div className={styles.down}>
                                <Image
                                    src={GLOBAL_CONSTANTS.image_url.clock_image}
                                    alt={t('dashboard:cogo_logo')}
                                    height={20}
                                    width={20}
                                />
                                <p className={styles.count}>{all_cargo}</p>
                            </div>
                        </div>
                        <div className={styles.count_card}>
                            <div className={styles.text}>
                                {t('dashboard:common_trackingCard_text_2')}
                            </div>
                            <div className={styles.down}>
                                <Image
                                    src={GLOBAL_CONSTANTS.image_url.track_image}
                                    alt={t('dashboard:cogo_logo')}
                                    height={20}
                                    width={25}
                                />
                                <p className={styles.count}>{on_track_air_cargos}</p>
                            </div>

                        </div>
                    </div>
                    <div className={styles.img_container}>
                        <Image
                            width={200}
                            height={200}
                            src={GLOBAL_CONSTANTS.image_url.air_tracking}
                            alt="log"
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
                        <div className={styles.count_card}>
                            <div className={styles.text}>
                                {t('dashboard:common_trackingCard_text_1')}
                            </div>
                            <div className={styles.down}>
                                <Image
                                    src={GLOBAL_CONSTANTS.image_url.clock_image}
                                    alt={t('dashboard:cogo_logo')}
                                    height={20}
                                    width={20}
                                />
                                <p className={styles.count}>{container_tracked}</p>
                            </div>
                        </div>
                        <div className={styles.count_card}>
                            <div className={styles.text}>{t('dashboard:common_trackingCard_text_2')}</div>
                            <div className={styles.down}>
                                <Image
                                    src={GLOBAL_CONSTANTS.image_url.track_image}
                                    alt={t('dashboard:cogo_logo')}
                                    height={20}
                                    width={25}
                                />
                                <p className={styles.count}>{on_track_shipments}</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TrackAndTrace;
