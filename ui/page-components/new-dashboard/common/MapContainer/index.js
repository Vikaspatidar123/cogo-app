import { useEffect, useState } from 'react';

import { LOADING_TEXT, LOADING_TEXT_COUNT } from '../../constant';
import useGetMapRoute from '../../hooks/useGetMapRoute';

import styles from './styles.module.css';

import { Image, dynamic } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const SET_TIME = 6500;
const DEFAULT_COUNT = 0;
const CogoMaps = dynamic(() => import('./MapsComp'), { ssr: false });

function MapContainer({ height = '60vh', data = {}, activeTab }) {
	const [count, setCount] = useState(DEFAULT_COUNT);

	const { list } = data || {};
	const { loading, allRoute } = useGetMapRoute({ trackingInfo: list, type: activeTab });

	useEffect(() => {
		if (loading && count >= DEFAULT_COUNT) {
			const timeout = setTimeout(() => {
				setCount((prev) => {
					if (prev === LOADING_TEXT_COUNT) return DEFAULT_COUNT;
					return prev + 1;
				});
			}, SET_TIME);

			return () => {
				clearTimeout(timeout);
			};
		}
		return () => { };
	}, [count, loading]);

	return (
		<div className={styles.container}>
			<CogoMaps height={height} allPoints={allRoute} type={activeTab} />
			{loading && (
				<div className={styles.loader_container}>
					<div className={styles.loading_content}>
						<Image src={GLOBAL_CONSTANTS.image_url.tracking_loader} width={200} height={40} alt="loading" />
						<p>{LOADING_TEXT[count]}</p>
					</div>
					<div className={styles.modal} />
				</div>
			)}
		</div>
	);
}
export default MapContainer;
