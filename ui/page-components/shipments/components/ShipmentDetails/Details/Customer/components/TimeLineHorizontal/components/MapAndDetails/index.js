import { Placeholder } from '@cogoport/components';

import PendingTasks from '../../../PendingTasks';
import QuickActions from '../../../QuickActions';
import ServicDetails from '../../../ServiceDetails';
import BreadCrumbs from '../Breadcrumbs';
import TrackMapNavigate from '../TrackMapNavigate';

import styles from './styles.module.css';

function MapAndDetails({
	mapLoading = false,
	mapPoints = [],
	trackerDetails = [],
	selectedContainer = '',
	isTrackEmpty = false,
	setQuickAction,
	selectedMilestonesList = '',
	setSelectedMilestonesList,
	setPreditiveEta,
	setVesselName,
	servicesForMap = false,
}) {
	const renderEmpty = () => {
		if (mapLoading) return <Placeholder />;

		return servicesForMap ? (
			<div style={{ height: '400px', width: '100%', alignItems: 'center' }}>
				<div style={{ textAlign: 'center', width: '100%', marginTop: '100px' }}>
					No Data Found for the Container
				</div>
			</div>
		) : null;
	};
	return (
		<div className={`${styles.left_panel} ${servicesForMap ? styles.show_tracking : ''}`}>
			<BreadCrumbs servicesForMap={servicesForMap} />

			{!isTrackEmpty && !mapLoading && servicesForMap ? (
				<TrackMapNavigate
					mapPoints={mapPoints}
					trackerDetails={trackerDetails}
					selectedContainer={selectedContainer}
					setSelectedMilestonesList={setSelectedMilestonesList}
					selectedMilestonesList={selectedMilestonesList}
					setPreditiveEta={setPreditiveEta}
					setVesselName={setVesselName}
				/>
			) : (
				renderEmpty()
			)}
			<ServicDetails servicesForMap={servicesForMap} />

			<div className={`${styles.panels} ${styles.actions}`}>
				<PendingTasks />

				<QuickActions
					setQuickAction={setQuickAction}
					servicesForMap={servicesForMap}
				/>
			</div>
		</div>
	);
}

export default MapAndDetails;
