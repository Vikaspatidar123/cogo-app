import StatsContainer from './StatsContainer';
import styles from './styles.module.css';

import MapContainer from '@/ui/page-components/air-ocean-tracking/common/MapContainer';

function TrackingInfo({ stats = {}, view, activeTab }) {
	return (
		<div className={styles.container}>
			<StatsContainer stats={stats} activeTab={activeTab} />
			<MapContainer height="55vh" />
		</div>
	);
}
export default TrackingInfo;
