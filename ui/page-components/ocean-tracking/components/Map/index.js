import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

import useFetchTrackerDetails from '../../tracker_details/hooks/useFtechTrackerDetails';

const LAYER = [{
	name        : 'Cogo Maps',
	url         : 'https://api.cogoport.com/cogo-tiles/{z}/{x}/{y}.png',
	attribution : '',
}];

const CogoMaps = dynamic(() => import('./MapsComp'), { ssr: false });
function Map({ points, height = '80vh' }) {
	const { setTrackerDetails } = useFetchTrackerDetails();
	const [airPoints, setAirPoints] = useState([]);
	const [OceanPoints, setOceanPoints] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [filter_points, setFilterPoints] = useState([]);

	const [isTrackerModalOpen, setTrackerModal] = useState(false);

	const handleTrackerModal = (flag = true) => {
		setTrackerModal(flag);
	};
	const createBezier = (inputPoints, step) => {
		let t = 0;
		const bezierPoints = [];
		while (t <= 1) {
			try {
				let x1;
				let x2;
				let x3;

				x1 = parseFloat(inputPoints[0].lat);
				x3 = parseFloat(inputPoints[1].lat);
				x2 = Math.max(x1, x3) + 20;
				const lat_x = (1 - t) * ((1 - t) * x1 + t * x2) + t * ((1 - t) * x2 + t * x3);

				x1 = parseFloat(inputPoints[0].lng);
				x3 = parseFloat(inputPoints[1].lng);
				x2 = (x1 + x3) / 2;
				const lng_x = (1 - t) * ((1 - t) * x1 + t * x2) + t * ((1 - t) * x2 + t * x3);

				bezierPoints.push({
					lat : lat_x,
					lng : lng_x,
				});
			} catch (err) {
				t = 1;
			}
			t += step;
		}
		return bezierPoints;
	};
	const setPointsOnMap = (point) => {
		if (point.service === 'air') {
			let curvePoints = [];
			const tempArr = point.route
				.map((p) => {
					const pointArr = [
						p?.arrival_lat,
						p?.arrival_long,
						p?.departure_lat,
						p?.departure_long,
					];
					const isValidPtArr = pointArr.every((pt) => pt);
					if (isValidPtArr) {
						const source = {
							lat : p.departure_lat,
							lng : p.departure_long,
						};
						const dest = {
							lat : p.arrival_lat,
							lng : p.arrival_long,
						};
						curvePoints = curvePoints.concat(
							createBezier([source, dest], 0.001, point),
						);

						return {
							data  : point.data,
							id    : point.id,
							route : curvePoints,
						};
					}
					return undefined;
				})
				.filter((pt) => pt);

			setAirPoints((prev) => [...prev, ...tempArr]);
		} else if (point.route?.length > 0) {
			setOceanPoints((prevPoints) => [...prevPoints, point]);
		}
	};

	useEffect(() => {
		setAirPoints([]);
		setTimeout(() => {
			setLoading(true);
		}, 0);
		filter_points.forEach((point) => {
			setPointsOnMap(point);
		});
		setTimeout(() => {
			setLoading(false);
		}, 0);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filter_points]);

	useEffect(() => {
		handleTrackerModal(false);
		setFilterPoints(points);
	}, [points]);
	const showTrack = (p, type) => {
		handleTrackerModal();
		setFilterPoints(points.filter((x) => x.id === p.id));
		if (type === 'ocean') {
			const trackingContainersData = [
				{
					container_number : p.container_no,
					tracking_data    : p.data.data.find((x) => x.container_no === p.container_no)
						?.tracking_data,
				},
			];
			const track_data = {
				...p,
				tracking_id : p.id,
				data        : trackingContainersData,
			};
			setTrackerDetails(track_data);
		}
		return true;
	};

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 0);
	}, [isTrackerModalOpen]);

	return (
		<div>
			{isLoading ? (
				<img
					src="https://cogoport-maps.s3.ap-south-1.amazonaws.com/world+(2).svg"
					alt=""
					height={600}
					width={500}
				/>
			) : (

				<div>
					<CogoMaps
						lengthDependency={isTrackerModalOpen}
						plotPoints={airPoints.length === 0 ? OceanPoints : airPoints}
						type={airPoints.length === 0 ? 'ocean' : 'air'}
						showTrack={showTrack}
						height={height}
						baseLayer={LAYER}
						zoom={3.6}
						maxZoom={12}
					/>
				</div>
			)}
		</div>
	);
}

export default Map;
