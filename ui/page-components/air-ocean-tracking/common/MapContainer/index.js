import dynamic from 'next/dynamic';

import styles from './styles.module.css';

const CogoMaps = dynamic(() => import('./MapsComp'), { ssr: false });

function MapContainer({ height = '60vh' }) {
	return (
		<div className={styles.container}>
			<CogoMaps height={height} />
		</div>
	);
}
export default MapContainer;
