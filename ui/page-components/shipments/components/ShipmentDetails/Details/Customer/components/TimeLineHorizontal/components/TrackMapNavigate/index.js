import { startCase } from '@cogoport/utils';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

import { processList } from '../../utils/constants';

import { useSelector } from '@/packages/store';

const TrackerMap = dynamic(() => import('../MapTracking'), { ssr: false });

function TrackMapNavigate({
	trackerDetails,
	mapPoints,
	selectedContainer,
	selectedMilestonesList,
	setSelectedMilestonesList,
	setPreditiveEta,
	setVesselName,
}) {
	const [vesselLocationLat, setVesselLocationLat] = useState();
	const [vesselLocationLang, setVesselLocationLang] = useState();
	const [oceanPoints, setOceanPoints] = useState([]);

	const containersMilestonesList = trackerDetails?.data || [];

	const {
		general: { isMobile = false },
	} = useSelector((state) => state);

	useEffect(() => {
		const processedMilestonesList = processList(
			containersMilestonesList?.[selectedContainer]?.tracking_data || [],
		);
		setSelectedMilestonesList(processedMilestonesList);
	}, [selectedContainer]);

	useEffect(() => {
		if (mapPoints?.length) {
			setOceanPoints(
				mapPoints.find(
					(x) => x.container_no
						=== containersMilestonesList?.[selectedContainer]?.container_no,
				)?.route,
			);
		}
	}, [selectedContainer, mapPoints]);

	useEffect(() => {
		if (containersMilestonesList?.[selectedContainer] !== undefined) {
			if (
				containersMilestonesList?.[selectedContainer]?.vessel_eta_details
					?.vessel_name !== undefined
			) {
				setVesselName(
					containersMilestonesList?.[selectedContainer]?.vessel_eta_details
						?.vessel_name,
				);
			}

			if (
				containersMilestonesList?.[selectedContainer]?.vessel_eta_details
					?.vessel_eta_details !== undefined
				&& containersMilestonesList?.[selectedContainer]?.vessel_eta_details
					?.vessel_eta_details !== null
			) {
				if (
					containersMilestonesList?.[selectedContainer]?.vessel_eta_details
						?.vessel_eta_details?.current_location !== undefined
				) {
					setVesselLocationLat(
						containersMilestonesList?.[selectedContainer]?.vessel_eta_details
							?.vessel_eta_details?.current_location.Lat,
					);
					setVesselLocationLang(
						containersMilestonesList?.[selectedContainer]?.vessel_eta_details
							?.vessel_eta_details?.current_location.Lang,
					);
				}

				if (
					containersMilestonesList?.[selectedContainer]?.vessel_eta_details
						?.vessel_eta_details?.shipment?.preditive_eta !== undefined
				) {
					setPreditiveEta(
						containersMilestonesList?.[selectedContainer]?.vessel_eta_details
							?.vessel_eta_details?.shipment?.preditive_eta,
					);
				}
			}
		}
	}, [selectedContainer, selectedMilestonesList]);

	return (
		<TrackerMap
			points={oceanPoints}
			vesselLocationLat={vesselLocationLat}
			vesselLocationLang={vesselLocationLang}
			type="container"
			width={isMobile ? '100%' : '50%'}
			height="65vh"
			route={{
				origin_port:
					trackerDetails?.iternary && trackerDetails?.type === 'CONTAINER_NO'
						? trackerDetails?.iternary[0]?.origin
						: null,
				destination_port:
					trackerDetails?.iternary && trackerDetails?.type === 'CONTAINER_NO'
						? trackerDetails?.iternary[0]?.destination
						: null,
				tracking_no    : trackerDetails?.input,
				tracking_label : startCase(trackerDetails?.type),
			}}
		/>
	);
}

export default TrackMapNavigate;
