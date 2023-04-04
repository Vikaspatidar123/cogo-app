import { useState } from 'react';

import MapContainer from '../../../common/MapContainer';

import InfoContainer from './InfoContainer';
import styles from './styles.module.css';

function Details({ isUserSubscribed, isQuotaLeft }) {
	const [transportDetails, setTransportDetails] = useState({});
	const {
		transportMode = '',
		exportCountry = {},
		importCountry = {},
	} = transportDetails || {};

	return (
		<div className={styles.container}>
			<h3>Documents Details</h3>
			<div className={styles.flex_box}>
				<div className={styles.info}>
					<InfoContainer
						transportDetails={transportDetails}
						setTransportDetails={setTransportDetails}
						isUserSubscribed={isUserSubscribed}
						isQuotaLeft={isQuotaLeft}
					/>
				</div>
				<div className={styles.map}>
					<MapContainer
						transportMode={transportMode}
						exportCountry={exportCountry}
						importCountry={importCountry}
					/>
				</div>
			</div>
		</div>
	);
}

export default Details;
