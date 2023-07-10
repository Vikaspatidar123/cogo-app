import { cl } from '@cogoport/components';

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
	loading = false,
}) {
	const renderEmpty = () => {
		if (mapLoading) {
			return (
				<img
					src="https://cogoport-maps.s3.ap-south-1.amazonaws.com/world+(2).svg"
					alt=""
					width={800}
					height={300}
				/>
			);
		}

		return servicesForMap ? (
			<div style={{ height: '400px', width: '100%', alignItems: 'center' }}>
				<div style={{ textAlign: 'center', width: '100%', marginTop: '100px' }}>
					No Data Found for the Container
				</div>
			</div>
		) : null;
	};
	return (
		<div className={cl`${styles.left_panel} ${servicesForMap ? styles.show_tracking : ''}`}>
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
			<ServicDetails servicesForMap={servicesForMap} loading={loading} />

			<div className={cl`${styles.panels} ${styles.actions}`}>
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
