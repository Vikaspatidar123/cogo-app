/* eslint-disable max-len */
import { useRouter } from 'next/router';
import React from 'react';

import RoutePlanner from './RoutePlanner';
import styles from './styles.module.css';

function PageSpotSearchRates({ rateData, data, location }) {
	console.log(rateData, 'rateData', data, location);
	const router = useRouter();
	const {
		id,
		origin: origin_port,
		destination: destination_port,
	} = router.query;

	const recaptchaRef = React.useRef();

	const executeCaptcha = async () => {
		const token = await recaptchaRef.current.executeAsync();
		return token;
	};

	const newTab = id === 'sea' ? 'ocean' : id;
	const allRoutes = data?.all_routes?.filter(({ main_service }) => main_service === newTab);
	const lineString = 	allRoutes?.[0]?.routes?.[0]?.lineString;
	const wayPoints = lineString?.flatMap((line) => line?.waypoints) || [];
	const journeyData = wayPoints?.filter((_, i, waypts) => i === 0 || i === waypts.length - 1) || [];

	const details = {
		origin      : journeyData?.[0] || '',
		destination : journeyData?.[1] || '',
	};

	const {
		origin = {},
		destination = {},
	} = details || {};

	return (
		<div className={styles.container}>

			{/* <div className={styles.header}>
				{data && !data.error ? (
					<h1>
						{origin.display_name}
						{' '}
						To
						{' '}
						{destination.display_name}
					</h1>
				) : null}
				<p>
					subtitle
				</p>
			</div> */}
			<RoutePlanner
				rateData={rateData}
				data={data}
				location={location}
				executeCaptcha={executeCaptcha}
				recaptchaRef={recaptchaRef}
			/>
		</div>
	);
}

export default PageSpotSearchRates;
