import { isEmpty } from '@cogoport/utils';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import useGetMapRoute from '@/ui/commons/hooks/useGetMapRoute';

const CogoMaps = dynamic(() => import('./MapComp'), { ssr: false });

const style = {
	borderRadius: '18px',
};

function MapContainer({ formInfo = {}, mapZoom = 2.7, height = '480px' }) {
	const [curvePoints, setCurvePoints] = useState([]);
	const { transportMode, exportCountry = {}, importCountry = {} } = formInfo || {};

	const { getAirOceanRoute, loading } = useGetMapRoute();

	const getRoute = async () => {
		const resp = await getAirOceanRoute({ originInfo: exportCountry, destinationInfo: importCountry });

		const allRoute = resp?.all_routes || [];

		const routeInfo = allRoute.find((info) => info?.main_service === transportMode);
		setCurvePoints({ origin: resp?.origin, destination: resp?.destination, routes: routeInfo?.routes || [] });
	};

	useEffect(() => {
		if (!isEmpty(exportCountry) && !isEmpty(importCountry) && transportMode) {
			getRoute();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [exportCountry, importCountry, transportMode]);

	return (
		<div className={styles.container}>
			<CogoMaps
				zoom={mapZoom}
				height={height}
				style={style}
				curvePoints={curvePoints}
				transportMode={transportMode}
			/>
			{loading ? (
				<div className={styles.loader_container}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.loading}
						className={styles.loader}
						width={100}
						height={100}
						alt="loading"
					/>
					<div className={styles.blur_screen} />
				</div>
			) : null}
		</div>
	);
}

export default MapContainer;
