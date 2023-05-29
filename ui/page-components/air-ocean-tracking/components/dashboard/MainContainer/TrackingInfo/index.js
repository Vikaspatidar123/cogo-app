import StatsContainer from './StatsContainer';
import styles from './styles.module.css';

import MapContainer from '@/ui/page-components/air-ocean-tracking/common/MapContainer';

function TrackingInfo() {
	return (
		<div className={styles.container}>
			<StatsContainer />
			<MapContainer />
		</div>
	);
}
export default TrackingInfo;
