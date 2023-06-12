// import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

import styles from './styles.module.css';

const Map = dynamic(() => import('../Map'), {
	ssr: false,
});

// const STATION_COUNT_MAPPING = {
// 	signup_form : 4,
// 	login_tabs  : 2,
// 	email_form  : 3,
// 	otp_form    : 2,

// };

function ShipStepper() {
	// const [curIdx, setCurIdx] = useState(0);
	// const [prevIdx, setPrevIdx] = useState(0);

	// useEffect(() => {
	// 	if (mode === 'login_tabs') {
	// 		setPrevIdx(curIdx);
	// 		setCurIdx(0);
	// 	}

	// 	if (mode === 'signup_form') {
	// 		setPrevIdx(curIdx);
	// 		setCurIdx(0);
	// 	}

	// 	if (mode === 'otp_form') {
	// 		setPrevIdx(curIdx);
	// 		setCurIdx(1);
	// 	}

	// if (mode === 'loading_prompts') {
	// 	setPrevIdx(curIdx);
	// 	setCurIdx(3);
	// }
	// }, [mode]);

	return (
		<div className={styles.container}>
			<div className={styles.bg} />
			<Map />
		</div>

	);
}

export default ShipStepper;
