import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import InfoContainer from './InfoContainer';
import styles from './styles.module.css';

import MapContainer from '@/ui/commons/components/CogoMaps2';

function Details() {
	const { t } = useTranslation(['importExportControls']);
	const [formInfo, setFormInfo] = useState({});
	return (
		<div className={styles.container}>
			<h3>{t('importExportControls:details_title')}</h3>
			<div className={styles.flex_box}>
				<div className={styles.info}>
					<InfoContainer formInfo={formInfo} setFormInfo={setFormInfo} />
				</div>
				<div className={styles.map}>
					<MapContainer formInfo={formInfo} />
				</div>
			</div>
		</div>
	);
}

export default Details;
