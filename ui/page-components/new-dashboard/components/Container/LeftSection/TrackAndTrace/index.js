import { IcAAirTracking, IcAOceanTracking } from '@cogoport/icons-react';

import styles from './styles.module.css';

import useGetTracking from '@/ui/page-components/new-dashboard/hooks/useGetTracking';

function TrackAndTrace() {
    const { airTracking, oceanTracking, kyc_status } = useGetTracking();
    console.log(airTracking, 'airTracking', oceanTracking);
    return (
        <div className={styles.container}>
            <div className={styles.heading}>Track & Trace</div>
            <div className={styles.section}>
                <div className={styles.box}>
                    <div className={styles.head}>
                        <IcAAirTracking width={30} height={30} />
                        Air Tracking
                    </div>
                    <div>
                        <div>All Shipments</div>
                        <div>On Track Shipments</div>
                    </div>
                </div>
                <div className={styles.box}>
                    <div className={styles.head}>
                        <IcAOceanTracking width={30} height={30} />
                        Ocean Tracking

                    </div>
                </div>
            </div>
        </div>
    );
}
export default TrackAndTrace;
