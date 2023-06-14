// import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

const Map = dynamic(() => import('../Map'), {
	ssr: false,
});

const STATION_COUNT_MAPPING = {
	signup_form : 4,
	login_tabs  : 2,
	email_form  : 3,
	otp_form    : 2,

};

function ShipStepper({ mode = '' }) {
	const [curIdx, setCurIdx] = useState(0);
	const [prevIdx, setPrevIdx] = useState(0);

	// console.log('Current mode:', mode, STATION_COUNT_MAPPING[mode]);
	// console.log('Current index:', curIdx);
	// console.log('Previous index:', prevIdx);

	useEffect(() => {
		if (mode === 'login_tabs') {
			setPrevIdx(curIdx);
			setCurIdx(0);
		}

		if (mode === 'signup_form') {
			setPrevIdx(curIdx);
			setCurIdx(0);
		}

		if (mode === 'otp_form') {
			setPrevIdx(curIdx);
			setCurIdx(1);
		}

		// if (mode === 'loading_prompts') {
		//     setPrevIdx(curIdx);
		//     setCurIdx(3);
		// }
	}, [mode]);

	return (
		<div className={styles.container}>
			<div className={styles.bg} />
			<Map curIdx={curIdx} prevIdx={prevIdx} station_count={STATION_COUNT_MAPPING[mode]} />
		</div>

	);
}

export default ShipStepper;
