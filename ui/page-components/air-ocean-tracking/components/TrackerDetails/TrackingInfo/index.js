import useGetCurrentInfo from '../../../hooks/useGetCurrentInfo';
import useGetShipmentInfo from '../../../hooks/useGetTrackingInfo';

import InfoContainer from './InfoContainer';
import Maps from './Map';
import MilestoneStepper from './MilestoneStepper';
import styles from './styles.module.css';

function TrackingInfo() {
	const { loading, data, trackingType } = useGetShipmentInfo();
	const { container_details = [], shipment_info = {}, poc_details = [] } = data || {};
	const {
		currTrackingData,
		vessel_eta_details,
		combineMileStoneList,
		currContainerDetails,
		setCurrContainerDetails,
	} = useGetCurrentInfo({ data });

	return (
		<div className={styles.container}>
			<div className={styles.milestone_container}>
				<MilestoneStepper combineMileStoneList={combineMileStoneList} />
			</div>
			<div className={styles.section}>
				<div>
					<InfoContainer
						containerDetails={container_details}
						currContainerDetails={currContainerDetails}
						shipmentInfo={shipment_info}
						setCurrContainerDetails={setCurrContainerDetails}
						trackingType={trackingType}
						poc_details={poc_details}
					/>
				</div>
				<div className={styles.map_container}>
					<Maps currTrackingData={currTrackingData} />
				</div>
			</div>
		</div>
	);
}

export default TrackingInfo;
