import {
	FeatureGroup, L, LayerGroup, Polyline,
} from '@cogoport/maps';
import { isEmpty } from '@cogoport/utils';
import { useRouter } from 'next/router';
import React, {
	useEffect, useRef, useState,
} from 'react';

import AnimatedRoute from '../AnimatedRoute';

import {
	alternatePathOptions,
	servicePathOptions,
} from '@/ui/commons/configurations/color-options';
import Point from '@/ui/page-components/map-components/Point';

function Routes({
	map,
	routes,
	setBounds,
	isMoving,
}) {
	const [bbox, setBbox] = useState(null);
	const routeRef = useRef(null);

	const router = useRouter();
	const { id:  activeTab } = router.query;

	const newTab = activeTab === 'sea' ? 'ocean' : activeTab;
	const actualRoute = (activeTab === 'all')
		? routes : routes?.filter(({ main_service }) => main_service === newTab);

	useEffect(() => {
		if (map && bbox) {
			const bounding_box = routeRef?.current ? routeRef.current.getBounds() : bbox;

			if (!isEmpty(bounding_box) && bounding_box instanceof L.LatLngBounds) {
				map?.flyToBounds(bounding_box, { maxZoom: 7 });
			}
			if (routeRef?.current) routeRef.current?.bringToFront();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [map, JSON.stringify(bbox), activeTab, JSON.stringify(actualRoute)]);

	const serviceRoutes = actualRoute?.map(({ routes: temp }) => temp).flat();

	return (

		<LayerGroup
			eventHandlers={{ layeradd: (e) => setBounds(e.target.getBounds()) }}
		>
			{
				serviceRoutes.map((route, idx) => {
					const { lineString = [] } = route || {};
					const routeWaypoints = lineString.map((leg) => (leg?.waypoints || [])
						.map((pt) => ({
							...pt,
							display_name: (pt?.display_name),
						})));

					const positions = [lineString.map(({ path }) => path)];

					return (
						<FeatureGroup
							key={route?.id}
							ref={routeRef}
							eventHandlers={{
								add: (e) => (!idx ? setBbox(e.target.getBounds())
									: setBbox((prev) => prev.extend(e.target.getBounds()))),
							}}
						>
							<Polyline
								positions={positions}
								pathOptions={alternatePathOptions(isMoving)}
							/>

							{lineString.map(({ path, type, id }) => {
								const actualPath = path;

								return (
									<>
										{type === 'haulage' && (
											<Polyline
												key={`${id}_${type}`}
												positions={actualPath}
												pathOptions={alternatePathOptions(isMoving, type)}
											/>
										)}
										<Polyline
											key={id}
											positions={actualPath}
											pathOptions={servicePathOptions(type, isMoving)}
										/>
									</>
								);
							})}
							{routeWaypoints.flat().map(({ coordinates, display_name = '', type }, i) => (
								<Point
									key={`${display_name}_${type}_${JSON.stringify(coordinates)}`}
									position={coordinates}
									tooltipText={<div>{display_name.split(',')[0]}</div>}
									service_name={type}
									pane={!i || (i === routeWaypoints.flat().length - 1) ? 'shadowPane' : 'markerPane'}
									size={[13, 13]}
								/>
							))}
						</FeatureGroup>
					);
				})
				}

			{/* <AnimatedRoute
				map={map}
				activeRoute={actualRoute?.[0]}
			/> */}
		</LayerGroup>
	);
}

export default Routes;
