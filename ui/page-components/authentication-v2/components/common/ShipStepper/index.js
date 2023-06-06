// import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

import styles from './styles.module.css';

const Map = dynamic(() => import('../Map'), {
	ssr: false,
});

function ShipStepper({ mode = '' }) {
	// const [shipPosition, setShipPosition] = useState({ x: '10%', y: '35%', rotation: 42 });

	// useEffect(() => {
	// 	const coordinates = [
	// 		{ x: '10%', y: '35%', rotation: 42 }, // 0 Start
	// 		{ x: '35%', y: '52%', rotation: 41 }, // 1
	// 		{ x: '55%', y: '53%', rotation: 20 }, // 2
	// 		{ x: '75%', y: '53%', rotation: 25 }, // 3
	// 		{ x: '88%', y: '50%', rotation: 5 }, // 4 End
	// 	];
	// 	if (mode === 'login_tabs') {
	// 		setShipPosition(coordinates[0]);
	// 	}

	// 	if (mode === 'otp_form') {
	// 		setShipPosition(coordinates[1]);
	// 		setTimeout(() => {
	// 			setShipPosition(coordinates[2]);
	// 		}, 1000);
	// 	}

	// 	if (mode === 'loading_prompts') {
	// 		setShipPosition(coordinates[3]);
	// 		setTimeout(() => {
	// 			setShipPosition(coordinates[4]);
	// 		}, 500);
	// 	}
	// }, [mode]);
	return (
		<div className={styles.container}>
			<div className={styles.bg} />
			<Map />
		</div>

	);
}

export default ShipStepper;
