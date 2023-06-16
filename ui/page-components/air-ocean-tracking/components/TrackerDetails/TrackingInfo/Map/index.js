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
			<CogoMaps height={height} />
		</div>
	);
}
export default Map;
