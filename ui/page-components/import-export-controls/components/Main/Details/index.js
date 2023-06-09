import { useState } from 'react';

import MapContainer from '../../../common/MapContainer';

import InfoContainer from './InfoContainer';
import styles from './styles.module.css';

function Details() {
	const [formInfo, setFormInfo] = useState({});
	return (
		<div className={styles.container}>
			<h3>Control details</h3>
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
