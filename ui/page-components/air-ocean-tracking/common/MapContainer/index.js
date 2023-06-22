import useGetMapRoute from '../../hooks/useGetMapRoute';

import styles from './styles.module.css';

import { dynamic } from '@/packages/next';

const CogoMaps = dynamic(() => import('./MapsComp'), { ssr: false });

function MapContainer({ height = '60vh', data = {}, activeTab }) {
	const { list } = data || {};
	const { loading, allRoute } = useGetMapRoute({ trackingInfo: list, type: activeTab });
	return (
		<div className={styles.container}>
			<CogoMaps height={height} allPoints={allRoute} type={activeTab} />
		</div>
	);
}
export default MapContainer;
