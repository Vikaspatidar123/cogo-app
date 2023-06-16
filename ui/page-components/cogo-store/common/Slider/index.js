import React, { useEffect } from 'react';
import { cl, Popover } from '@cogoport/components';

import { IcCCogoCoin } from '@cogoport/icons-react';
import styles from './styles.module.css';

function Slider({
	durationValue,
	setDurationValue,
	min = 0,
	max = 0,
	data = 0,
}) {
	const handleChange = (event) => {
		setDurationValue((prv) => ({ ...prv, durationValue: event.target.value }));
	};

	useEffect(() => {
		if (data) setDurationValue((prv) => ({ ...prv, durationValue: data }));
	}, [data]);

	return (
		<div className={styles.container}>
			<Popover placement="bottom" content={durationValue}>
				<input
					className={styles.slider}
					type="range"
					min={min}
					max={max}
					id="active_oc_sc_transit_time_input"
					onChange={handleChange}
					value={durationValue}
				/>
			</Popover>

			<div className={cl`${styles.flex_box} ${styles.marker}`}>
				<div className={styles.coin}>
					<IcCCogoCoin />
					{min}
				</div>
				<div className={styles.coin}>
					<IcCCogoCoin />
					{max}
				</div>
			</div>
		</div>
	);
}

export default Slider;
