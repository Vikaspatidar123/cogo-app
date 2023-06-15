// import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

const Map = dynamic(() => import('../Map'), {
	ssr: false,
});

const STATION_COUNT_MAPPING = {
	login  : 2,
	signup : 3,
};

function ShipStepper({ mode = '', type = '' }) {
	// type - login or signup
	const [nextStop, setNextStop] = useState(0);

	useEffect(() => {
		if (mode === 'login_tabs') {
			// nothing will happen
			setNextStop(0);
		}

		if (mode === 'otp_form') {
			// start to Next Stop
			setNextStop(1);
		}

		if (mode === 'loading_prompts') {
			// current stop to end
			setNextStop(2);
		}
	}, [mode]);

	return (
		<div className={styles.container}>
			<div className={styles.bg} />
			<Map station_count={STATION_COUNT_MAPPING[type]} nextStop={nextStop} />
		</div>

	);
}

export default ShipStepper;
