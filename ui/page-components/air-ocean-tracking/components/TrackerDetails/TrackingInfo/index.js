import useGetCurrentInfo from '../../../hooks/useGetCurrentInfo';
import useGetShipmentInfo from '../../../hooks/useGetTrackingInfo';

import InfoContainer from './InfoContainer';
import Maps from './Map';
import MilestoneStepper from './MilestoneStepper';
import styles from './styles.module.css';

function TrackingInfo() {
	const { loading, data, trackingType } = useGetShipmentInfo();
	const {
		container_details = [], shipment_info, poc_details = [], data: trackingInfo = [], airway_bill_no = '',
		commodity_details,
	} = data || {};

	const {
		currTrackingData,
		vessel_eta_details,
		combineMileStoneList,
		currContainerDetails,
		setCurrContainerDetails,
	} = useGetCurrentInfo({ data, trackingType });

	return (
		<div className={styles.container}>
			<div className={styles.info_container}>
				<InfoContainer
					airwayBillNo={airway_bill_no}
					containerDetails={container_details}
					currContainerDetails={currContainerDetails}
					shipmentInfo={shipment_info || commodity_details}
					setCurrContainerDetails={setCurrContainerDetails}
					trackingType={trackingType}
					poc_details={poc_details}
				/>
				<div className={styles.milestone_container}>
					<MilestoneStepper combineMileStoneList={combineMileStoneList} trackingType={trackingType} />
				</div>

			</div>
			<div className={styles.section}>
				<Maps
					trackingInfo={trackingInfo}
					trackingType={trackingType}
					currContainerDetails={currContainerDetails}
					height="83vh"
				/>

			</div>
		</div>
	);
}

export default TrackingInfo;
