import styles from './styles.module.css';

import { dynamic } from '@/packages/next';

const CogoMaps = dynamic(() => import('./MapsComp'), { ssr: false });

function MapContainer({ height = '60vh' }) {
	return (
		<div className={styles.container}>
			<CogoMaps height={height} />
		</div>
	);
}
export default MapContainer;
