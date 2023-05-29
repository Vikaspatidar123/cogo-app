import dynamic from 'next/dynamic';

import styles from './styles.module.css';

const CogoMaps = dynamic(() => import('./MapsComp'), { ssr: false });

function MapContainer() {
	return (
		<div className={styles.container}>
			<CogoMaps />
		</div>
	);
}
export default MapContainer;
