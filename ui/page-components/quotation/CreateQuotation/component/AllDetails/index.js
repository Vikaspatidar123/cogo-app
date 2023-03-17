import { forwardRef } from 'react';

import Details from './Details';
import styles from './styles.module.css';
import Transportation from './Transportation';

function AllDetails({ transportMode = 'OCEAN', editData = {} }, ref) {
	const { current } = ref;
	const {
		containerCount,
		containerSize,
		containerType, originId,
		destinationId,
		serviceType, packageHandling, packageType, quantity, weight, volume, originCountry, destinationCountry,

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
				{/* maps */}
			</div>
			<div className={styles.transport}>
				<Transportation
					transportMode={transportMode}
					originCountry={originCountry}
					destinationCountry={destinationCountry}
					originId={originId}
					destinationId={destinationId}
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
