import { Toast } from '@cogoport/components';
import { useState, useEffect, useContext } from 'react';

import { ShipmentDetailContext } from '../../../../../common/Context';
import useGetAllOceanRoutes from '../hooks/useGetAllOceanRoute';

import MapAndDetails from './MapAndDetails';
import styles from './styles.module.css';
import TimelineNavigate from './TimeLineNavigate';

import { useRequest } from '@/packages/request';

function TrackerInfomation({
	currentSubscription,
	allContainers = [],
	setCurrentSubscription = () => {},
	setQuickAction = () => {},
	servicesList = [],
	loading = false,
	...rest
}) {
	const [{ shipment_data }] = useContext(ShipmentDetailContext);

	const servicesForMap = ['fcl_freight', 'air_freight'].includes(
		shipment_data?.shipment_type,
	);

	const id = currentSubscription?.id;
	const selectedContainer = 0;
	const [isShareModalOpen, setShareModal] = useState(false);
	const [selectedContainerId, setSelectedContainerId] = useState(null);
	const [trackerDetails, setTrackerDetails] = useState([]);
	const [mapPoints, setMapPoints] = useState([]);
	const [selectedMilestonesList, setSelectedMilestonesList] = useState([]);
	const [preditiveEta, setPreditiveEta] = useState({});
	const [vesselName, setVesselName] = useState('');
	const { routeLoading, getAllOceanRoutes } = useGetAllOceanRoutes({ setMapPoints });

	const isTrackerEmpty = trackerDetails?.tracking_status !== 'Found';

	const [{ loading:loading2 }, trigger2] = useRequest({
		url    : `get_saas_container_subscription?id=${id}`,
		method : 'get',
	}, { manual: true });

	const fetchTrackerDetails = async () => {
		try {
			const res = await trigger2({});
			const { hasError } = res || {};
			if (hasError) throw new Error();

			const trackerData = res.data ?? {};

			setTrackerDetails({
				...trackerData,
				data: trackerData?.data,
			});
			getAllOceanRoutes({ ocean_data: trackerData });
			setSelectedContainerId(trackerData?.container_number);
		} catch (err) {
			if (err.message !== 'canceled') {
				Toast.error("Couldn't fetch tracker's details", err);
			}
		}
	};

	useEffect(() => {
		if (id && servicesForMap) {
			fetchTrackerDetails();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return (
		<div className={styles.container}>
			<MapAndDetails
				setQuickAction={setQuickAction}
				mapLoading={loading2 || loading || routeLoading}
				isTrackerEmpty={isTrackerEmpty}
				mapPoints={mapPoints}
				trackerDetails={trackerDetails}
				selectedContainerId={selectedContainerId}
				setSelectedContainerId={setSelectedContainerId}
				handleShareModal={() => setShareModal(!isShareModalOpen)}
				selectedContainer={selectedContainer}
				setSelectedMilestonesList={setSelectedMilestonesList}
				selectedMilestonesList={selectedMilestonesList}
				setPreditiveEta={setPreditiveEta}
				setVesselName={setVesselName}
				servicesList={servicesList}
				servicesForMap={servicesForMap}
				loading={loading || loading2}
			/>

			<TimelineNavigate
				selectedMilestonesList={selectedMilestonesList}
				containerSubbscription={trigger2}
				allContainers={allContainers}
				trackerDetails={trackerDetails}
				currentSubscription={currentSubscription}
				setCurrentSubscription={setCurrentSubscription}
				preditiveEta={preditiveEta}
				vesselName={vesselName}
				servicesForMap={servicesForMap}
				rest={rest}
				loading={loading}
			/>
		</div>
	);
}

export default TrackerInfomation;
