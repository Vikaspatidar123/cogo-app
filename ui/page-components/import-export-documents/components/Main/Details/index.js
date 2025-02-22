import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import InfoContainer from './InfoContainer';
import styles from './styles.module.css';

import MapContainer from '@/ui/commons/components/CogoMaps2';

const MAP_ZOOM = 2.7;

const style = {
	borderRadius: '18px',
};

function Details({ isUserSubscribed, isQuotaLeft }) {
	const { t } = useTranslation(['importExportDoc']);
	const [transportDetails, setTransportDetails] = useState({});

	return (
		<div className={styles.container}>
			<h3>{t('importExportDoc:details_title')}</h3>
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
					<MapContainer formInfo={transportDetails} mapZoom={MAP_ZOOM} height="400px" style={style} />
				</div>
			</div>
		</div>
	);
}

export default Details;
