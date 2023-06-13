import dynamic from 'next/dynamic';

import styles from './styles.module.css';

const CogoMaps = dynamic(() => import('./MapComps'), { ssr: false });

function Map({
	vesselLocationLat,
	vesselLocationLang,
	type,
	height = '80vh',
	loading = false,
}) {
	return (
		<div className={styles.container}>
			<CogoMaps height="500px" />
		</div>
	);
}
export default Map;
