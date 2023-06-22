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
	const { getRoute, routeLoading } = useGetAllOceanRoutes({});

	const [{ loading:apiloading }, trigger1] = useRequest({
		url        : 'get_container_sea_route',
		method     : 'post',
		autoCancel : false,
	}, { manual: true });

	const isTrackerEmpty = trackerDetails?.tracking_status !== 'Found';
	const getAllOceanRoutes = async (ocean_data) => {
		try {
			const container_no = ocean_data.container_details
				.map((c) => c.container_no)
				.flat();
			const request_data = {
				saas_container_subscriptions: [
					{
						saas_container_subscription_id : ocean_data.id,
						type                           : ocean_data.type,
						container_no,
					},
				],
			};
			const res = await trigger1({ data: request_data });
			const { hasError } = res || [];
			if (hasError) throw new Error();
			else if (res.data?.length) {
				container_no.map(async (c) => {
					const container = res.data.filter((r) => r.container_no === c);
					if (container.length > 0) {
						const pre_points = container.map((a) => a.data).flat();
						const coordinates = {
							originLatLng      : pre_points?.[0],
							destinationLatLng : pre_points?.[pre_points.length - 1],
						};
						const routeArr = await getRoute({ coordinates });
						setMapPoints((prevPoints) => [
							...prevPoints,
							{
								container_no : c,
								route        : routeArr || pre_points,
							},
						]);
					}
					return true;
				});
			}
			return res.data;
		} catch (err) {
			return [];
		}
	};
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
			getAllOceanRoutes(trackerData);
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
				mapLoading={loading2 || loading || apiloading || routeLoading}
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
