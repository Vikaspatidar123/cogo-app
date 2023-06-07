import { forwardRef, useState } from 'react';

import CogoMaps from '../../common/CogoMaps';
import useOceanRoutes from '../../hooks/useOceanRoutes';

import Details from './Details';
import styles from './styles.module.css';
import Transportation from './Transportation';

const mapStyle = {
	borderTopLeftRadius  : '28px',
	borderTopRightRadius : '28px',
};

function AllDetails({ transportMode = 'OCEAN', editData = {} }, ref) {
	const [mapPoints, setMapPoints] = useState([]);

	const { getOceanRoute } = useOceanRoutes({ setMapPoints });

	const { current } = ref;
	const {
		originId: editOriginId,
		destinationId : editDestinationID,
		containerCount,
		containerSize,
		containerType,
		serviceType,
		packageHandling = null,
		packageType = null, quantity, weight, volume,
	} = editData;
	const editAir = {
		packageHandling,
		packageType,
		weight,
		volume,
		quantity,
	};
	const editOcean = {
		serviceType, containerCount, containerSize, containerType, weight, volume, quantity,
	};

	return (
		<div className={styles.container}>
			<div className={styles.map}>
				<CogoMaps
					mapPoints={mapPoints}
					mapStyle={{ ...mapStyle, height: `${transportMode === 'OCEAN' ? '260px' : '288px'}` }}
					mapInitialZoom={2.5}
					transportMode={transportMode}
				/>
			</div>
			<div className={styles.transport}>
				<Transportation
					transportMode={transportMode}
					editOriginId={editOriginId}
					editDestinationID={editDestinationID}
					setMapPoints={setMapPoints}
					getOceanRoute={getOceanRoute}
					ref={(r) => { current.transport = r; }}
				/>
			</div>
			<div className={styles.details}>
				<Details
					transportMode={transportMode}
					editAir={editAir}
					editOcean={editOcean}
					ref={(r) => { current.details = r; }}
				/>
			</div>
		</div>
	);
}

export default forwardRef(AllDetails);
